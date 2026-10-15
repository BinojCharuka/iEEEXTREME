"use client";

import React, { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import type { XtremeEvent } from "@/lib/vtools";
import {
  filterR10Events,
  isIeeeXtremeEvent,
  resolveR10Location,
  R10_COUNTRY_NAMES,
  R10_HUBS,
  R10_REGIONAL_HUB,
  type R10LocationHub,
} from "@/lib/r10Locations";
import EventCard from "./EventCard";
import Link from "next/link";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapEventsProps {
  events: XtremeEvent[];
  selectedRegion?: string | null;
  onSelectRegion?: (region: string | null) => void;
}

type MapDateFilter = "all" | "upcoming";

export default function WorldMapEvents({
  events,
  selectedRegion,
  onSelectRegion,
}: WorldMapEventsProps) {
  // Region card popup state
  const [activeCardHubId, setActiveCardHubId] = useState<string | null>(null);
  const [hoveredHubId, setHoveredHubId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<MapDateFilter>("all");

  const nowTime = useMemo(() => Date.now(), []);

  // 1. Strictly filter to Region 10 events tagged with #IEEEXtreme
  const r10XtremeEvents = useMemo(() => {
    return filterR10Events(events).filter(isIeeeXtremeEvent);
  }, [events]);

  const upcomingXtremeCount = useMemo(() => {
    return r10XtremeEvents.filter(
      (e) => e.startTime && new Date(e.startTime).getTime() >= nowTime
    ).length;
  }, [r10XtremeEvents, nowTime]);

  // 2. Filter dataset based on date selection
  const filteredMapEvents = useMemo(() => {
    if (dateFilter === "upcoming") {
      return r10XtremeEvents.filter(
        (e) => e.startTime && new Date(e.startTime).getTime() >= nowTime
      );
    }
    return r10XtremeEvents;
  }, [r10XtremeEvents, dateFilter, nowTime]);

  // 3. Group events by IEEE Region 10 Location Hubs
  const { eventsByHubId, hubsById, activeHubs } = useMemo(() => {
    const grouped: Record<string, XtremeEvent[]> = {};
    const hubMap: Record<string, R10LocationHub> = {
      [R10_REGIONAL_HUB.id]: R10_REGIONAL_HUB,
    };

    for (const hub of R10_HUBS) {
      hubMap[hub.id] = hub;
    }

    for (const event of filteredMapEvents) {
      const hub = resolveR10Location(event);
      if (!grouped[hub.id]) {
        grouped[hub.id] = [];
      }
      grouped[hub.id].push(event);
    }

    // Active hubs that have events under current filter
    const active = Object.keys(grouped)
      .map((id) => hubMap[id] || R10_REGIONAL_HUB)
      .filter(Boolean);

    return {
      eventsByHubId: grouped,
      hubsById: hubMap,
      activeHubs: active,
    };
  }, [filteredMapEvents]);

  // Find currently active hub for popup card and filter
  const inspectHubId =
    activeCardHubId ||
    (selectedRegion && eventsByHubId[selectedRegion] ? selectedRegion : null);

  const inspectHub = inspectHubId ? hubsById[inspectHubId] : null;
  const inspectEvents = inspectHubId ? eventsByHubId[inspectHubId] || [] : [];

  // Events to display in grid below map: either selected hub or all filtered Region 10 events
  const displayedEvents = useMemo(() => {
    if (selectedRegion && eventsByHubId[selectedRegion]) {
      return eventsByHubId[selectedRegion];
    }
    return filteredMapEvents;
  }, [selectedRegion, eventsByHubId, filteredMapEvents]);

  const handleSelectMarker = (hubId: string) => {
    if (activeCardHubId === hubId && selectedRegion === hubId) {
      setActiveCardHubId(null);
      onSelectRegion?.(null);
    } else {
      setActiveCardHubId(hubId);
      onSelectRegion?.(hubId);
    }
  };

  // Permanent Region 10 (Asia-Pacific) projection configuration
  const projectionConfig = { scale: 260, center: [95, 12] as [number, number] };

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden bg-void border border-line p-4 md:p-8 shadow-2xl">
      {/* Map Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
              IEEE Region 10 · Live Map Feed
            </span>
            <span className="rounded-full bg-signal/15 border border-signal/40 px-2.5 py-0.5 font-mono text-[10px] text-signal font-bold uppercase tracking-wider">
              🏷️ #IEEEXtreme ({filteredMapEvents.length} Events)
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text md:text-3xl mt-1">
            Explore #IEEEXtreme Events in Region 10
          </h2>
          <p className="text-muted mt-1 font-mono text-xs md:text-sm">
            Filtered exclusively by #IEEEXtreme tag across IEEE Region 10 (Asia-Pacific) student branches &amp; sections.
          </p>
        </div>

        {/* Header Controls: Date Filter & Reset */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {/* Date Filter Toggle: All vs Upcoming */}
          <div className="inline-flex items-center rounded-xl border border-line bg-panel p-1 shrink-0 gap-1 shadow-sm">
            <button
              onClick={() => setDateFilter("all")}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                dateFilter === "all"
                  ? "bg-signal text-void font-bold shadow-sm"
                  : "text-muted hover:text-text hover:bg-white/5"
              }`}
              title="Show all IEEEXtreme events in Region 10"
            >
              <span>⚡</span>
              <span>All</span>
              <span
                className={`text-[11px] font-semibold ${
                  dateFilter === "all" ? "text-void/90" : "text-signal"
                }`}
              >
                ({r10XtremeEvents.length})
              </span>
            </button>
            <button
              onClick={() => setDateFilter("upcoming")}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                dateFilter === "upcoming"
                  ? "bg-signal text-void font-bold shadow-sm"
                  : "text-muted hover:text-text hover:bg-white/5"
              }`}
              title="Show upcoming IEEEXtreme events"
            >
              <span>🚀</span>
              <span>Upcoming</span>
              <span
                className={`text-[11px] font-semibold ${
                  dateFilter === "upcoming" ? "text-void/90" : "text-signal"
                }`}
              >
                ({upcomingXtremeCount})
              </span>
            </button>
          </div>

          {selectedRegion && (
            <button
              onClick={() => {
                onSelectRegion?.(null);
                setActiveCardHubId(null);
              }}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-xs text-signal hover:bg-signal hover:text-void transition-all shadow-md shadow-signal/10 shrink-0"
            >
              <span>✕</span>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Map Graphic Container with Floating Details Card */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-panel/70 border border-line/70">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties?.name || "";
                const isR10Country = R10_COUNTRY_NAMES.has(countryName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isR10Country ? "#1c1813" : "#0e0e0e"}
                    stroke={isR10Country ? "#FF7A00" : "#222222"}
                    strokeWidth={isR10Country ? 0.75 : 0.4}
                    strokeOpacity={isR10Country ? 0.4 : 0.6}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        outline: "none",
                        fill: isR10Country ? "#2a2219" : "#161616",
                      },
                      pressed: { outline: "none" },
                    } as any}
                  />
                );
              })
            }
          </Geographies>

          {activeHubs.map((hub) => {
            const isSelected =
              selectedRegion === hub.id || activeCardHubId === hub.id;
            const isHovered = hoveredHubId === hub.id;
            const count = eventsByHubId[hub.id]?.length || 0;

            return (
              <Marker
                key={hub.id}
                coordinates={hub.coordinates}
                onClick={() => handleSelectMarker(hub.id)}
                onMouseEnter={() => setHoveredHubId(hub.id)}
                onMouseLeave={() => setHoveredHubId(null)}
                className="cursor-pointer outline-none"
              >
                {/* 1. Large transparent hitbox for smooth, reliable hovering */}
                <circle r={26} fill="transparent" className="cursor-pointer" />

                {/* 2. Pulse ring for active/selected markers */}
                <circle
                  r={isSelected ? 26 : isHovered ? 22 : 18}
                  fill="none"
                  stroke="#FF7A00"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  style={{ pointerEvents: "none" }}
                  className={`${
                    isSelected
                      ? "animate-ping opacity-60"
                      : isHovered
                      ? "opacity-80"
                      : "animate-pulse opacity-40"
                  }`}
                />

                {/* 3. Main pin circle with signal styling */}
                <circle
                  r={isSelected ? 18 : isHovered ? 16 : 13}
                  fill={isSelected ? "#FF7A00" : isHovered ? "#FF881A" : "#EA580C"}
                  stroke="#000"
                  strokeWidth={2}
                  style={{ pointerEvents: "none" }}
                  className="shadow-lg transition-all duration-150"
                />

                {/* 4. Flag or Hub ID text */}
                <text
                  textAnchor="middle"
                  y={4}
                  style={{
                    fontFamily: "monospace",
                    fontSize: isHovered ? "11px" : "10px",
                    fill: "#000",
                    fontWeight: "bold",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {hub.id === "R10_HUB" ? "R10" : hub.id}
                </text>

                {/* 5. Count badge pill */}
                <g transform="translate(11, -12)" style={{ pointerEvents: "none" }}>
                  <rect
                    width={20}
                    height={15}
                    rx={7.5}
                    fill="#0A0A0A"
                    stroke="#FF7A00"
                    strokeWidth={1.5}
                  />
                  <text
                    x={10}
                    y={11}
                    textAnchor="middle"
                    fill="#FF7A00"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "9px",
                      fontWeight: "bold",
                    }}
                  >
                    {count}
                  </text>
                </g>

                {/* 6. Lightweight Hover Tooltip Pill */}
                {isHovered && !isSelected && (
                  <g transform="translate(0, -28)" style={{ pointerEvents: "none" }}>
                    <rect
                      x={-80}
                      y={-12}
                      width={160}
                      height={22}
                      rx={6}
                      fill="#0A0A0A"
                      stroke="#FF7A00"
                      strokeWidth={1}
                      opacity={0.96}
                    />
                    <text
                      x={0}
                      y={3}
                      textAnchor="middle"
                      fill="#FFF"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {hub.flag} {hub.name} · {count} #IEEEXtreme Events
                    </text>
                  </g>
                )}
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Floating Region Details Card (latched open on pin click) */}
        {inspectHub && inspectEvents.length > 0 && (
          <div
            className={`absolute top-4 ${
              inspectHub.id === "LK" || inspectHub.id === "IN"
                ? "right-4"
                : "left-4"
            } z-20 w-[92%] sm:w-[380px] max-h-[85%] rounded-2xl border border-signal/40 bg-void/95 p-4 backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-200 animate-in fade-in zoom-in-95`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between pb-3 border-b border-line/70 gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{inspectHub.flag}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-signal font-semibold">
                    {inspectHub.sectionName}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-text mt-0.5">
                  {inspectHub.name}
                </h3>
                <p className="font-mono text-[11px] text-muted mt-0.5">
                  {inspectEvents.length} #IEEEXtreme event{inspectEvents.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    onSelectRegion?.(inspectHub.id);
                    setActiveCardHubId(inspectHub.id);
                  }}
                  className={`rounded-lg px-2 py-1 font-mono text-[10px] font-semibold transition-colors ${
                    selectedRegion === inspectHub.id
                      ? "bg-signal text-void font-bold"
                      : "border border-line bg-panel text-muted hover:text-text hover:border-signal/40"
                  }`}
                  title="Filter all cards below to this section"
                >
                  {selectedRegion === inspectHub.id ? "Filtered ✓" : "Filter"}
                </button>
                <button
                  onClick={() => {
                    setActiveCardHubId(null);
                    setHoveredHubId(null);
                  }}
                  className="rounded-lg border border-line bg-panel p-1 text-muted hover:text-text hover:bg-void/60 transition-colors"
                  title="Close card"
                >
                  <span className="block w-4 h-4 text-center leading-4 text-xs">✕</span>
                </button>
              </div>
            </div>

            {/* Scrollable Event List */}
            <div className="mt-3 flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
              {inspectEvents.slice(0, 5).map((ev) => {
                const formattedDate = ev.startTime
                  ? new Date(ev.startTime).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Date TBD";

                return (
                  <div
                    key={ev.id}
                    className="group rounded-xl border border-line/70 bg-panel/70 p-3 hover:border-signal/50 hover:bg-panel transition-all"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1">
                      <span className="rounded bg-signal/10 px-1.5 py-0.5 text-signal font-semibold">
                        📅 {formattedDate}
                      </span>
                      <span>{ev.isVirtual ? "🌐 Virtual" : ev.location || "On-site"}</span>
                    </div>

                    <h4 className="font-display text-xs font-semibold text-text group-hover:text-signal transition-colors line-clamp-2">
                      <Link href={`/events/${ev.id}`} className="hover:text-signal transition-colors">
                        {ev.title}
                      </Link>
                    </h4>

                    {(ev.studentBranch || ev.section) && (
                      <p className="font-mono text-[10px] text-muted/90 mt-1 line-clamp-1">
                        🏛️ {ev.studentBranch || ev.section}
                      </p>
                    )}

                    {ev.hashtags && ev.hashtags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {ev.hashtags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-line/60 px-1.5 py-0.2 font-mono text-[9px] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-line/40 flex justify-end">
                      <Link
                        href={`/events/${ev.id}`}
                        className="inline-flex items-center gap-1 rounded-md bg-signal px-2.5 py-1 font-mono text-[10px] font-bold text-void hover:bg-signalDim transition-colors shadow-sm"
                      >
                        <span>View Details</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                );
              })}

              {inspectEvents.length > 5 && (
                <div className="pt-1 text-center">
                  <button
                    onClick={() => {
                      onSelectRegion?.(inspectHub.id);
                      setActiveCardHubId(inspectHub.id);
                    }}
                    className="font-mono text-[11px] text-signal underline hover:text-signalDim"
                  >
                    +{inspectEvents.length - 5} more events · View all below &darr;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Region Events Grid Below Map */}
      <div className="mt-8 border-t border-line/60 pt-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-signal font-semibold">📍</span>
            <h3 className="font-display text-lg font-bold text-text">
              {selectedRegion && hubsById[selectedRegion]
                ? `#IEEEXtreme Events in ${hubsById[selectedRegion].flag} ${hubsById[selectedRegion].name} (${displayedEvents.length})`
                : `#IEEEXtreme Events in IEEE Region 10 (${displayedEvents.length})`}
            </h3>
          </div>
          {selectedRegion && (
            <button
              onClick={() => {
                onSelectRegion?.(null);
                setActiveCardHubId(null);
              }}
              className="font-mono text-xs text-signal underline hover:text-signalDim self-start sm:self-auto"
            >
              Show all Region 10 #IEEEXtreme events
            </button>
          )}
        </div>

        {displayedEvents.length === 0 ? (
          <div className="rounded-2xl border border-line bg-panel p-10 text-center font-mono text-xs text-muted">
            No #IEEEXtreme events found matching this selection.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF7A00; }
      `,
        }}
      />
    </div>
  );
}
