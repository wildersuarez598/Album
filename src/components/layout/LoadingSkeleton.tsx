export function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-800" />
      <div className="h-5 w-full animate-pulse rounded-full bg-slate-800" />
      <div className="h-5 w-5/6 animate-pulse rounded-full bg-slate-800" />
    </div>
  );
}
