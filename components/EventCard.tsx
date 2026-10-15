import type { XtremeEvent } from "@/lib/vtools";
import Link from "next/link";

function formatDate(value: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export default function EventCard({ event }: { event: XtremeEvent }) {
  const date = formatDate(event.startTime);
  const isUpcoming = event.startTime
    ? new Date(event.startTime).getTime() >= Date.now()
    : false;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-signal/60">
      <Link href={`/events/${event.id}`} className="relative aspect-[16/9] w-full overflow-hidden bg-line block cursor-pointer">
        {event.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.photo}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted">
            No photo provided
          </div>
        )}
        {date && (
          <span className="absolute left-3 top-3 rounded-full bg-void/85 px-3 py-1 font-mono text-xs text-signal">
            {date}
          </span>
        )}
        {event.startTime && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider shadow backdrop-blur-md ${
                isUpcoming
                  ? "bg-emerald-950/90 text-emerald-300 border border-emerald-500/40"
                  : "bg-void/85 text-muted border border-line"
              }`}
            >
              {isUpcoming ? "● Upcoming" : "Completed"}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-text">
          <Link href={`/events/${event.id}`} className="hover:text-signal transition-colors">
            {event.title}
          </Link>
        </h3>

        {event.description && (
          <p className="line-clamp-3 text-sm text-muted leading-relaxed">
            {event.description}
          </p>
        )}

        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-muted">
          {event.section && <span>Section: {event.section}</span>}
          {event.studentBranch && <span>Branch: {event.studentBranch}</span>}
        </div>

        {event.hashtags && event.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-signalDim bg-signalDim/30 px-2.5 py-1 font-mono text-[11px] text-signal"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal py-2.5 text-center font-mono text-sm font-bold text-void transition-all hover:bg-signalDim hover:shadow-md hover:shadow-signal/20 active:scale-[0.98]"
          >
            <span>View Event Details</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
