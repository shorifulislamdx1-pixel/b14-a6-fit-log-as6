"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = useWorkout();

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#0b0c0e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-black tracking-wider text-xl text-white">
          <Dumbbell className="w-6 h-6 text-[#ccff00]" />
          <span>FITLOG</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors duration-200 ${
              isWorkoutActive ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold transition-colors duration-200 ${
              isPlanActive ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badge Counters */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-700 bg-transparent text-white font-bold text-xs uppercase tracking-wider hover:border-zinc-500 transition-colors"
          >
            <span className="text-zinc-300">Saved</span>
            <span className="bg-zinc-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}