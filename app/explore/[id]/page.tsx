/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMapPin, FiStar, FiClock, FiDollarSign, FiImage, FiMessageCircle, FiHeart } from "react-icons/fi";

const defaultPlace = {
  id: 1,
  title: "Sajek Valley",
  district: "Rangamati",
  division: "Chattogram",
  category: "Hills",
  rating: 4.8,
  entryFee: "Free",
  bestSeason: "Winter",
  image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  description:
    "Sajek Valley is one of the most scenic hill destinations in Bangladesh, known for its cloud-covered mountains, bamboo cottages, and peaceful sunrise views.",
  overview:
    "A perfect escape for travelers who love misty hills, cool weather, and breathtaking panoramic views.",
  highlights: ["Cloudy mountain views", "Sunrise and sunset points", "Local homestay experience", "Adventure trekking routes"],
  specs: [
    { label: "Best Time", value: "November to February" },
    { label: "Travel Type", value: "Weekend getaway" },
    { label: "Entry Fee", value: "Free" },
    { label: "Nearby Attraction", value: "Ruilui Para" },
  ],
  reviews: [
    { name: "Nadia", rating: 5, text: "The view was breathtaking and the weather felt magical." },
    { name: "Rahim", rating: 4, text: "Amazing experience with great local hospitality." },
  ],
  related: [
    { id: 2, title: "Sundarbans", district: "Khulna", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Cox's Bazar", district: "Cox's Bazar", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Ratargul", district: "Sylhet", image: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&w=800&q=80" },
  ],
};

export default function PlaceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [place, setPlace] = useState(defaultPlace);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session === undefined) return; // still loading
    if (!session?.user) {
      router.replace("/login");
      return;
    }
    const loadPlace = async () => {
      try {
        const response = await fetch("/api/places");
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.places)) {
          const found = data.places.find((item: Record<string, unknown>) => String(item._id ?? item.id) === String(params.id));
          if (found) {
            setPlace({
              ...defaultPlace,
              ...found,
              id: (found._id as string | number | undefined) ?? (found.id as string | number | undefined) ?? defaultPlace.id,
              title: (found.title as string) ?? defaultPlace.title,
              district: (found.district as string) ?? defaultPlace.district,
              division: (found.division as string) ?? defaultPlace.division,
              category: (found.category as string) ?? defaultPlace.category,
              rating: Number(found.rating ?? defaultPlace.rating),
              entryFee: (found.entryFee as string) ?? defaultPlace.entryFee,
              bestSeason: (found.bestSeason as string) ?? defaultPlace.bestSeason,
              image: (found.image as string) ?? defaultPlace.image,
              description: (found.description as string) ?? defaultPlace.description,
              overview: (found.overview as string) ?? defaultPlace.overview,
              highlights: Array.isArray(found.highlights) ? (found.highlights as string[]) : defaultPlace.highlights,
              specs: Array.isArray(found.specs) ? (found.specs as Array<{ label: string; value: string }>) : defaultPlace.specs,
              reviews: Array.isArray(found.reviews) ? (found.reviews as Array<{ name: string; rating: number; text: string }>) : defaultPlace.reviews,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load place details", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlace();
  }, [params.id, router, session]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-foreground">Loading place details...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <div className="container mx-auto px-4">
        <Link href="/explore" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <FiArrowLeft /> Back to Explore
        </Link>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-80">
              <img src={place.image} alt={place.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-primary">
                {place.category}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <FiMapPin />
                  <span>{place.district}, {place.division}</span>
                </div>
                <h1 className="mt-2 text-3xl font-bold text-white">{place.title}</h1>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  <FiStar className="fill-current" /> {place.rating} / 5
                </div>
                <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm text-foreground/70">
                  <FiHeart className="text-rose-500" /> Save
                </div>
              </div>

              <p className="mt-6 text-foreground/70">{place.overview}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <FiDollarSign className="text-primary" /> Entry Fee
                  </div>
                  <p className="mt-2 text-lg font-semibold text-foreground">{place.entryFee}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <FiClock className="text-primary" /> Best Season
                  </div>
                  <p className="mt-2 text-lg font-semibold text-foreground">{place.bestSeason}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground">Description / Overview</h2>
              <p className="mt-4 text-foreground/70 leading-7">{place.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {place.highlights.map((item: string) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary">{item}</span>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground">Key Information / Specifications</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {place.specs.map((item: { label: string; value: string }) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-background/70 p-4">
                    <p className="text-sm font-semibold text-foreground/70">{item.label}</p>
                    <p className="mt-1 font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="space-y-8">
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <FiMessageCircle className="text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Reviews & Ratings</h2>
              </div>
              <div className="mt-6 space-y-4">
                {place.reviews.map((review: { name: string; rating: number; text: string }) => (
                  <div key={review.name} className="rounded-2xl border border-border bg-background/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: review.rating }).map((_, i) => (<FiStar key={i} className="fill-current" />))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-foreground/70">{review.text}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <FiImage className="text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Related Places</h2>
              </div>
              <div className="mt-6 space-y-4">
                {place.related.map((item: { id: number; title: string; district: string; image: string }) => (
                  <Link href={`/explore/${item.id}`} key={item.id} className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3 transition hover:border-primary/40 hover:bg-primary/5">
                    <img src={item.image} alt={item.title} className="h-16 w-16 rounded-xl object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-foreground/60">{item.district}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
