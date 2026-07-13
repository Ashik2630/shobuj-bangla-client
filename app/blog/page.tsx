"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiClock, FiCalendar, FiArrowRight, FiTag } from "react-icons/fi";

const blogs = [
  {
    id: 1,
    title: "How to Plan the Perfect Trip to Sajek Valley",
    excerpt: "Nestled at 1,476 feet above sea level in the Rangamati district, Sajek Valley offers cloud-covered hills, tribal culture, and sunrises that will take your breath away. Here's your complete planning guide.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    category: "Travel Guide",
    readTime: "8 min read",
    date: "July 5, 2026",
    author: "Nusrat Jahan",
    avatar: "https://i.pravatar.cc/60?img=47",
  },
  {
    id: 2,
    title: "Best Time to Visit the Sundarbans: A Seasonal Guide",
    excerpt: "The Sundarbans is magical year-round, but each season offers a completely different experience. From tiger sightings in winter to lush monsoon greenery — we break down what to expect every month.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
    category: "Nature Tips",
    readTime: "6 min read",
    date: "June 28, 2026",
    author: "Arif Hossain",
    avatar: "https://i.pravatar.cc/60?img=11",
  },
  {
    id: 3,
    title: "Top 10 Waterfalls You Must Visit in Bandarban",
    excerpt: "Bandarban is a treasure trove of hidden waterfalls. From the thundering Nafakhum to the serene Rijuk, we've ranked the must-see cascades for your next hill district adventure.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    category: "Top Lists",
    readTime: "10 min read",
    date: "June 15, 2026",
    author: "Rafiqul Islam",
    avatar: "https://i.pravatar.cc/60?img=12",
  },
  {
    id: 4,
    title: "Ratargul: Exploring Bangladesh's Only Freshwater Swamp Forest",
    excerpt: "Often called the Amazon of Bangladesh, Ratargul in Sylhet is the country's only freshwater swamp forest. Paddle through submerged trees and discover a world unlike any other.",
    image: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&w=800&q=80",
    category: "Eco Tourism",
    readTime: "7 min read",
    date: "June 3, 2026",
    author: "Sumaiya Akter",
    avatar: "https://i.pravatar.cc/60?img=48",
  },
  {
    id: 5,
    title: "Saint Martin Island: Bangladesh's Only Coral Island",
    excerpt: "A tiny island at the tip of Bangladesh, Saint Martin is famous for its crystal-clear water, coral reefs, and coconut trees. Here's everything you need to know before visiting.",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80",
    category: "Travel Guide",
    readTime: "9 min read",
    date: "May 20, 2026",
    author: "Nusrat Jahan",
    avatar: "https://i.pravatar.cc/60?img=47",
  },
  {
    id: 6,
    title: "Eco-Tourism in Bangladesh: How to Travel Responsibly",
    excerpt: "With rising visitor numbers, Bangladesh's natural sites face increasing pressure. Learn how to practice responsible eco-tourism and leave a positive impact on the communities you visit.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    category: "Eco Tourism",
    readTime: "5 min read",
    date: "May 8, 2026",
    author: "Arif Hossain",
    avatar: "https://i.pravatar.cc/60?img=11",
  },
];

const categories = ["All", "Travel Guide", "Nature Tips", "Top Lists", "Eco Tourism"];

const categoryColors: Record<string, string> = {
  "Travel Guide": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Nature Tips": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Top Lists": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Eco Tourism": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export default function BlogPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === undefined) return;
    if (!session?.user) router.replace("/login");
  }, [session, router]);

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-primary/5 border-b border-border mb-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Blog
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-4">
            Stories, Guides & <span className="text-primary">Nature Insights</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-foreground/70 text-lg">
            Discover travel tips, destination guides, and eco-tourism stories from the heart of Bangladesh.
          </motion.p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button key={cat} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${cat === "All" ? "bg-primary text-white border-primary shadow-md" : "bg-card border-border text-foreground/70 hover:border-primary hover:text-primary"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Featured Post */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <Link href={`/blog/${featured.id}`} className="group grid md:grid-cols-2 gap-0 bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-400">
            <div className="relative h-72 md:h-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/20" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4 w-fit">
                ⭐ Featured Post
              </span>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit ${categoryColors[featured.category]}`}>
                {featured.category}
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 group-hover:text-primary transition-colors leading-tight">{featured.title}</h2>
              <p className="text-foreground/70 mb-6 line-clamp-3 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <img src={featured.avatar} alt={featured.author} className="w-9 h-9 rounded-full object-cover border-2 border-primary/20" />
                <span className="font-medium text-foreground">{featured.author}</span>
                <span className="flex items-center gap-1"><FiCalendar size={13} /> {featured.date}</span>
                <span className="flex items-center gap-1"><FiClock size={13} /> {featured.readTime}</span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Read Article <FiArrowRight />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Rest of Blogs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.id}`} className="block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 group h-full">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category]}`}>
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">{post.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-foreground/50 pt-4 border-t border-border">
                    <img src={post.avatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                    <span className="font-medium text-foreground/70">{post.author}</span>
                    <span className="ml-auto flex items-center gap-1"><FiClock size={12} /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-14">
          <button className="px-8 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
