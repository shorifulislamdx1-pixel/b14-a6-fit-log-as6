# FitLog — Workout Library

FitLog is a modern and responsive workout library built with **Next.js**. Users can explore workouts, view details, add exercises to today's plan, save workouts for later, and track their daily workout progress.

## Features

 Browse workout library with responsive workout cards
 Sort workouts by Duration, Calories, and Rating
 View detailed workout information and instructions
 Add workouts to Today's Plan with a maximum of 5 lifts
 Save workouts for later
 Mark planned workouts as Done
 Remove workouts from Today's Plan or Saved list
 Toast notifications for user actions
 Live exercise, minutes, and calories statistics
 Persist plan and saved workouts using LocalStorage
 Fully responsive for mobile, tablet, and desktop
 Custom 404 page and loading states

## Technologies

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Next.js App Router**
- **React Toastify**
- **LocalStorage**

## Main Routes

```text
/                  → Workout Library
/my-plan           → Today's Plan & Saved Workouts
/workouts/[id]     → Workout Details
/invalid-route     → Custom 404 Page
```

## Getting Started

```bash
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

## Deployment

The project is deployment-ready for **Vercel, Netlify, or Cloudflare Pages**.

## Author

**Shoriful Islam**

Built with  using Next.js, TypeScript & Tailwind CSS.