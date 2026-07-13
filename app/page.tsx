/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiMapPin, FiStar, FiArrowRight, FiCheckCircle, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Recharts to avoid SSR issues
const StatsChart = dynamic(() => import("@/components/StatsChart"), { ssr: false });

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animated heading: each word fades + slides up with stagger
const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const headingWord = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedHeading({ text, highlight, className = "" }: { text: string; highlight?: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h2
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-wrap justify-center gap-x-3 gap-y-1 ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={headingWord}
          className={word === highlight ? "text-primary" : ""}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

const categories = [
  { name: "Hills", icon: "🏔", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { name: "Sea Beaches", icon: "🌊", color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400" },
  { name: "Forests", icon: "🌳", color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
  { name: "Rivers", icon: "🏞", color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
  { name: "Waterfalls", icon: "💧", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400" },
  { name: "Wildlife", icon: "🦌", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
  { name: "National Parks", icon: "🌿", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { name: "Eco Parks", icon: "🌺", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" },
];

const heroSlides = [
  {
    title: "Hidden Gems of Bangladesh",
    subtitle: "From emerald hills to serene coasts, uncover the places that make Bangladesh unforgettable.",
    image: "https://images.unsplash.com/photo-1590880449155-b54f958ce314?auto=format&fit=crop&w=2000&q=80",
    badge: "Nature Escape",
    highlight: "Sajek • Cox's Bazar • Sundarbans",
  },
  {
    title: "Journey Through Scenic Landscapes",
    subtitle: "Follow rivers, forests, and waterfalls that invite you to slow down and breathe in the beauty.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80",
    badge: "Adventure Ready",
    highlight: "Nafakhum • Ratargul • Jaflong",
  },
  {
    title: "Plan Your Next Nature Retreat",
    subtitle: "Discover top-rated destinations, local stories, and travel inspiration in one beautiful place.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
    badge: "Travel Inspiration",
    highlight: "Saint Martin • Lawachara • Bandarban",
  },
];

type FeaturedPlace = {
  id: string | number;
  title: string;
  district: string;
  category: string;
  rating: number;
  entryFee: string;
  image: string;
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [featuredPlaces, setFeaturedPlaces] = useState<FeaturedPlace[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const loadFeaturedPlaces = async () => {
      try {
        const response = await fetch("/api/places");
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.places)) {
          const mappedPlaces = data.places.slice(0, 4).map((place: Record<string, unknown>) => ({
            id: (place._id as string | number | undefined) ?? (place.id as string | number | undefined) ?? "",
            title: (place.title as string) ?? "Untitled Place",
            district: (place.district as string) ?? "Unknown District",
            category: (place.category as string) ?? "Featured",
            rating: Number(place.rating ?? 5),
            entryFee: (place.entryFee as string) ?? "Free",
            image:
              (place.image as string | undefined) ||
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
          }));

          setFeaturedPlaces(mappedPlaces);
        }
      } catch (error) {
        console.error("Failed to load featured places", error);
      }
    };

    loadFeaturedPlaces();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setActiveSlide(index);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] min-h-140 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background z-10"></div>
          <AnimatePresence mode="wait">
            <motion.img
              key={heroSlides[activeSlide].image}
              src={heroSlides[activeSlide].image}
              alt={heroSlides[activeSlide].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="container relative z-20 mx-auto px-4 text-white">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl min-h-[350px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <span className="mb-4 inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-sm font-medium uppercase tracking-[0.2em] backdrop-blur-md">
                    {heroSlides[activeSlide].badge}
                  </span>
                  <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                    {heroSlides[activeSlide].title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg text-gray-200 sm:text-xl">
                    {heroSlides[activeSlide].subtitle}
                  </p>
                  <p className="mt-4 inline-flex rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-emerald-100">
                    {heroSlides[activeSlide].highlight}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/explore"
                      className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-lg font-semibold text-white shadow-[0_0_25px_rgba(46,125,50,0.35)] transition hover:bg-primary/90"
                    >
                      Start Exploring <FiArrowRight />
                    </Link>
                    <Link
                      href="/add-place"
                      className="flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-lg font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      Add Your Place
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Featured Picks</p>
                  <h2 className="mt-2 text-2xl font-semibold">Explore Bangladesh in style</h2>
                </div>
                <div className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-emerald-100">
                  {activeSlide + 1}/{heroSlides.length}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { label: "Best for Hills", value: "Sajek Valley" },
                  { label: "Best for Beaches", value: "Saint Martin" },
                  { label: "Best for Forests", value: "Sundarbans" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/15 bg-background/20 px-4 py-3">
                    <span className="text-sm text-gray-200">{item.label}</span>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-8 bg-primary" : "w-2.5 bg-white/50"}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => goToSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)}
                    className="rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20"
                    aria-label="Previous slide"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={() => goToSlide((activeSlide + 1) % heroSlides.length)}
                    className="rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20"
                    aria-label="Next slide"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by <span className="text-primary">Category</span></h2>
            <p className="text-foreground/70">Find the perfect destination based on your preferences. Whether you love the sound of waves or the silence of forests.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {categories.map((cat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link href={`/explore?category=${cat.name}`} className="block group">
                  <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                      {cat.icon}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Destinations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-primary">Destinations</span></h2>
              <p className="text-foreground/70">Discover the most popular and highly-rated places in Bangladesh chosen by our community.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-0"
            >
              <Link href="/explore" className="text-primary font-semibold hover:underline flex items-center gap-2">
                View All Places <FiArrowRight />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredPlaces.map((place, i) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    {place.category}
                  </div>
                  <img 
                    src={place.image} 
                    alt={place.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{place.title}</h3>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                      <FiStar className="fill-current" />
                      <span>{place.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-foreground/60 text-sm mb-4">
                    <FiMapPin className="mr-1" />
                    <span>{place.district}</span>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <div className="text-sm">
                      <span className="text-foreground/60">Entry Fee:</span>
                      <span className="font-semibold text-foreground ml-1">{place.entryFee}</span>
                    </div>
                    <Link 
                      href={`/explore/${place.id}`}
                      className="text-primary font-medium hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Visit Bangladesh */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Why You Should Visit <span className="text-primary">Bangladesh</span>
              </h2>
              <p className="text-foreground/70 text-lg">
                A land of rivers and stunning greenery, Bangladesh offers an authentic travel experience untouched by mass tourism. From the roaring Bengal tiger to the tranquil tea gardens.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Longest unbroken sea beach in the world (Cox's Bazar)",
                  "Largest mangrove forest on earth (Sundarbans)",
                  "Rich biodiversity and unique wildlife",
                  "Warm hospitality and vibrant culture"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <FiCheckCircle className="text-primary mt-1 shrink-0" size={20} />
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <img src="https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=600&q=80" alt="Tea Garden" className="block rounded-2xl shadow-lg mt-8 object-cover h-64 w-full" />
                <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80" alt="Royal Bengal Tiger" className="block self-end rounded-2xl shadow-lg object-cover h-64 w-full" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>

        
      </section>

      {/* 5. Statistics (Recharts placeholder) */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform <span className="text-primary">Statistics</span></h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Growing every day to bring you the best nature discovery experience.</p>
          </motion.div>
          
          <StatsChart />
        </div>
      </section>

      {/* 6. Bangladesh Culture Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 rounded-full bg-orange-100 dark:bg-orange-900/30 px-4 py-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest"
            >
              Heritage &amp; Tradition
            </motion.span>
            <AnimatedHeading
              text="Bangladesh Rich Culture"
              highlight="Culture"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="text-foreground/70 text-lg"
            >
              Bangladesh's culture is a tapestry woven from ancient traditions, vibrant festivals, folk arts, and literary heritage — each thread telling a story of resilience and beauty.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "🎨",
                title: "Folk Arts & Crafts",
                desc: "Muslin weaving, Nakshi Kantha embroidery, terracotta pottery, and Jamdani sarees — handcrafted traditions passed down through generations.",
                color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                iconBg: "bg-orange-100 dark:bg-orange-900/40 text-orange-600",
              },
              {
                icon: "🎵",
                title: "Music & Baul Tradition",
                desc: "The mystical Baul singers of Bengal seek the divine through song. Their folk music — recognized by UNESCO — captures the soul of Bangladesh.",
                color: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
                iconBg: "bg-violet-100 dark:bg-violet-900/40 text-violet-600",
              },
              {
                icon: "🎭",
                title: "Festivals & Celebrations",
                desc: "Pohela Boishakh, Eid ul-Fitr, Durga Puja — Bangladesh celebrates life with color, dance, and community spirit throughout the year.",
                color: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
                iconBg: "bg-pink-100 dark:bg-pink-900/40 text-pink-600",
              },
              {
                icon: "📚",
                title: "Literary Legacy",
                desc: "Home to Nobel Laureate Rabindranath Tagore and the spirit of Lalon Shah — Bangladesh has a rich poetic tradition that echoes through time.",
                color: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800",
                iconBg: "bg-sky-100 dark:bg-sky-900/40 text-sky-600",
              },
              {
                icon: "🍛",
                title: "Culinary Culture",
                desc: "From hilsa fish curry to pitha festivals — Bangladeshi cuisine is a celebration of bold spices, river fish, and age-old recipes.",
                color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                iconBg: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600",
              },
              {
                icon: "🏛️",
                title: "Ancient Architecture",
                desc: "Mosques of Bagerhat, the ruins of Paharpur, and colonial Dhaka — Bangladesh preserves millennia of architectural grandeur.",
                color: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
                iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${item.color}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 ${item.iconBg}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. People's Kindness Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-background to-sky-50 dark:from-emerald-950/20 dark:via-background dark:to-sky-950/20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 rounded-full bg-sky-100 dark:bg-sky-900/30 px-4 py-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest"
              >
                Heart of Bangladesh
              </motion.span>
              <AnimatedHeading
                text="People's Kindness and Warmth"
                highlight="Kindness"
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-foreground/70 text-lg mb-8 leading-relaxed"
              >
                Travelers from around the world consistently describe the people of Bangladesh as among the most hospitable on earth. A smile, an open door, and a cup of cha — that's the Bangladeshi welcome.
              </motion.p>

              <div className="space-y-5">
                {[
                  { icon: "🤝", title: "Unmatched Hospitality", desc: "Guests are treated as a gift from God — 'Atithi Debo Bhava'. Strangers become family within minutes." },
                  { icon: "💛", title: "Community Spirit", desc: "Whether it's a flooded village or a neighbor in need, Bangladeshis rally together with extraordinary collective care." },
                  { icon: "🙏", title: "Respectful & Generous", desc: "Deep-rooted values of compassion, sharing, and respect for elders make every interaction warm and meaningful." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-foreground/70 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                      <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" alt="Bangladeshi smiles" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-36">
                      <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80" alt="Village life" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-36">
                      <img src="https://images.unsplash.com/photo-1474928883557-c5741e28cfe2?auto=format&fit=crop&w=600&q=80" alt="Community gathering" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                      <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?auto=format&fit=crop&w=600&q=80" alt="Warm welcome" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-2xl p-4 shadow-xl">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-white/80">Travelers feel welcome</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quote banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center rounded-3xl bg-white/60 dark:bg-white/5 border border-border/50 p-10 backdrop-blur-sm"
          >
            <p className="text-2xl md:text-3xl font-semibold text-foreground/80 italic max-w-3xl mx-auto">
              "The people of Bangladesh are the soul of the land — their kindness is the most beautiful destination."
            </p>
            <p className="mt-4 text-foreground/50 text-sm">— A traveler's reflection</p>
          </motion.div>
        </div>
      </section>

      {/* 8. Mahamanab Dari / Spirit of Great Humanity */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-block mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary uppercase tracking-widest"
            >
              Spirit of Humanity
            </motion.span>
            <AnimatedHeading
              text="The Great Human Spirit"
              highlight="Spirit"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="text-foreground/70 text-lg leading-relaxed"
            >
              Bangladesh has gifted the world great souls — visionaries, poets, and humanists who championed love, unity, and the dignity of every human being. Their legacy lives on in every corner of this land.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                name: "Rabindranath Tagore",
                role: "Poet, Nobel Laureate",
                quote: "Where the mind is without fear and the head is held high, let my country awake.",
                icon: "✍️",
                gradient: "from-amber-500/20 to-orange-500/10",
                border: "border-amber-200 dark:border-amber-800",
              },
              {
                name: "Lalon Shah",
                role: "Baul Mystic & Philosopher",
                quote: "In the human body resides the divine — seek not God in temples, find the man within.",
                icon: "🎵",
                gradient: "from-violet-500/20 to-purple-500/10",
                border: "border-violet-200 dark:border-violet-800",
              },
              {
                name: "Sheikh Mujibur Rahman",
                role: "Father of the Nation",
                quote: "This land, this people — their freedom is my only prayer. They shall rise, they shall thrive.",
                icon: "🕊️",
                gradient: "from-emerald-500/20 to-green-500/10",
                border: "border-emerald-200 dark:border-emerald-800",
              },
            ].map((person, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl border p-8 bg-gradient-to-br ${person.gradient} ${person.border} shadow-sm hover:shadow-2xl transition-all duration-300`}
              >
                <div className="text-5xl mb-5">{person.icon}</div>
                <blockquote className="text-foreground/80 text-sm italic leading-relaxed mb-6 border-l-4 border-primary/40 pl-4">
                  "{person.quote}"
                </blockquote>
                <div className="mt-auto">
                  <p className="font-bold text-foreground text-lg">{person.name}</p>
                  <p className="text-foreground/50 text-sm mt-1">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values banner */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: "❤️", value: "Compassion", sub: "Kindness to all" },
              { icon: "🕊️", value: "Peace", sub: "Unity in diversity" },
              { icon: "🌿", value: "Harmony", sub: "Living together" },
              { icon: "🌟", value: "Dignity", sub: "Respect every soul" },
            ].map((v, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 260 }}
                  className="text-4xl mb-3"
                >
                  {v.icon}
                </motion.div>
                <p className="font-bold text-foreground text-lg">{v.value}</p>
                <p className="text-primary/70 text-xs mt-1">{v.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "Do I need to register to view places?", a: "No, you can explore and view details of all places without registration. However, logging in allows you to save favorites and add reviews." },
              { q: "Can I add a new place to the platform?", a: "Yes! Once you register and log in, you can go to your dashboard and use the 'Add Place' feature to contribute to our directory." },
              { q: "Is this platform free to use?", a: "Absolutely. ShobujBangla is completely free for all users to explore and contribute." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-border rounded-xl overflow-hidden bg-card"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex items-center justify-between w-full p-5 text-left font-semibold text-lg focus:outline-none"
                >
                  {faq.q}
                  <FiChevronDown className={`transform transition-transform duration-300 ${activeFaq === i ? "rotate-180 text-primary" : "text-foreground/50"}`} />
                </button>
                <div 
                  className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-foreground/70">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. New Relevant Sections (Sustainability, Local Stories, Events) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid gap-8 lg:grid-cols-3">
            <motion.div variants={fadeInUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">🌱</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Sustainable Travel Tips</h3>
                  <p className="text-foreground/70 mt-2">Small actions make a big difference — simple tips to minimize footprint while exploring Bangladesh's nature.</p>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {[
                  'Pack reusable water bottle and avoid single-use plastics',
                  'Stay on marked trails to protect habitats',
                  'Support local guides and communities',
                ].map((t, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }} className="flex items-start gap-3">
                    <FiCheckCircle className="text-primary mt-1" />
                    <span className="text-foreground/80">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-2xl">🗣️</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Local Community Stories</h3>
                  <p className="text-foreground/70 mt-2">Real stories from locals and travelers — learn about cultural highlights, homestays, and responsible experiences.</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {[{ t: 'Homestay with a tea-farm family in Srimangal' }, { t: "Fisherman's day trip in the Sundarbans" }].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} className="rounded-lg border border-border/50 p-3 bg-background/10">
                    <p className="text-sm font-medium text-foreground">{s.t}</p>
                    <p className="text-xs text-foreground/60 mt-1">Read firsthand accounts and tips from locals.</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">📅</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Upcoming Nature Events</h3>
                  <p className="text-foreground/70 mt-2">Guided walks, birdwatching tours and local festivals — join community events that celebrate Bangladesh's nature.</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {[{ name: 'Mangrove Clean-up — Sundarbans', date: 'Aug 12' }, { name: 'Birdwatching Morning — Lawachara', date: 'Sep 5' }].map((e, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.06 * i }} className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-background/10">
                    <div>
                      <p className="font-medium text-foreground">{e.name}</p>
                      <p className="text-xs text-foreground/60">{e.date}</p>
                    </div>
                    <Link href="/events" className="text-primary text-sm font-semibold">Join</Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 11. CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Exploring?</h2>
            <p className="text-primary-foreground/80 text-xl mb-10">
              Join thousands of nature lovers and discover the unseen beauty of Bangladesh today.
            </p>
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-primary rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
