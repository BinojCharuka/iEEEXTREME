import { NextResponse } from "next/server";
import { fetchIEEEEvents } from "@/lib/vtools";

export const revalidate = 900; // 15 minutes

export async function GET() {
  try {
    const events = await fetchIEEEEvents();
    return NextResponse.json({ events });
  } catch (err) {
    console.error("Failed to fetch vTools events", err);
    return NextResponse.json(
      { events: [], error: "Could not load events right now." },
      { status: 502 }
    );
  }
}
