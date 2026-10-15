"use client";

import { useEffect, useState, useMemo } from "react";
import type { XtremeEvent } from "@/lib/vtools";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import WorldMapEvents from "./WorldMapEvents";
import {
  resolveR10Location,
  filterR10IeeeXtremeEvents,
  R10_HUBS,
  R10_REGIONAL_HUB,
} from "@/lib/r10Locations";

type Status = "loading" | "ready" | "error";
type ViewMode = "cards" | "map";
type DateFilter = "all" | "upcoming" | "past";

export default function EventsSection() {
  const [events, setEvents] = useState<XtremeEvent[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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

  const nowTime = useMemo(() => Date.now(), []);

  // Filter exclusively to IEEE Region 10 events tagged with #ieeextreme
  const r10XtremeEvents = useMemo(() => {
    return filterR10IeeeXtremeEvents(events);
  }, [events]);

  // Target dataset for Cards View (filtered by selected location hub or all R10 #IEEEXtreme events)
  const cardsBaseEvents = useMemo(() => {
    if (selectedRegion) {
      return r10XtremeEvents.filter((e) => {
        const hub = resolveR10Location(e);
        return hub.id === selectedRegion;
      });
    }
    return r10XtremeEvents;
  }, [r10XtremeEvents, selectedRegion]);

  // Calculate upcoming and past counts for Cards View
  const { upcomingCount, pastCount } = useMemo(() => {
    let upcoming = 0;
    let past = 0;
    for (const event of cardsBaseEvents) {
      if (event.startTime) {
        const t = new Date(event.startTime).getTime();
        if (t >= nowTime) {
          upcoming++;
        } else {
          past++;
        }
      }
    }
    return { upcomingCount: upcoming, pastCount: past };
  }, [cardsBaseEvents, nowTime]);

  // Total Region 10 upcoming count for the map view
  const r10UpcomingCount = useMemo(() => {
    return r10XtremeEvents.filter((e) => e.startTime && new Date(e.startTime).getTime() >= nowTime).length;
  }, [r10XtremeEvents, nowTime]);

  // Filter events for Cards View based on Date Status, Region, and Search Query
  const filteredEvents = useMemo(() => {
    let list = cardsBaseEvents;

    // 1. Date Status Filter
    if (dateFilter === "upcoming") {
      list = list.filter((e) => e.startTime && new Date(e.startTime).getTime() >= nowTime);
    } else if (dateFilter === "past") {
      list = list.filter((e) => e.startTime && new Date(e.startTime).getTime() < nowTime);
    }

    // 2. Search Query Filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter((e) => {
        const matchesTitle = e.title.toLowerCase().includes(q);
        const matchesLocation = (e.location ?? "").toLowerCase().includes(q);
        const matchesBranch = (e.studentBranch ?? "").toLowerCase().includes(q);
        const matchesSection = (e.section ?? "").toLowerCase().includes(q);
        const matchesDesc = (e.description ?? "").toLowerCase().includes(q);
        const matchesTags = e.hashtags.some((t) => t.toLowerCase().includes(q));

        return (
          matchesTitle ||
          matchesLocation ||
          matchesBranch ||
          matchesSection ||
          matchesDesc ||
          matchesTags
        );
      });
    }

    return list;
  }, [cardsBaseEvents, dateFilter, searchQuery, nowTime]);

  const DATE_TABS = [
    { id: "all" as DateFilter, label: "All #IEEEXtreme", count: cardsBaseEvents.length },
    { id: "upcoming" as DateFilter, label: "Upcoming", icon: "🚀", count: upcomingCount },
    { id: "past" as DateFilter, label: "Past / Completed", icon: "🏁", count: pastCount },
  ];

  return (
    <section id="events" className="border-b border-line/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header with Title and View Switcher */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-signal animate-pulse" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-semibold">
                Live feed · #IEEEXtreme · Region 10
              </p>
            </div>
            <h2 className="font-display text-3xl font-bold text-text md:text-5xl">
              Events
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Pulled straight from vTools Events and filtered to everything
              tagged <span className="font-mono text-signal">#IEEEXtreme</span> across{" "}
              <span className="text-text font-medium">IEEE Region 10 (Asia-Pacific)</span> —
              title, photo, section, and Student Branch included.
            </p>
          </div>

          {/* View Mode Toggle: World Map vs Cards View */}
          <div className="flex items-center self-start md:self-end rounded-2xl border border-line bg-panel p-1.5 shadow-lg">
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
                viewMode === "map"
                  ? "bg-signal text-void shadow-md shadow-signal/20 font-bold"
                  : "text-muted hover:text-text hover:bg-void/40"
              }`}
              title="Switch to Interactive World Map"
            >
              <span>🗺️</span>
              <span>World Map</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
                viewMode === "cards"
                  ? "bg-signal text-void shadow-md shadow-signal/20 font-bold"
                  : "text-muted hover:text-text hover:bg-void/40"
              }`}
              title="Switch to Event Cards grid"
            >
              <span>⊞</span>
              <span>Cards View</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Date Filters (in Cards view) OR World Map Status + Search */}
        <div className="mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-y border-line/60 py-4">
          {viewMode === "cards" ? (
            /* Date / Status Filter Tabs in Cards view */
            <div className="flex flex-wrap items-center gap-2">
              {DATE_TABS.map((tab) => {
                const isActive = dateFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDateFilter(tab.id)}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-full px-4 py-2 font-mono text-xs transition-all ${
                      isActive
                        ? "bg-signal text-void font-bold shadow-md shadow-signal/20"
                        : "border border-line bg-panel text-muted hover:text-text hover:border-signal/40"
                    }`}
                  >
                    {tab.icon && <span>{tab.icon}</span>}
                    <span>{tab.label}</span>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive ? "bg-void/30 text-void font-bold" : "bg-void/70 text-muted"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* World Map view status badge */
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-signal/40 bg-signal/15 px-3.5 py-1.5 font-mono text-xs text-signal font-semibold">
                <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                <span>Region 10 · #IEEEXtreme</span>
                <span className="rounded-full bg-signal px-2 py-0.2 text-[10px] font-bold text-void">
                  {r10UpcomingCount} Upcoming
                </span>
              </span>
              <span className="hidden sm:inline font-mono text-xs text-muted">
                Displaying #IEEEXtreme events exclusively across IEEE Region 10
              </span>
            </div>
          )}

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              placeholder="Search title, branch, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-line bg-panel px-4 py-2.5 pl-9 font-mono text-xs text-text placeholder-muted focus:border-signal focus:outline-none transition-colors"
            />
            <span className="absolute left-3 top-3 text-xs text-muted">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-muted hover:text-text"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="rounded-2xl border border-line bg-panel px-6 py-16 text-center">
            <p className="font-mono text-sm text-amber">
              Couldn&apos;t load events right now.
            </p>
            <p className="mt-2 text-sm text-muted">
              vTools may be temporarily unavailable — try refreshing in a moment.
            </p>
          </div>
        )}

        {/* Ready State */}
        {status === "ready" && (
          <>
            {/* View 1: World Map View */}
            {viewMode === "map" && (
              <div>
                <WorldMapEvents
                  events={r10XtremeEvents}
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                />
              </div>
            )}

            {/* View 2: Cards Grid View */}
            {viewMode === "cards" && (
              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted">
                  <div className="flex items-center gap-2">
                    <span>
                      Showing {filteredEvents.length} of {r10XtremeEvents.length} #IEEEXtreme event(s)
                    </span>
                    {dateFilter !== "all" && (
                      <span className="rounded-full bg-signalDim/20 border border-signalDim/40 px-2 py-0.5 text-signal text-[10px]">
                        Filtered: {dateFilter === "upcoming" ? "Upcoming" : "Past"}
                      </span>
                    )}
                    {selectedRegion && (
                      <span className="rounded-full bg-signalDim/20 border border-signalDim/40 px-2 py-0.5 text-signal text-[10px]">
                        Location: {selectedRegion}
                      </span>
                    )}
                  </div>

                  {(dateFilter !== "all" || searchQuery || selectedRegion) && (
                    <button
                      onClick={() => {
                        setDateFilter("all");
                        setSearchQuery("");
                        setSelectedRegion(null);
                      }}
                      className="text-signal underline hover:text-signalDim"
                    >
                      Reset all filters
                    </button>
                  )}
                </div>

                {filteredEvents.length === 0 ? (
                  <div className="rounded-2xl border border-line bg-panel px-6 py-16 text-center">
                    <p className="font-mono text-sm text-muted">
                      {searchQuery
                        ? `No events found matching "${searchQuery}".`
                        : "No events found matching the selected filter."}
                    </p>
                    <button
                      onClick={() => {
                        setDateFilter("all");
                        setSearchQuery("");
                        setSelectedRegion(null);
                      }}
                      className="mt-4 font-mono text-xs text-signal underline hover:text-signalDim"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
