"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown, Dumbbell } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";

type TabType = "today" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { todayPlan, savedWorkouts, removeFromPlan, removeFromSaved, markAsDone } = useWorkout();
  const [activeTab, setActiveTab] = useState<TabType>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  const sortedList = useMemo(() => {
    const list = [...currentList];
    if (sortBy === "duration") return list.sort((a, b) => b.duration - a.duration);
    if (sortBy === "calories") return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    if (sortBy === "rating") return list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [currentList, sortBy]);

  return (
    <div className="w-full min-h-screen py-10 md:py-16 bg-[#0b0c0e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            MY PLAN
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-[#14161b] border border-zinc-800/80 rounded-2xl p-6">
          <div>
            <p className="text-xs font-semibold text-zinc-400">Exercises</p>
            <p className="text-4xl font-black text-[#ccff00] mt-1">{totalExercises}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-400">Minutes</p>
            <p className="text-4xl font-black text-white mt-1">{totalMinutes}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-400">Calories</p>
            <p className="text-4xl font-black text-white mt-1">{totalCalories}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/60">
          <div className="inline-flex rounded-xl bg-[#14161b] p-1 border border-zinc-800">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "today"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-semibold text-zinc-400">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort workouts"
                className="appearance-none bg-[#14161b] border border-zinc-800 text-xs font-bold text-white py-1.5 pl-3 pr-8 rounded-lg cursor-pointer hover:border-zinc-700 focus:outline-none focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="pt-6">
          {sortedList.length === 0 ? (
            <div className="border border-zinc-800/80 rounded-2xl bg-[#14161b]/50 p-12 sm:p-20 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 text-zinc-400">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">
                NOTHING HERE YET
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mb-6">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-full bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedList.map((workout: Workout) => (
                <div
                  key={workout.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                    workout.isDone
                      ? "bg-[#14161b]/40 border-zinc-800/50 opacity-60"
                      : "bg-[#14161b] border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4
                        className={`text-sm font-black uppercase tracking-tight text-white ${
                          workout.isDone ? "line-through text-zinc-500" : ""
                        }`}
                      >
                        {workout.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-medium mb-1">
                        {workout.equipment}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500" />
                          {workout.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#ccff00] fill-[#ccff00]" />
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="px-3.5 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-xs font-bold text-zinc-300 hover:text-white transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => markAsDone(workout.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          workout.isDone
                            ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                            : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{workout.isDone ? "Done" : "Mark as Done"}</span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "today"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      aria-label="Remove workout"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}