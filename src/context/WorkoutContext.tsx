"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
    } catch {
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
    }
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already added to today's plan!");
      return;
    }
    if (todayPlan.length >= 5) {
      toast.error("Daily cap reached (Max 5 lifts)!");
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: Workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.error("Already in saved workouts!");
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from plan");
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from saved");
  };

  const markAsDone = (id: number) => {
    setTodayPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item))
    );
    toast.success("Workout status updated!");
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};