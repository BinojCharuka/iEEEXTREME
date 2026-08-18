export default function Contact() {
  return (
    <section id="ContactPage" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
          Contact
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text md:text-4xl">
          Get in touch
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Questions about registration, events, or partnering with R10-Xtreme?
          Reach the committee directly.
        </p>
        <a
          href="mailto:xtreme@ieee.lk"
          className="mt-8 inline-block rounded-full bg-signal px-6 py-3 font-mono text-sm font-medium text-void transition-transform hover:scale-105"
        >
          r10-xtreme@ieee.org
        </a>
      </div>
    </section>
  );
}
