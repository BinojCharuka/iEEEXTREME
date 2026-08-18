"use client";

import { useEffect, useState } from "react";
import type { XtremeEvent } from "@/lib/vtools";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";

type Status = "loading" | "ready" | "error";

export default function EventsSection() {
  const [events, setEvents] = useState<XtremeEvent[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;

        if (!res.ok) throw new Error(json?.error ?? "Request failed");
        setEvents(json.events ?? []);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="events" className="border-b border-line/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
            Live feed · #IEEE
          </p>
          <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
            Events
          </h2>
          <p className="max-w-xl text-muted">
            Pulled straight from vTools Events and filtered to everything
            tagged <span className="font-mono text-signal">#IEEE</span> —
            title, photo, section, and Student Branch included.
          </p>
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-line bg-panel px-6 py-16 text-center">
            <p className="font-mono text-sm text-amber">
              Couldn&apos;t load events right now.
            </p>
            <p className="mt-2 text-sm text-muted">
              vTools may be temporarily unavailable — try refreshing in a
              moment.
            </p>
          </div>
        )}

        {status === "ready" && events.length === 0 && (
          <div className="rounded-2xl border border-line bg-panel px-6 py-16 text-center">
            <p className="font-mono text-sm text-muted">
              No events tagged #IEEEXtreme right now. Check back soon.
            </p>
          </div>
        )}

        {status === "ready" && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
