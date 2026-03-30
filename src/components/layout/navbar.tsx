import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto h-full px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-accent-green font-mono font-bold text-xl">//</span>
          <span className="text-zinc-50 font-mono font-bold text-xl uppercase tracking-tighter">devroast</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link 
            href="/leaderboard" 
            className="text-[13px] font-mono text-zinc-500 hover:text-zinc-50 transition-colors uppercase tracking-wider font-medium"
          >
            leaderboard
          </Link>
          <Badge variant="secondary" className="bg-zinc-900 text-zinc-500 border-none px-3">
            roasting 2.4k codes
          </Badge>
        </nav>
      </div>
    </header>
  );
}
