export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-void">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-signal" />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Loading R10-Xtreme
      </p>
    </div>
  );
}