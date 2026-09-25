import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-[#090a0c] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-sm text-zinc-300">
          <Dumbbell className="w-4 h-4 text-[#ccff00]" />
          <span>FITLOG</span>
        </Link>

        <p className="text-xs text-zinc-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}