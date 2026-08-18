"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import EventsSection from "@/components/EventsSection";
import TeamSection from "@/components/TeamSection";
import Rules from "@/components/Rules";
import Guide from "@/components/Guide";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading or page hydration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust duration as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-void">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-signal" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Loading R10-Xtreme
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <EventsSection />
        <TeamSection />
        <Rules />
        <Guide />
        <Contact />
      </main>
      <Footer />
    </>
  );
}