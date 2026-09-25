import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-[#ccff00]">
        <Dumbbell className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-white tracking-tight">404</h1>
      <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-300 mt-2 mb-3">
        Lift Not Found
      </h2>
      <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mb-6">
        The page or workout you are looking for has been racked away or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
      >
        Back to Library
      </Link>
    </div>
  );
}