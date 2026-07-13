"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiShare2, FiTag } from "react-icons/fi";
import Link from "next/link";
import { blogs } from "../data";

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Find the blog based on params.id
  const blog = blogs.find(b => b.id === Number(params.id)) || blogs[0];

  // Find related blogs (same category, exclude current)
  const relatedBlogs = blogs
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

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

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded text-xs font-bold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-md font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                    <div className="flex items-center justify-between text-xs text-foreground/60 mt-4">
                      <span className="flex items-center gap-1"><FiUser size={12}/> {post.author}</span>
                      <span className="flex items-center gap-1"><FiClock size={12}/> {post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
