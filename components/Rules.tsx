const RULES = [
  "Teams of up to three, all members currently IEEE Student members in good standing.",
  "24-hour continuous programming window — no submissions accepted after the clock stops.",
  "Any language or framework is fair game unless a specific challenge says otherwise.",
  "Plagiarism or sharing solutions across teams results in disqualification."
];

export default function Rules() {
  return (
    <section id="rules" className="border-b border-line/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
          Rules
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text md:text-4xl">
          Compete fair, compete sharp
        </h2>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {RULES.map((rule, i) => (
            <li
              key={i}
              className="rounded-2xl border border-line bg-panel p-6 text-muted"
            >
              <span className="mb-2 block font-mono text-xs text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
