import { team } from "@/data/team";

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export default function TeamSection() {
  return (
    <section id="committee" className="border-b border-line/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
            Committee
          </p>
          <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
            Team
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-panel px-6 py-10 text-center transition-colors hover:border-signal/60"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-signal/60 bg-signalDim/40">
                {member.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-display text-xl font-bold text-signal">
                    {initials(member.name)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-display text-lg font-bold text-text">
                  {member.name}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
