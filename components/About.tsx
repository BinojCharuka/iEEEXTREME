export default function About() {
  return (
    <section id="about" className="border-b border-line/70 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
            About
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text md:text-4xl">
            Built by R10, for R10
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-muted">
          R10-Xtreme is the coordination point for IEEEXtreme within Region
          10 - surfacing every technical workshop, competition prep session,
          and community event happening across the Section and its Student
          Branches, so no one has to dig through separate vTools pages to
          find them.
        </p>
      </div>
    </section>
  );
}
