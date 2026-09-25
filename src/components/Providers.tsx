"use client";

import React from "react";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WorkoutProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18191e",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />
      {children}
    </WorkoutProvider>
  );
}