export default function Footer() {
  return (
    <footer className="border-t border-line/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono text-xs text-muted md:flex-row">
        <span>© {new Date().getFullYear()} R10-Xtreme · 20th Edition</span>
        <span>Events sourced from vTools Events API</span>
      </div>
    </footer>
  );
}
