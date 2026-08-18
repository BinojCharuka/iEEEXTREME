const STEPS = [
  { title: "Register your team", body: "Sign up through the IEEE Xtreme portal before the deadline listed on each event card." },
  { title: "Set up your environment", body: "Confirm your judge/tooling access ahead of time so the clock doesn't eat setup time." },
  { title: "Compete", body: "Work the 24-hour window as a team — sync early, split problems by strength." },
  { title: "Submit & review", body: "Submit before the hard cutoff, then check the results announcement on this page." }
];

export default function Guide() {
  return (
    <section id="guide" className="border-b border-line/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
          Guide
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text md:text-4xl">
          Getting started
        </h2>

        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="font-mono text-2xl font-bold text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-lg font-bold text-text">
                {step.title}
              </p>
              <p className="text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
