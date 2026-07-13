// Utility function to handle broken images
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = e.currentTarget;
  img.src = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80";
  img.style.filter = "opacity(0.8)";
}

// Image loader component for Next.js Image
export function bangladeshImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If it's already a full URL, return as is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Otherwise, construct the URL for public folder
  return `${src}?w=${width}&q=${quality || 75}`;
}

// Validate if URL is valid
export function isValidImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
