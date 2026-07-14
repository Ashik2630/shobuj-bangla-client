"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "@/lib/auth-client";
import { FiArrowLeft, FiEye, FiTrash2, FiMapPin } from "react-icons/fi";

type Place = {
  _id?: string;
  id?: string;
  title: string;
  district: string;
  division: string;
  category: string;
  rating: number;
  entryFee: string;
  image?: string;
  description?: string;
};

export default function ManagePlacesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (session === undefined) return;
    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const loadPlaces = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/places");
        const data = await response.json();
        if (response.ok && data.success && Array.isArray(data.places)) {
          setPlaces(data.places);
        }
      } catch (error) {
        console.error(error);
        Swal.fire({ icon: "error", title: "Load failed", text: "Failed to load places" });
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [router, session]);

  const handleDelete = async (id?: string) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Delete place?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/places?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete place");
      setPlaces((prev) => prev.filter((place) => String(place._id ?? place.id) !== String(id)));
      await Swal.fire({ icon: "success", title: "Deleted", text: "Place deleted successfully.", timer: 1600, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Delete failed", text: "Unable to delete place" });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background pt-24">Loading your places...</div>;
  }

  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-24">
      <div className="mx-auto max-w-6xl">
        <Link href="/explore" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <FiArrowLeft /> Back to Explore
        </Link>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Manage Places</h1>
              <p className="text-sm text-foreground/70">View and remove the places you added to the platform.</p>
            </div>
            <Link href="/add-place" className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
              Add New Place
            </Link>
          </div>

          {places.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-foreground/70">
              No places found yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {places.map((place) => (
                <div key={String(place._id ?? place.id)} className="flex flex-col gap-4 rounded-2xl border border-border bg-background/70 p-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-md bg-background/10">
                      <Image
                        src={place.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80"}
                        alt={place.title}
                        width={80}
                        height={56}
                        className="object-contain h-full w-full bg-transparent"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-foreground truncate">{place.title}</h2>
                      <p className="text-sm text-foreground/60 truncate">{place.district}, {place.division} • {place.category}</p>
                      <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{place.description ?? "A user-submitted destination."}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/explore/${String(place._id ?? place.id)}`} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:text-primary">
                      <FiEye /> View
                    </Link>
                    <button onClick={() => handleDelete(String(place._id ?? place.id))} className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-3 py-2 text-sm text-white">
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
