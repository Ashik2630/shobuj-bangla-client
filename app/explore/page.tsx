/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import SkeletonCard from "@/components/SkeletonCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiSearch, FiMapPin, FiStar, FiFilter, FiGrid, FiList, FiPlus, FiImage } from "react-icons/fi";

type Place = {
  id: string;
  title: string;
  district: string;
  division: string;
  category: string;
  rating: number;
  entryFee: string;
  bestSeason?: string;
  image: string;
};



export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [newPlace, setNewPlace] = useState({
    title: "",
    district: "",
    division: "",
    category: "",
    rating: 5,
    entryFee: "Free",
    bestSeason: "Winter",
    image: "",
  });
  const itemsPerPage = 6;

  useEffect(() => {
    const loadPlaces = async () => {
      setPlacesLoading(true);
      try {
        const response = await fetch("/api/places");
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.places)) {
          const normalizedPlaces = data.places.map((place: Record<string, unknown>) => ({
            ...place,
            id: String((place._id as string | undefined) ?? (place.id as string | undefined) ?? ""),
            image:
              (place.image as string | undefined) ||
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
          }));

          setPlaces(normalizedPlaces);
        }
      } catch (error) {
        console.error("Failed to load places from database", error);
      }
      finally {
        setPlacesLoading(false);
      }
    };

    loadPlaces();
  }, []);

  const toggleCategory = (cat: string) => {
    setCurrentPage(1); // Reset to page 1 on filter change
    if (cat === "All") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleDivision = (div: string) => {
    setCurrentPage(1); // Reset to page 1 on filter change
    if (div === "All") {
      setSelectedDivisions([]);
      return;
    }
    setSelectedDivisions(prev => 
      prev.includes(div) ? prev.filter(d => d !== div) : [...prev, div]
    );
  };

  const filteredPlaces = places.filter(place => {
    // Search match
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      place.title.toLowerCase().includes(searchLower) ||
      place.district.toLowerCase().includes(searchLower) ||
      place.category.toLowerCase().includes(searchLower);
    
    // Category match
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(place.category);
    
    // Division match
    const matchesDivision = selectedDivisions.length === 0 || selectedDivisions.includes(place.division);
    
    return matchesSearch && matchesCategory && matchesDivision;
  }).sort((a, b) => {
    if (sortBy === "Highest Rating") return b.rating - a.rating;
    if (sortBy === "Most Popular") return b.rating - a.rating; // using rating as popularity proxy
    if (sortBy === "Lowest Price") {
      const priceA = a.entryFee === "Free" ? 0 : parseInt(a.entryFee.replace(/\D/g, '')) || 0;
      const priceB = b.entryFee === "Free" ? 0 : parseInt(b.entryFee.replace(/\D/g, '')) || 0;
      return priceA - priceB;
    }
    // Newest First (default, ID desc)
    return Number(b.id) - Number(a.id);
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);
  const paginatedPlaces = filteredPlaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle search change resetting pagination
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPlace.title || !newPlace.district || !newPlace.division || !newPlace.category) {
      return;
    }

    const placeToAdd = {
      id: String(Date.now()),
      ...newPlace,
      image:
        newPlace.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    };

    setPlaces((prev) => [placeToAdd, ...prev]);
    setNewPlace({
      title: "",
      district: "",
      division: "",
      category: "",
      rating: 5,
      entryFee: "Free",
      bestSeason: "Winter",
      image: "",
    });
    setShowAddForm(false);
    setCurrentPage(1);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="bg-primary/5 py-12 border-b border-border mb-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Explore <span className="text-primary">Bangladesh</span></h1>
          <p className="text-foreground/70 mb-8">Discover breathtaking destinations across the country.</p>
          
          <div className="flex bg-card rounded-full shadow-lg border border-border p-2">
            <input 
              type="text"
              placeholder="Search by name, district, or category..."
              className="grow bg-transparent border-none outline-none px-4 text-foreground"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-lg mb-4 pb-4 border-b border-border">
              <FiFilter className="text-primary" /> Filters
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {["All", "Hills", "Sea Beaches", "Forests", "Waterfalls", "Rivers", "National Parks"].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded text-primary border-border focus:ring-primary accent-primary cursor-pointer" 
                      />
                      <span className="text-foreground/80 group-hover:text-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Division</h3>
                <div className="space-y-2">
                  {["All", "Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Barishal", "Rangpur", "Mymensingh"].map(div => (
                    <label key={div} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={div === "All" ? selectedDivisions.length === 0 : selectedDivisions.includes(div)}
                        onChange={() => toggleDivision(div)}
                        className="w-4 h-4 rounded text-primary border-border focus:ring-primary accent-primary cursor-pointer" 
                      />
                      <span className="text-foreground/80 group-hover:text-primary transition-colors">{div}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-6 bg-card border border-border p-4 rounded-xl shadow-sm">
            <span className="text-foreground/70 font-medium">Showing {filteredPlaces.length} places</span>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/add-place"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
              >
                <FiPlus /> Add Place
              </Link>

              <select 
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary cursor-pointer"
              >
                <option value="Newest First">Newest First</option>
                <option value="Highest Rating">Highest Rating</option>
                <option value="Most Popular">Most Popular</option>
                <option value="Lowest Price">Lowest Price</option>
              </select>
              
              <div className="flex items-center gap-2 bg-muted p-1 rounded-lg border border-border">
                <button 
                  onClick={() => setViewMode("grid")} 
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-card shadow-sm text-primary" : "text-foreground/60 hover:text-primary"}`}
                >
                  <FiGrid />
                </button>
                <button 
                  onClick={() => setViewMode("list")} 
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-card shadow-sm text-primary" : "text-foreground/60 hover:text-primary"}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddPlace}
              className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2">
                <FiImage className="text-primary" />
                <h3 className="text-lg font-semibold">Add a new destination</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Place name"
                  value={newPlace.title}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, title: e.target.value }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="District"
                  value={newPlace.district}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, district: e.target.value }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Division"
                  value={newPlace.division}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, division: e.target.value }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newPlace.category}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, category: e.target.value }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  required
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="Rating"
                  value={newPlace.rating}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Entry Fee"
                  value={newPlace.entryFee}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, entryFee: e.target.value }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Best Season"
                  value={newPlace.bestSeason}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, bestSeason: e.target.value }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={newPlace.image}
                  onChange={(e) => setNewPlace((prev) => ({ ...prev, image: e.target.value }))}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Save Place
                </button>
              </div>
            </motion.form>
          )}

          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {placesLoading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => (
                <div key={i}>
                  <SkeletonCard />
                </div>
              ))
            ) : paginatedPlaces.length > 0 ? (
              paginatedPlaces.map((place, i) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex ${viewMode === "list" ? "flex-row h-48" : "flex-col"}`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3" : "h-56"}`}>
                    <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-primary">
                      {place.category}
                    </div>
                    <img 
                      src={place.image} 
                      alt={place.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className={`p-5 flex flex-col justify-between ${viewMode === "list" ? "w-2/3" : ""}`}>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{place.title}</h3>
                        <div className="flex items-center gap-1 text-amber-500 text-sm font-medium bg-amber-500/10 px-2 py-0.5 rounded text-nowrap">
                          <FiStar className="fill-current" />
                          <span>{place.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-foreground/60 text-sm mb-3">
                        <FiMapPin className="mr-1 text-primary/70" />
                        <span>{place.district}, {place.division}</span>
                      </div>
                      
                      {viewMode === "list" && (
                        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                          Experience the beauty of {place.title}, a top destination for {place.category.toLowerCase()} lovers in the {place.division} division.
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <div className="text-sm">
                        <span className="text-foreground/60 text-xs block">Entry Fee</span>
                        <span className="font-semibold text-foreground">{place.entryFee}</span>
                      </div>
                      <Link 
                        href={`/explore/${place.id}`}
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-card border border-border rounded-2xl">
                <FiSearch size={48} className="text-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No places found</h3>
                <p className="text-foreground/60 max-w-sm">We could&lsquo;t find any places matching your current filters. Try adjusting your search or categories.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                    setSelectedDivisions([]);
                    setSortBy("Newest First");
                  }}
                  className="mt-6 bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-12 flex justify-center">
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground/70 hover:bg-muted disabled:opacity-50 transition-colors"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-10 h-10 rounded-lg font-medium flex items-center justify-center transition-colors ${
                      currentPage === idx + 1 
                        ? "bg-primary text-white" 
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
