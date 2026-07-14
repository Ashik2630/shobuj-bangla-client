export default function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl border border-border bg-card p-4 ${className}`}>
      <div className="h-40 bg-muted/40 rounded-lg mb-4" />
      <div className="h-4 bg-muted/40 rounded w-3/4 mb-2" />
      <div className="h-3 bg-muted/40 rounded w-1/2 mb-4" />
      <div className="flex justify-between items-center">
        <div className="h-8 bg-muted/40 rounded w-20" />
        <div className="h-8 bg-muted/40 rounded w-16" />
      </div>
    </div>
  );
}
