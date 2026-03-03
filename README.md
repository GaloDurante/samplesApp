# Sistema de Muestras (`samples-app`)

Desktop app built with **Electron + React + TypeScript + Vite** to manage seed laboratory workflows.

## What this project does

This application helps register and manage:

- Clients
- Seed samples
- Analysis data (analysis, purity, germination, humidity)
- Sample certificates (PDF generation)
- Sample book exports (Excel `.xlsx`)

The app uses a local **SQLite** database (via Drizzle ORM) and runs migrations automatically at startup.

## Main features

- Client CRUD
- Sample CRUD
- Filters and pagination for samples and clients
- Certificate data editing per sample
- PDF certificate generation to your **Downloads** folder
- Excel export of current page or all filtered samples to your **Downloads** folder

## Tech stack

- Electron
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Drizzle ORM + better-sqlite3
- React Router
- React Hook Form + Zod

## Prerequisites

Install on your machine:

- Node.js (LTS recommended)
- npm

## Command you must run before using the project

After cloning/downloading the repo, run:

```bash
npm install
```

This installs dependencies and runs `electron-rebuild` (postinstall), which is required for native Electron modules.

## How to run locally

1. Install dependencies:

```bash
npm install
```

2. Start the app in development mode:

```bash
npm run dev
```

This launches:

- Vite dev server (React UI)
- Electron app
- Electron TypeScript transpilation (`transpile:electron`)

## Build and packaging commands

- Build web app:

```bash
npm run build
```

- Transpile Electron code only:

```bash
npm run transpile:electron
```

- Create installers/binaries:

```bash
npm run dist:win:64
npm run dist:win:32
npm run dist:mac
npm run dist:linux
```

## Other useful scripts

- Lint:

```bash
npm run lint
```

- Preview production web build:

```bash
npm run preview
```

- Update/migrate DB:

```bash
npx drizzle-kit generate
```

## Database and generated files

- SQLite database path (Electron user data):
  - `app.getPath("userData")/app.db`
- Certificates (`.pdf`) are generated in your **Downloads** folder.
- Excel exports (`.xlsx`) are generated in your **Downloads** folder.

## Project structure (high level)

- `src/ui`: React UI, routes, pages, and components
- `src/electron`: Electron main process, IPC handlers, services, DB layer
- `src/electron/db/migrations`: database migrations
- `scripts`: utility scripts (for example migration copy during transpile)

## Notes

- App language/content is currently focused on Spanish seed-lab workflows.
- Migrations are executed automatically when Electron starts.
