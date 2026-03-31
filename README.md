# Oneview Healthcare Interview Prep - Mock Dashboard

**By Stephen McVicker**

## Overview
To prepare for the interview with Oneview Healthcare, I created this react project to render out a patient dashboard.

### Prerequisites

If you don't have Bun installed, install it first:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Running the Application

1. Navigate to the project directory:

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

The application will be available at `http://localhost:5173/`

## My Development Process

### Getting Started (1 hour 15 minutes)

I set up the react project using vite and installed Tailwind (styling) and Zustand (state management) and then started working on folder structure and files. This was to get a sense of the project. Github init and my first initial commit. I used a hand written notepad to track my progress and aid in writing this README.

I set up pre-commit hooks using **Husky**. I want to ensure every commit is linted and type-checked automatically. It's just good practice and saves headaches later.

In the email from Aoife, the first point listed on tips for the interview was `writing type-safe React hooks from scratch` - so I had a plan to start of creating a `useAsync` hook that I would use to get patients from a mock api. I created my `patient.ts` typing, created this file, and using it in a basic component.
Once working, I used Cursor's AI Agent to help me break up the components into smaller files which created the `PatientDirectory` and the smaller components based on my original one.
The goal was to keep state global and avoid prop drilling.

(Started this readme with that commit)

### Fixing Race Condition in useAsync (25 mins)
The key here was to useRef, which lets us keep a mutable value between re-rendering to track the request id and only update the state if the refId and the refrequestid match. `requestIdRef` increases each time `execute` is called. Using `useState` here would cause extra re-renders and state update is batched and a bit delayed which could just cause bugs (like async issues) in general for me. Refs are ideal for tracking values outside of UI state renders like request tracking and timeouts.


### Adding Debounce (20 mins)
Patient search was firing the mock API on every keystroke, which is would be expensive against a real backend. I added a small `useDebounce` hook so the directory keeps the input responsive while `searchPatients` runs only after the user pauses typing (300ms). That matches how production search boxes usually behave and reuses the same debounce logic anywhere else in the app needs it.
