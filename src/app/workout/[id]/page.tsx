"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, PlusCircle, Star, Flame } from "lucide-react";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";

const fallbackWorkouts: Workout[] = [
  {
    id: 1,
    name: "Barbell Bench Press",
    image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740",
    muscleGroups: ["Chest", "Arms"],
    equipment: "Barbell, Bench",
    difficulty: "Intermediate",
    duration: 25,
    caloriesBurned: 180,
    sets: 4,
    reps: "6-8",
    rating: 4.8,
    description: "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    instructions: [
      "Lie on the bench with eyes under the bar and feet planted.",
      "Unrack with locked elbows and lower the bar to mid-chest.",
      "Press up in a slight arc until elbows lock without bouncing.",
      "Keep shoulder blades pinched and a natural arch in the back."
    ]
  },
  {
    id: 2,
    name: "Pull-Up",
    image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740",
    muscleGroups: ["Back", "Arms"],
    equipment: "Pull-up Bar",
    difficulty: "Intermediate",
    duration: 15,
    caloriesBurned: 120,
    sets: 4,
    reps: "6-10",
    rating: 4.7,
    description: "Bodyweight vertical pull that hammers lats, biceps, and grip while improving relative strength.",
    instructions: [
      "Hang from the bar with a shoulder-width overhand grip.",
      "Brace your core and pull your chest toward the bar.",
      "Pause at the top with elbows tucked, then lower with control.",
      "Avoid kipping unless you are training a specific variation."
    ]
  },
  {
    id: 3,
    name: "Back Squat",
    image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691401.jpg?w=740",
    muscleGroups: ["Legs", "Core"],
    equipment: "Barbell, Rack",
    difficulty: "Advanced",
    duration: 30,
    caloriesBurned: 240,
    sets: 5,
    reps: "5-8",
    rating: 4.9,
    description: "The king of lower-body lifts: quads, glutes, and spinal stability under a loaded bar.",
    instructions: [
      "Set the bar on your upper traps and unrack with a tight brace.",
      "Sit the hips down and back while keeping knees tracking over toes.",
      "Descend until thighs are at least parallel, chest tall.",
      "Drive through mid-foot to stand, locking hips at the top."
    ]
  },
  {
    id: 4,
    name: "Overhead Press",
    image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666703.jpg?w=740",
    muscleGroups: ["Shoulders", "Arms"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    duration: 20,
    caloriesBurned: 150,
    sets: 4,
    reps: "6-8",
    rating: 4.6,
    description: "Strict standing press that builds delts, triceps, and overhead stability without leg drive.",
    instructions: [
      "Hold the bar at the front rack with a vertical forearm.",
      "Brace abs and glutes, then press the bar over the crown of the head.",
      "Lock out with biceps by the ears and a stacked ribcage.",
      "Lower to the clavicle under control before the next rep."
    ]
  },
  {
    id: 5,
    name: "Dumbbell Bicep Curl",
    image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666702.jpg?w=740",
    muscleGroups: ["Arms"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    duration: 12,
    caloriesBurned: 80,
    sets: 3,
    reps: "10-12",
    rating: 4.3,
    description: "An isolation curl to thicken the biceps with a full stretch and a hard peak contraction.",
    instructions: [
      "Stand tall with dumbbells at your sides, palms forward.",
      "Curl the weights without swinging the torso.",
      "Squeeze at the top, then lower until arms are fully extended.",
      "Keep elbows pinned near the ribs throughout."
    ]
  },
  {
    id: 6,
    name: "Hollow-Body Plank",
    image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691489.jpg?w=740",
    muscleGroups: ["Core"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    duration: 10,
    caloriesBurned: 60,
    sets: 3,
    reps: "30-45s",
    rating: 4.4,
    description: "A braced plank variation that trains anti-extension through the entire anterior core.",
    instructions: [
      "Set elbows under shoulders and squeeze glutes and quads.",
      "Tuck the pelvis so the lower back stays flat.",
      "Breathe into the brace without sagging the hips.",
      "Hold for the prescribed time, then rest and repeat."
    ]
  },
  {
    id: 7,
    name: "Burpee",
    image: "https://img.magnific.com/free-photo/3d-cartoon-business-character_1048-16544.jpg?w=740",
    muscleGroups: ["Full Body"],
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    duration: 12,
    caloriesBurned: 160,
    sets: 4,
    reps: "8-12",
    rating: 4.2,
    description: "A high-output full-body drill that mixes a squat, plank, and jump for conditioning.",
    instructions: [
      "Squat down and plant your hands on the floor.",
      "Kick the feet back to a solid plank, then jump them forward.",
      "Explode up into a jump and land softly.",
      "Keep a steady rhythm and a braced midline."
    ]
  },
  {
    id: 8,
    name: "Conventional Deadlift",
    image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666704.jpg?w=740",
    muscleGroups: ["Back", "Legs"],
    equipment: "Barbell",
    difficulty: "Advanced",
    duration: 28,
    caloriesBurned: 260,
    sets: 4,
    reps: "3-5",
    rating: 4.9,
    description: "Hip-hinge powerhouse for the posterior chain, grip, and total-body tension.",
    instructions: [
      "Stand with the bar over mid-foot and take a strong mixed or double-overhand grip.",
      "Set the back flat, brace hard, and push the floor away.",
      "Stand tall by driving hips to the bar, then reverse the path.",
      "Do not bounce the plates; reset tension every rep."
    ]
  },
  {
    id: 9,
    name: "Push-Up",
    image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691429.jpg?w=740",
    muscleGroups: ["Chest", "Arms", "Core"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    duration: 10,
    caloriesBurned: 90,
    sets: 3,
    reps: "12-15",
    rating: 4.5,
    description: "A scalable pressing staple that trains chest, triceps, and a rigid trunk.",
    instructions: [
      "Place hands slightly wider than shoulders, body in a straight line.",
      "Lower until the chest nearly kisses the floor.",
      "Press up without letting hips pike or sag.",
      "Keep elbows about 45 degrees from the torso."
    ]
  },
  {
    id: 10,
    name: "Walking Lunge",
    image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666701.jpg?w=740",
    muscleGroups: ["Legs"],
    equipment: "Dumbbells (optional)",
    difficulty: "Beginner",
    duration: 18,
    caloriesBurned: 170,
    sets: 3,
    reps: "10-12/leg",
    rating: 4.4,
    description: "Unilateral stepping pattern that builds quads, glutes, and balance under load.",
    instructions: [
      "Step forward and drop the back knee toward the floor.",
      "Keep the front knee stacked over the mid-foot.",
      "Drive through the front heel to the next step.",
      "Stay tall through the torso and control each landing."
    ]
  },
  {
    id: 11,
    name: "Russian Twist",
    image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691487.jpg?w=740",
    muscleGroups: ["Core"],
    equipment: "Medicine Ball",
    difficulty: "Beginner",
    duration: 8,
    caloriesBurned: 70,
    sets: 3,
    reps: "16-20",
    rating: 4.1,
    description: "Rotational core work that trains the obliques while you stay balanced on the sit bones.",
    instructions: [
      "Sit with a slight lean back and feet lightly off the floor.",
      "Hold the ball at chest height and rotate to one side.",
      "Tap the floor, then rotate to the other side.",
      "Move from the ribcage, not just the arms."
    ]
  },
  {
    id: 12,
    name: "Kettlebell Swing",
    image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691505.jpg?w=740",
    muscleGroups: ["Full Body", "Shoulders"],
    equipment: "Kettlebell",
    difficulty: "Intermediate",
    duration: 16,
    caloriesBurned: 200,
    sets: 5,
    reps: "12-15",
    rating: 4.7,
    description: "Explosive hip hinge that builds posterior power, grip, and conditioning in one move.",
    instructions: [
      "Hinge, hike the bell back between the legs, then snap the hips.",
      "Let the bell float to chest height with loose arms.",
      "Brace at the top, then hinge as the bell falls.",
      "Never squat the swing — it is a hinge, not a squat."
    ]
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const workoutId = Number(resolvedParams.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToPlan, saveForLater } = useWorkout();

  useEffect(() => {
    async function loadDetail() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("API detail fetch failed");
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.warn("API error, checking fallback data:", err);
        const fallback = fallbackWorkouts.find((item) => item.id === workoutId);
        setWorkout(fallback || null);
      } finally {
        setIsLoading(false);
      }
    }

    loadDetail();
  }, [workoutId]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-[#ccff00] text-sm font-bold tracking-widest uppercase animate-pulse">
          Loading Details...
        </p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-black uppercase text-white">Lift Not Found</h2>
        <p className="text-zinc-400 text-sm max-w-sm">
          The lift you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-zinc-800 bg-[#14161b] relative aspect-4/3 lg:aspect-square">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                {workout.name}
              </h1>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {workout.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded bg-[#ccff00] text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="border border-zinc-800/80 rounded-xl bg-[#14161b] overflow-hidden divide-y divide-zinc-800/60 text-xs">
              <div className="flex justify-between px-4 py-3">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider">Equipment</span>
                <span className="font-bold text-zinc-200">{workout.equipment}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider">Difficulty</span>
                <span className="font-bold text-zinc-200">{workout.difficulty}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider">Sets</span>
                <span className="font-bold text-zinc-200">{workout.sets}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider">Reps</span>
                <span className="font-bold text-zinc-200">{workout.reps}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider">Calories</span>
                <span className="font-bold text-amber-500 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  {workout.caloriesBurned} kcal
                </span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider">Rating</span>
                <span className="font-bold text-[#ccff00] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#ccff00]" />
                  {workout.rating} / 5
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                Instructions
              </h2>
              <ol className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span className="font-bold text-[#ccff00]">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => addToPlan(workout)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] active:scale-98 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add to today&apos;s plan</span>
              </button>

              <button
                onClick={() => saveForLater(workout)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 bg-transparent text-white font-extrabold text-xs uppercase tracking-wider hover:border-zinc-500 hover:bg-zinc-800/40 active:scale-98 transition-all cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save for later</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}