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


