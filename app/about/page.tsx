/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FiTarget, FiEye, FiHeart} from "react-icons/fi";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const teamMembers = [
  { name: "Arif Hossain", role: "Founder & CEO", avatar: "https://i.pravatar.cc/150?img=11", bio: "Passionate nature lover with 10+ years of exploring Bangladesh's hidden gems." },
  { name: "Nusrat Jahan", role: "Head of Content", avatar: "https://i.pravatar.cc/150?img=47", bio: "Travel writer and photographer dedicated to showcasing Bangladesh's natural beauty." },
  { name: "Rafiqul Islam", role: "Lead Developer", avatar: "https://i.pravatar.cc/150?img=12", bio: "Full-stack developer building the platform that connects nature lovers." },
  { name: "Sumaiya Akter", role: "Community Manager", avatar: "https://i.pravatar.cc/150?img=48", bio: "Connects our growing community of eco-tourists and nature enthusiasts." },
];

const stats = [
  { value: "120+", label: "Nature Spots", icon: "🌿" },
  { value: "64", label: "Districts Covered", icon: "🗺️" },
  { value: "3,500+", label: "Registered Users", icon: "👥" },
  { value: "12,000+", label: "Reviews Shared", icon: "⭐" },
];

export default function AboutPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === undefined) return;
    if (!session?.user) router.replace("/login");
  }, [session, router]);
  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2000&q=80"
            alt="Bangladesh Nature"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background via-background/70 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-6"
          >
            About ShobujBangla
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6"
          >
            We&lsquo;re on a Mission to <span className="text-primary">Protect & Promote</span> Bangladesh&lsquo;s Nature
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/70 leading-relaxed"
          >
            ShobujBangla was born from a simple idea — that Bangladesh&lsquo;s breathtaking natural beauty deserves a platform as beautiful as the destinations themselves.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-extrabold text-primary mb-1">{stat.value}</div>
                <div className="text-foreground/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Goal */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FiTarget size={32} />, title: "Our Mission", color: "text-primary bg-primary/10", desc: "To create the most comprehensive and beautiful digital platform that connects people with the natural wonders of Bangladesh, promoting sustainable eco-tourism and environmental awareness." },
              { icon: <FiEye size={32} />, title: "Our Vision", color: "text-accent bg-accent/10", desc: "A future where every corner of Bangladesh's natural landscape is discovered, appreciated, and protected by a community of passionate eco-conscious travelers and locals." },
              { icon: <FiHeart size={32} />, title: "Our Goal", color: "text-rose-500 bg-rose-500/10", desc: "To drive 1 million nature-focused trips across Bangladesh by 2027, empowering local communities, boosting rural economies, and preserving our precious biodiversity." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bangladesh */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why <span className="text-primary">Bangladesh?</span></h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">A country that packs incredible natural diversity into a compact geography.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🌊", title: "Longest Sea Beach", desc: "Cox's Bazar stretches 120km — the world's longest unbroken natural sandy sea beach." },
              { emoji: "🌳", title: "Largest Mangrove", desc: "The Sundarbans, shared with India, is the world's largest mangrove forest and home to the Royal Bengal Tiger." },
              { emoji: "🏔", title: "Scenic Hill Tracts", desc: "Bandarban, Rangamati and Khagrachhari offer breathtaking hilly terrain unlike anywhere else in the region." },
              { emoji: "💧", title: "6,000+ Rivers", desc: "Bangladesh is called the 'Land of Rivers' — its vast river network is its lifeblood and a paradise for water lovers." },
              { emoji: "🦅", title: "Rare Wildlife", desc: "Home to Irrawaddy dolphins, fishing cats, gharials, and hundreds of migratory bird species." },
              { emoji: "🌿", title: "Warm Hospitality", desc: "Bangali hospitality is legendary. Travelers are welcomed as guests in one of Asia's most culturally rich nations." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet the <span className="text-primary">Team</span></h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">A small team of nature lovers, technologists, and storytellers building the future of eco-tourism in Bangladesh.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/60 transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-foreground/60 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
