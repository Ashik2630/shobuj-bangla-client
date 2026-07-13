"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiClock, FiCalendar, FiArrowRight, FiTag } from "react-icons/fi";

import { blogs } from "./data";

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
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (session === undefined) return;
    if (!session?.user) router.replace("/login");
  }, [session, router]);

  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter((blog) => blog.category === selectedCategory);

  const featured = filteredBlogs[0];
  const rest = filteredBlogs.slice(1);

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
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${selectedCategory === cat ? "bg-primary text-white border-primary shadow-md" : "bg-card border-border text-foreground/70 hover:border-primary hover:text-primary"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {filteredBlogs.length > 0 ? (
          <>
            {/* Featured Post */}
            {featured && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
                <Link href={`/blog/${featured.id}`} className="group grid md:grid-cols-2 gap-0 bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-400">
                  <div className="relative h-72 md:h-auto overflow-hidden">
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4 w-fit">
                      ⭐ Featured Post
                    </span>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit ${categoryColors[featured.category] || "bg-gray-100 text-gray-700"}`}>
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
            )}

            {/* Rest of Blogs */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/blog/${post.id}`} className="block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 group h-full flex flex-col">
                      <div className="relative h-52 overflow-hidden shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col grow">
                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">{post.title}</h3>
                        <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4 grow">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-foreground/50 pt-4 border-t border-border mt-auto">
                          <img src={post.avatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                          <span className="font-medium text-foreground/70">{post.author}</span>
                          <span className="ml-auto flex items-center gap-1"><FiClock size={12} /> {post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-14">
              <button className="px-8 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Load More Articles
              </button>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card border border-border rounded-2xl max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">No blogs found</h3>
            <p className="text-foreground/70 mb-6">We don't have any articles in this category right now.</p>
            <button 
              onClick={() => setSelectedCategory("All")}
              className="px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              View All Categories
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
