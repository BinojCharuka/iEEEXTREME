import { notFound } from "next/navigation";
import { fetchIEEEEvents, getEventById } from "@/lib/vtools";
import { filterR10IeeeXtremeEvents } from "@/lib/r10Locations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const allEvents = await fetchIEEEEvents();
  const r10XtremeEvents = filterR10IeeeXtremeEvents(allEvents);
  const otherEvents = r10XtremeEvents.filter((e) => e.id !== params.id).slice(0, 3);

  const formatDate = (value: string | null) => {
    if (!value) return null;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const startDate = formatDate(event.startTime);
  const endDate = formatDate(event.endTime);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-void pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/#events"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-signal"
            >
              <span>&larr;</span> Back to All Events
            </Link>

            <span className="font-mono text-xs text-signalDim bg-signalDim/10 border border-signalDim/30 rounded-full px-3 py-1">
              IEEE Region 10 Official
            </span>
          </div>

          <article className="overflow-hidden rounded-3xl border border-line bg-panel shadow-2xl">
            {/* Hero Banner Image */}
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-void border-b border-line">
              {event.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.photo}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-mono text-sm text-muted bg-gradient-to-r from-void to-panel">
                  IEEE Asia-Pacific Region 10
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/30 to-transparent" />

              {/* Badge Overlays */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {event.category && (
                  <span className="rounded-full bg-signal/90 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-void shadow-lg backdrop-blur-md">
                    {event.category}
                  </span>
                )}
                <span
                  className={`rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${
                    event.isVirtual
                      ? "bg-purple-900/90 text-purple-200 border border-purple-500/40"
                      : "bg-emerald-950/90 text-emerald-300 border border-emerald-500/40"
                  }`}
                >
                  {event.isVirtual ? "Virtual Event" : "In-Person Event"}
                </span>
              </div>
            </div>

            {/* Event Body Header */}
            <div className="p-6 md:p-10">
              <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight text-text md:text-5xl">
                {event.title}
              </h1>

              {/* Theme Callout (if available) */}
              {event.theme && (
                <div className="mb-8 rounded-2xl border border-signal/30 bg-signal/5 p-4 md:p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-signalDim mb-1 font-semibold">
                    Conference Theme
                  </p>
                  <p className="font-display text-lg md:text-xl font-medium text-text italic">
                    &ldquo;{event.theme}&rdquo;
                  </p>
                </div>
              )}

              {/* Quick Metadata Grid */}
              <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl border border-line/70 bg-void/60 p-5 font-mono text-xs">
                {/* Dates */}
                <div className="flex flex-col gap-1.5 p-2">
                  <span className="text-[11px] uppercase tracking-wider text-signalDim font-semibold">
                    📅 Date & Time
                  </span>
                  <span className="text-sm font-medium text-text">
                    {startDate} {endDate && startDate !== endDate ? `– ${endDate}` : ""}
                  </span>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5 p-2">
                  <span className="text-[11px] uppercase tracking-wider text-signalDim font-semibold">
                    📍 Location / Venue
                  </span>
                  <span className="text-sm font-medium text-text leading-snug">
                    {event.location ?? "Asia-Pacific (Region 10)"}
                  </span>
                </div>

                {/* Organizer */}
                <div className="flex flex-col gap-1.5 p-2">
                  <span className="text-[11px] uppercase tracking-wider text-signalDim font-semibold">
                    🏛️ Host & Section
                  </span>
                  <span className="text-sm font-medium text-text leading-snug">
                    {[event.section, event.studentBranch].filter(Boolean).join(" / ") || "IEEE Region 10"}
                  </span>
                </div>

                {/* Region */}
                <div className="flex flex-col gap-1.5 p-2">
                  <span className="text-[11px] uppercase tracking-wider text-signalDim font-semibold">
                    🌐 Region Scope
                  </span>
                  <span className="text-sm font-medium text-text">
                    IEEE Region 10 (Asia-Pacific)
                  </span>
                </div>
              </div>

              {/* Important Milestones / Timeline (if available) */}
              {event.importantDates && event.importantDates.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-4 font-display text-xl font-bold text-text flex items-center gap-2">
                    <span className="text-signal">⏱</span> Important Dates & Milestones
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {event.importantDates.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-line bg-void/50 p-4 transition-colors hover:border-signal/50"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-1">
                          {milestone.label}
                        </p>
                        <p className="font-mono text-sm font-bold text-signal">
                          {milestone.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Description */}
              <div className="mb-10">
                <h2 className="mb-4 font-display text-xl font-bold text-text">
                  Event Overview & Description
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-muted/90 whitespace-pre-line">
                  {event.description}
                </div>
              </div>

              {/* Focus Tracks (if available) */}
              {event.tracks && event.tracks.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-4 font-display text-xl font-bold text-text flex items-center gap-2">
                    <span className="text-signal">🔬</span> Technical Tracks & Scope
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.tracks.map((track, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-line/60 bg-void/40 p-3.5 transition-colors hover:border-signal/40"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-xs font-bold text-signal">
                          {i + 1}
                        </span>
                        <p className="text-sm font-medium text-text leading-snug">
                          {track}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizing Co-Chairs (if available) */}
              {event.coChairs && event.coChairs.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-4 font-display text-xl font-bold text-text flex items-center gap-2">
                    <span className="text-signal">👥</span> Organizing Leadership & Chairs
                  </h2>
                  <div className="flex flex-col gap-2 rounded-2xl border border-line/60 bg-void/40 p-4">
                    {event.coChairs.map((chair, i) => (
                      <p key={i} className="font-mono text-xs text-text/90 flex items-center gap-2">
                        <span className="text-signal">&bull;</span> {chair}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Hashtags */}
              {event.hashtags && event.hashtags.length > 0 && (
                <div className="mb-10 flex flex-wrap gap-2">
                  {event.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-signalDim/40 bg-signalDim/15 px-3 py-1 font-mono text-xs text-signal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons Box */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-8">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://www.ieeer10.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted hover:text-signal transition-colors"
                  >
                    IEEE Asia-Pacific Region 10 (ieeer10.org) ↗
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {event.websiteUrl && (
                    <a
                      href={event.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-signal/60 bg-void px-6 py-3 font-mono text-xs font-semibold text-signal transition-all hover:bg-signal/10 hover:border-signal active:scale-[0.98]"
                    >
                      Official Website ↗
                    </a>
                  )}

                  {event.registerUrl && (
                    <a
                      href={event.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-signal px-8 py-3.5 font-mono text-xs font-bold text-void transition-all hover:bg-signal/90 hover:shadow-xl hover:shadow-signal/20 active:scale-[0.98]"
                    >
                      Register Now &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* Other Region 10 IEEEXtreme Events Recommendation */}
          {otherEvents.length > 0 && (
            <div className="mt-16 border-t border-line/60 pt-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                      IEEE Region 10
                    </span>
                    <span className="rounded-full bg-signal/15 border border-signal/40 px-2.5 py-0.5 font-mono text-[10px] text-signal font-bold uppercase tracking-wider">
                      🏷️ #IEEEXtreme
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text md:text-3xl">
                    Explore More #IEEEXtreme Events in Region 10
                  </h3>
                </div>
                <Link
                  href="/#events"
                  className="font-mono text-xs text-signal underline hover:text-signalDim shrink-0"
                >
                  View Live World Map &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherEvents.map((oe) => (
                  <Link
                    key={oe.id}
                    href={`/events/${oe.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel p-5 transition-all hover:border-signal/60 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-2">
                      <span className="rounded bg-signal/15 border border-signal/30 px-2 py-0.5 text-signal font-semibold">
                        📅 {oe.startTime ? formatDate(oe.startTime) : "Date TBD"}
                      </span>
                      <span>{oe.isVirtual ? "🌐 Virtual" : oe.location || "On-site"}</span>
                    </div>

                    <h4 className="font-display text-base font-bold text-text group-hover:text-signal transition-colors mb-2 line-clamp-2">
                      {oe.title}
                    </h4>

                    {(oe.studentBranch || oe.section) && (
                      <p className="font-mono text-[11px] text-muted mb-3 line-clamp-1">
                        🏛️ {oe.studentBranch || oe.section}
                      </p>
                    )}

                    {oe.hashtags && oe.hashtags.length > 0 && (
                      <div className="mt-auto mb-3 flex flex-wrap gap-1">
                        {oe.hashtags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-line/60 px-1.5 py-0.5 font-mono text-[9px] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="font-mono text-xs text-signal font-bold pt-3 border-t border-line/40 flex items-center justify-between group-hover:text-signalDim">
                      <span>View Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
