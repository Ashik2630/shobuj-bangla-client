"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { fetchWithAuth } from "@/lib/proxy";
import { FiArrowLeft } from "react-icons/fi";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    date: "",
    priority: "normal",
    image: "",
  });

  useEffect(() => {
    if (session === undefined) return; // still loading
    if (!session?.user) {
      router.replace("/login");
      return;
    }
    setLoading(false);
  }, [session, router]);

  const handleChange = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.shortDescription) {
      toast.error("Please fill required fields: title and short description.");
      return;
    }

    try {
      const res = await fetchWithAuth("/api/items", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to add item");

      toast.success("Item added successfully.");
      router.push("/items");
    } catch (err: any) {
      toast.error(err?.message || "Unable to add item.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary mb-4">
          <FiArrowLeft /> Back
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Add Item</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-2">Title</label>
              <input value={form.title} onChange={(e) => handleChange("title", e.target.value)} className="w-full rounded-xl border border-border px-4 py-3 bg-background outline-none" required />
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Short Description</label>
              <input value={form.shortDescription} onChange={(e) => handleChange("shortDescription", e.target.value)} className="w-full rounded-xl border border-border px-4 py-3 bg-background outline-none" required />
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Full Description</label>
              <textarea value={form.fullDescription} onChange={(e) => handleChange("fullDescription", e.target.value)} rows={6} className="w-full rounded-xl border border-border px-4 py-3 bg-background outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-semibold block mb-2">Price / Fee</label>
                <input value={form.price} onChange={(e) => handleChange("price", e.target.value)} className="w-full rounded-xl border border-border px-4 py-3 bg-background outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Date</label>
                <input type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} className="w-full rounded-xl border border-border px-4 py-3 bg-background outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Priority</label>
                <select value={form.priority} onChange={(e) => handleChange("priority", e.target.value)} className="w-full rounded-xl border border-border px-4 py-3 bg-background outline-none">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Image URL (optional)</label>
              <input value={form.image} onChange={(e) => handleChange("image", e.target.value)} className="w-full rounded-xl border border-border px-4 py-3 bg-background outline-none" />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="rounded-full bg-primary px-6 py-2 text-white font-semibold">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
