# ClassPath — CLAUDE.md

UX/HCI class project by Dhairya and Anika. Indoor wayfinding prototype for UMass Boston.
Graded on experience quality. Three rooms fully navigable; the rest of campus is browseable.

## Stack

- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS v4 — design tokens live in `app/globals.css`
- Motion (motion.dev) — every animation guards `useReducedMotion()`
- 21st.dev components — drop in and customize to design system
- shadcn/ui — initialized with `--defaults` preset; components in `components/ui/`
- lucide-react — icons only
- localStorage — the only persistence layer

## Hard Rules

1. No backend. No API routes, no database, no auth, no GPS, no Bluetooth, no AR.
2. Demo scope is locked: 3 navigable rooms on UH Level 4 only. Other buildings browseable but show "demo only" state.
3. No fabricated UMB facts. Uncertain values are marked `// TODO_PLACEHOLDER`.
4. `prefers-reduced-motion` is non-negotiable — every animation has a fallback.
5. Accessibility is a deliverable: keyboard nav, ARIA, AA contrast, semantic HTML.
6. UX over features — no screens or flows beyond the IA below.
7. No state library (Redux, Zustand, etc.). React state + localStorage only.

## Information Architecture

```
/                          Landing — logo, tagline, CTA
/home                      Three task cards + first-visit onboarding sheet
/search                    Typeahead destination picker
/browse                    Building grid
/browse/[building]         Floor list
/browse/[building]/[floor] Room list with type filters
/room/[id]                 Room detail + route preference + Save / Start
/navigate/[id]             Map + step list (showpiece screen)
/saved                     Saved destinations
```

Persistent bottom nav on all app pages (hidden on `/`): Home · Search · Browse · My Routes.

## Design Decisions (confirmed)

- **D1 — Floor map:** Warm Schematic. Background `#F9F7F4`, warm-gray walls 2px, neutral fills, amber waypoint dot.
- **D2 — Bottom nav active:** Filled lozenge (`--color-accent` bg behind icon+label, `radius-sm`).
- **D3 — Landing logo:** Mark + Wordmark (geometric SVG mark + "ClassPath" in Instrument Serif).

## Design Tokens (defined in `app/globals.css`)

```
Primary (UMB blue):   oklch(0.478 0.138 253)  ≈ #2563A8
Amber (wayfinding):   oklch(0.749 0.167 76)   ≈ #F59E0B  — reserved for active route/you-are-here
Background:           oklch(0.975 0.005 80)   ≈ #F9F7F4
Foreground:           oklch(0.170 0.010 57)   ≈ #1C1917
Muted-foreground:     oklch(0.467 0.010 57)   ≈ #6B6560
Border:               oklch(0.884 0.008 67)   ≈ #E2DDD8

Radii: --radius-sm 8px / --radius-md 12px / --radius-lg 16px / --radius-xl 24px
Easing: --ease-out cubic-bezier(0.22, 1, 0.36, 1)
Durations: --duration-fast 180ms / --duration-base 280ms / --duration-slow 480ms
```

## localStorage Keys

| Key | Type | Purpose |
|---|---|---|
| `classpath:onboarded` | boolean | One-time onboarding sheet gate |
| `classpath:recent-searches` | string[] (max 5) | Recent search room IDs |
| `classpath:saved-routes` | string[] | Saved destination room IDs |

## Data Files

- `lib/types.ts` — all TypeScript types
- `lib/data.ts` — buildings (7), rooms (3 navigable + placeholders), routes (3), helpers
- `lib/floor-svgs.ts` — UH Level 1 + Level 4 floor geometry (600×400 SVG coordinate space)
- `lib/hooks.ts` — `useLocalStorage`, `useSavedRoutes`, `useRecentSearches`, `useOnboarded`
- `lib/utils.ts` — shadcn `cn()` helper (do not modify)

## Navigable Rooms

| ID | Number | Name | Type | Walking time |
|---|---|---|---|---|
| uh-4170 | 4170 | Classroom 4170 | classroom | ~4 min |
| uh-4422 | 4422 | Digital Media Lab 4422 | lab | ~5 min |
| uh-4400 | 4400 | Sculpture Studio 4400 | studio | ~5 min |

All routes start at **Main Entrance — University Hall (Level 1)**, take the elevator to Level 4,
and end at the room. The elevator is anchored at SVG coordinate (100, 200) on both floors.

## Key Components

```
components/
  BottomNav.tsx            Persistent utility bar (Home/Search/Browse/My Routes)
  OnboardingSheet.tsx      First-visit sheet, gated on classpath:onboarded
  TaskCard.tsx             Home screen task cards
  BuildingCard.tsx         Building grid card
  RoomCard.tsx             Room list row
  RoutePreferenceControl   Segmented control (standard / accessible)
  FloorMap.tsx             SVG renderer for FloorSVGData
  WaypointPath.tsx         Animated path draw (pathLength 0→1)
  StepList.tsx             Step list with collapse/expand
  PrevNextBar.tsx          Thumb-reachable navigation controls
  AlreadyInsideSheet.tsx   Sheet to pick current step
  ArrivalScreen.tsx        Scale-in check + save prompt
  DemoOnlyNotice.tsx       Non-navigable room explanation
  BreadcrumbBar.tsx        Sticky breadcrumb for browse tree
  FilterChip.tsx           Room type filter toggle
```

## Amber Usage Rule

`--cp-amber` / `--color-cp-amber` is ONLY for:
- Current step waypoint pulse on the map
- "You are here" indicator
- Active route progress (path drawn so far)

Do NOT use amber for UI chrome, CTAs, or decorative purposes.

## What NOT to Do

- No floating/glassmorphic bottom nav
- No hamburger menu
- No decorative motion
- No GIS/satellite maps — schematic SVG only
- No Redux, Zustand, or other state libraries
- No settings page
- No toast notifications
- No loading skeletons (all data is synchronous in-memory)
- No test files
- No confetti on arrival
