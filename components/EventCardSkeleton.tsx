export default function EventCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="aspect-[16/9] w-full bg-line" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-5 w-3/4 rounded bg-line" />
        <div className="h-3 w-full rounded bg-line" />
        <div className="h-3 w-5/6 rounded bg-line" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded-full bg-line" />
          <div className="h-5 w-14 rounded-full bg-line" />
        </div>
        <div className="mt-2 h-9 w-full rounded-full bg-line" />
      </div>
    </div>
  );
}
