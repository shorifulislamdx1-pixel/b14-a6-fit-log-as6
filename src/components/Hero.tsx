"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToLibrary = () => {
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full border-b border-zinc-800/60 bg-[#0e1015] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copy & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            <span className="text-zinc-200">LOG EVERY SET.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            onClick={scrollToLibrary}
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#b8e600] active:scale-95 transition-all cursor-pointer"
          >
            <span>BROWSE WORKOUTS</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: Hero Graphic/Image */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-zinc-800 bg-[#16181f] flex items-center justify-center p-4">
            <Image
              src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691401.jpg?w=740"
              alt="Hero Lift Character"
              width={400}
              height={400}
              priority
              className="object-contain w-full h-full drop-shadow-[0_10px_20px_rgba(204,255,0,0.15)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}