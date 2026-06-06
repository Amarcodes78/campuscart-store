export function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-6xl px-4 pb-10">
        <div className="glass rounded-3xl p-8 text-center">
          <p className="font-display text-xl">
            Built with caffeine ☕, deadlines 😅 and questionable life choices.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} CampusCart. Not actually selling anything yet — your wallet is safe… for now.
          </p>
        </div>
      </div>
    </footer>
  );
}
