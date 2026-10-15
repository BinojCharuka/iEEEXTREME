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