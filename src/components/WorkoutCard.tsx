"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-[#14161b] border border-zinc-800/80 rounded-xl overflow-hidden hover:border-[#ccff00]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="relative w-full h-52 bg-zinc-900 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161b] via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors leading-snug">
          {workout.name}
        </h3>

        <p className="text-xs text-zinc-400 font-medium">
          {workout.equipment}
        </p>

        <div className="mt-auto pt-3 border-t border-zinc-800/70 flex items-center justify-between text-xs text-zinc-400 font-semibold">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}