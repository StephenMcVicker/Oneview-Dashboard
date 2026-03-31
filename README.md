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


### Adding Testing (10 mins)
Testing is an area I don't have much experience in - we didn't do too much of it in my last company. I have experience with Cypress end to end testing but not with writing tests for functions. I relied on AI to help me build this. I can see the value it would add to some hooks but I'm not too sure of the value added for the small hook like the debounce. This is an area I can grow in and am aware this role will require good testing so this could be a focus for me to improve my skills.

### Conclusion
This project was to help showcase my abilities and also refresh my memory on various aspects of a project before the interview. I was open and honest with my timing and use of AI. I tracked everything on a notepad and tried to document my thought process and how I approached this. Styling and UX could be greatly improved and more details could have been added but I started this the evening before the interview and wanted to focus on project structure, reusable hooks, and laying UI and data.