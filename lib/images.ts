// Bangladesh Tourism Images Configuration
export const bangladeshImages = {
  // Hero Slides
  heroSlides: [
    {
      id: "slide-1",
      title: "Hidden Gems of Bangladesh",
      subtitle: "From emerald hills to serene coasts, uncover the places that make Bangladesh unforgettable.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
      badge: "Nature Escape",
      highlight: "Sajek • Cox's Bazar • Sundarbans",
    },
    {
      id: "slide-2",
      title: "Journey Through Scenic Landscapes",
      subtitle: "Follow rivers, forests, and waterfalls that invite you to slow down and breathe in the beauty.",
      image: "https://images.unsplash.com/photo-1469022563149-aa64ffc5be19?auto=format&fit=crop&w=2000&q=80",
      badge: "Adventure Ready",
      highlight: "Nafakhum • Ratargul • Jaflong",
    },
    {
      id: "slide-3",
      title: "Plan Your Next Nature Retreat",
      subtitle: "Discover top-rated destinations, local stories, and travel inspiration in one beautiful place.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
      badge: "Travel Inspiration",
      highlight: "Saint Martin • Lawachara • Bandarban",
    },
  ],

  // Featured Places with Relevant Images
  places: {
    "sajek-valley": {
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
      overview: "A perfect escape for travelers who love misty hills, cool weather, and breathtaking panoramic views.",
      highlights: [
        "Cloudy mountain views",
        "Sunrise and sunset points",
        "Local homestay experience",
        "Adventure trekking routes",
      ],
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
        {
          id: 2,
          title: "Sundarbans",
          district: "Khulna",
          image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Cox's Bazar",
          district: "Cox's Bazar",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 4,
          title: "Ratargul Swamp Forest",
          district: "Sylhet",
          image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    "sundarbans": {
      id: 2,
      title: "Sundarbans",
      district: "Khulna",
      division: "Khulna",
      category: "Forests",
      rating: 4.9,
      entryFee: "500 BDT",
      bestSeason: "October to March",
      image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
      description:
        "The Sundarbans is the world's largest mangrove forest and a UNESCO World Heritage Site, home to the majestic Bengal Tiger.",
      overview: "An extraordinary ecosystem where land meets sea, teeming with wildlife and natural wonders.",
      highlights: [
        "Royal Bengal Tigers",
        "Mangrove forest ecosystem",
        "Boat safari adventures",
        "Bird watching paradise",
      ],
      specs: [
        { label: "Best Time", value: "October to March" },
        { label: "Travel Type", value: "Multi-day expedition" },
        { label: "Entry Fee", value: "500 BDT per person" },
        { label: "Nearby Town", value: "Khulna" },
      ],
      reviews: [
        { name: "Ahmed", rating: 5, text: "Saw a tiger! Unforgettable experience." },
        { name: "Fatima", rating: 5, text: "Nature at its most pristine and wild." },
      ],
      related: [
        {
          id: 1,
          title: "Sajek Valley",
          district: "Rangamati",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Cox's Bazar",
          district: "Cox's Bazar",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    "coxs-bazar": {
      id: 3,
      title: "Cox's Bazar",
      district: "Cox's Bazar",
      division: "Chattogram",
      category: "Sea Beaches",
      rating: 4.6,
      entryFee: "Free",
      bestSeason: "October to March",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      description:
        "Cox's Bazar is home to the world's longest natural sea beach spanning over 120 kilometers of golden sand.",
      overview: "A beach lover's paradise with endless golden sands, stunning sunsets, and vibrant beach culture.",
      highlights: [
        "Longest sea beach in the world",
        "Sunset views",
        "Fresh seafood",
        "Beach resort facilities",
      ],
      specs: [
        { label: "Best Time", value: "October to March" },
        { label: "Travel Type", value: "Beach vacation" },
        { label: "Entry Fee", value: "Free" },
        { label: "Beach Length", value: "120+ km" },
      ],
      reviews: [
        { name: "Saiful", rating: 5, text: "Amazing beach experience with perfect weather." },
        { name: "Zahra", rating: 4, text: "Great for relaxation and water activities." },
      ],
      related: [
        {
          id: 1,
          title: "Sajek Valley",
          district: "Rangamati",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Sundarbans",
          district: "Khulna",
          image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    "ratargul-swamp": {
      id: 4,
      title: "Ratargul Swamp Forest",
      district: "Sylhet",
      division: "Sylhet",
      category: "Forests",
      rating: 4.7,
      entryFee: "100 BDT",
      bestSeason: "June to August",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      description:
        "Ratargul is a freshwater swamp forest unique to Bangladesh, accessible only by boat, offering a mystical forest experience.",
      overview: "A enchanting waterlogged forest where trees emerge from still water, creating a magical landscape.",
      highlights: [
        "Boat navigation through forest",
        "Unique ecosystem",
        "Photography paradise",
        "Peaceful atmosphere",
      ],
      specs: [
        { label: "Best Time", value: "June to August" },
        { label: "Travel Type", value: "Day trip" },
        { label: "Entry Fee", value: "100 BDT" },
        { label: "Travel Method", value: "Boat safari" },
      ],
      reviews: [
        { name: "Karim", rating: 5, text: "Absolutely magical place, felt like entering another world." },
        { name: "Rima", rating: 5, text: "Perfect for nature photography." },
      ],
      related: [
        {
          id: 1,
          title: "Sajek Valley",
          district: "Rangamati",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Sundarbans",
          district: "Khulna",
          image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  },

  // Category Images
  categoryImages: {
    Hills: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    "Sea Beaches": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    Forests: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    Rivers: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    Waterfalls: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    Wildlife: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    "National Parks": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    "Eco Parks": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  },

  // Fallback Image
  fallback:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",

  // Get image with fallback
  getImage: (url?: string | null): string => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return bangladeshImages.fallback;
    }
    return url;
  },
};
