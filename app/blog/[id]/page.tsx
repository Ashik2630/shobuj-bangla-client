"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiShare2, FiTag } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Dummy data (can be replaced by real fetch based on params.id)
  const blog = {
    id: params.id || 1,
    title: "A Complete Guide to Exploring the Sundarbans",
    content: `The Sundarbans, the largest mangrove forest in the world, is a UNESCO World Heritage site and a must-visit destination for nature lovers. Spread across Bangladesh and India, it offers a unique ecosystem teeming with wildlife, including the majestic Royal Bengal Tiger.
    
In this guide, we will walk you through everything you need to know before visiting the Sundarbans. From the best time to visit, to the safety precautions you should take, we've got you covered.

**1. Best Time to Visit:**
The ideal time to explore the Sundarbans is during the winter months, from November to February. The weather is cool and pleasant, making it easier to navigate the waterways and enjoy the wildlife.

**2. What to Pack:**
Pack light, comfortable clothing, preferably in earthy tones to blend in with the environment. Don't forget your binoculars, camera, insect repellent, and a good pair of walking shoes.

**3. Wildlife Spotting:**
Apart from the Royal Bengal Tiger, keep an eye out for saltwater crocodiles, spotted deer, wild boars, and a variety of bird species. The forest is also home to the Gangetic dolphin, which can sometimes be spotted in the rivers.`,
    author: "ShobujBangla Team",
    date: "July 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1616854190849-db3f74619d0a?q=80&w=1470&auto=format&fit=crop",
    tags: ["Nature", "Adventure", "Guide"],
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium"
      >
        <FiArrowLeft /> Back to Blogs
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex justify-center items-center gap-4 text-sm text-foreground/60 mb-4 flex-wrap">
            <span className="flex items-center gap-1"><FiCalendar /> {blog.date}</span>
            <span className="flex items-center gap-1"><FiClock /> {blog.readTime}</span>
            <span className="flex items-center gap-1"><FiUser /> {blog.author}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>
          <div className="flex justify-center gap-2">
            {blog.tags.map(tag => (
              <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <FiTag size={12}/> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-lg"
        >
          {/* We use standard img to avoid next/image hostname config issues temporarily if any */}
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          {blog.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-foreground/80 leading-relaxed mb-6 text-lg">
              {paragraph.includes('**') ? (
                <span dangerouslySetInnerHTML={{__html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
              ) : paragraph}
            </p>
          ))}
        </motion.div>

        {/* Footer Actions */}
        <div className="border-t border-border pt-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h4 className="font-bold">Share this post:</h4>
            <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <FiShare2 />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
