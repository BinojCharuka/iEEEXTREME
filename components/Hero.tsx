export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-line/70 bg-grid pt-40 pb-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signalDim/20 via-transparent to-void" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
          IEEE Region 10 · IEEEXtreme
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-text md:text-7xl">
          Where R10 builds, competes,
          <br />
          and <span className="text-signal">ships</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          R10-Xtreme is the home base for IEEEXtreme in Region 10 — every
          workshop, hackathon, and technical session tagged{" "}
          <code className="rounded bg-panel px-1.5 py-0.5 font-mono text-signal">#IEEE</code>{" "}
          across the Section, in one feed.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#events"
            className="rounded-full bg-signal px-6 py-3 font-mono text-sm font-medium text-void transition-transform hover:scale-105"
          >
            View live events
          </a>
          <a
            href="#about"
            className="rounded-full border border-line px-6 py-3 font-mono text-sm text-text transition-colors hover:border-signal hover:text-signal"
          >
            What is R10-Xtreme?
          </a>
        </div>
      </div>
    </section>
  );
}
