"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMapPin, FiImage, FiSave, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-hot-toast";

const initialState = {
  title: "",
  district: "",
  division: "",
  category: "",
  rating: 5,
  entryFee: "Free",
  bestSeason: "Winter",
  image: "",
  description: "",
};

export default function AddPlacePage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === undefined) return; // loading
    if (!session?.user) router.replace("/login");
  }, [session, router]);
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.district || !form.division || !form.category) {
      toast.error("Please fill in the required place details.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image:
            form.image ||
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        }),
      });
      

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save the place.");
      }

      toast.success("Place card added successfully and saved to the database.");
      router.push("/explore");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save the place right now.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 pt-28 pb-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/explore" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <FiArrowLeft /> Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        >
          <div className="border-b border-border bg-primary/10 p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary p-3 text-white">
                <FiMapPin size={20} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Add a new place card</h1>
                <p className="mt-1 text-foreground/70">Create a beautiful promo card and save it directly to your database.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Place Name</label>
                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Sajek Valley"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">District</label>
                  <input
                    value={form.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    placeholder="Rangamati"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Division</label>
                  <input
                    value={form.division}
                    onChange={(e) => handleChange("division", e.target.value)}
                    placeholder="Chattogram"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder="Hills"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Best Season</label>
                  <input
                    value={form.bestSeason}
                    onChange={(e) => handleChange("bestSeason", e.target.value)}
                    placeholder="Winter"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) => handleChange("rating", Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Entry Fee</label>
                  <input
                    value={form.entryFee}
                    onChange={(e) => handleChange("entryFee", e.target.value)}
                    placeholder="Free"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Image URL</label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
                  <FiImage className="text-primary" />
                  <input
                    value={form.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    placeholder="https://example.com/place.jpg"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Short Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={6}
                  placeholder="Write a short promo description for this place..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-foreground/70">
                <p className="font-semibold text-foreground">What happens next?</p>
                <p className="mt-1">Your promo card details will be saved instantly to the database and appear on the explore page.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : <><FiSave /> Save Place Card</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
