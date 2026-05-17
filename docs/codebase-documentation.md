# Codebase Documentation

## Overview

This repository contains the public website for `ASC 2026`, including branded content sections and two Airtable-backed form workflows:

- school registration
- sponsorship enquiry

The app uses the Next.js App Router. The public UI is mostly static content with a few interactive client components for form handling, modal state, and school lookup.

## High-Level Architecture

### Frontend

- `src/app/page.tsx` composes the landing page.
- `src/components/layout/*` handles page shell and navigation.
- `src/components/sections/*` contains each homepage section.
- `src/components/ui/*` provides small reusable UI primitives.

### Backend

- `src/app/api/registration/route.ts`
- `src/app/api/sponsorship/route.ts`
- `src/app/api/schools/route.ts`

These routes validate incoming requests and talk to Airtable through a shared helper.

### Shared Domain Logic

- `src/lib/forms.ts` stores option lists, default form state, and TypeScript form shapes.
- `src/lib/airtable.ts` centralizes Airtable configuration and record operations.

## App Composition

The home page is assembled in this order:

1. `HeroSection`
2. `AboutSection`
3. `ImpactSection`
4. `ProgrammeSection`
5. `DatesSection`
6. `WhyPartnerSection`
7. `SponsorshipSection`
8. `FounderSection`
9. `RegistrationSection`
10. `FaqSection`
11. `FooterSection`

This structure is defined in [src/app/page.tsx](/src/app/page.tsx).

## Providers And Runtime Shell

### Root layout

[src/app/layout.tsx](/src/app/layout.tsx) defines the root HTML shell and favicon metadata.

### Providers

[src/app/providers.tsx](/src/app/providers.tsx) wraps the app with:

- `ErrorBoundary`
- `ThemeProvider`
- `TooltipProvider`
- `Toaster`

### Theme system

The theme context currently defaults to `light` and is not configured as a user-facing theme switcher. The provider still supports switchable mode if the product later needs it.

## Forms

## Registration Form

Primary UI:

- [src/components/sections/registration-modal.tsx](/src/components/sections/registration-modal.tsx)

Shared options and default values:

- [src/lib/forms.ts](/src/lib/forms.ts)

### Registration flow

1. User opens the modal from the registration section.
2. User selects `School LGA`.
3. User selects `School Category`.
4. The client requests `/api/schools`.
5. Matching school names are shown in a dropdown.
6. User either selects an existing school or chooses `My school isn't listed here`.
7. If the school is missing, the form reveals a manual school name input.
8. User completes the remaining student, principal, teacher, and past-edition fields.
9. Form submits to `/api/registration`.

### Registration form state

The form state is fully controlled in React and includes:

- three student representatives
- school details
- school source metadata
- principal details
- teacher details
- past edition feedback

Important state fields:

- `schoolLGA`
- `schoolCategory`
- `schoolSource`
- `schoolFullName`

### School lookup behavior

The school lookup is dependent on `schoolLGA` and `schoolCategory`.

If both are selected:

- the client fetches `/api/schools?lga=...&category=...`
- loading state is shown while the request is in flight
- inline error text is shown if lookup fails
- the user can still choose the missing-school path

## Sponsorship Form

Primary UI:

- [src/components/sections/sponsorship-section.tsx](/src/components/sections/sponsorship-section.tsx)

Submit target:

- `POST /api/sponsorship`

Fields collected:

- organisation name
- contact person
- email
- phone
- sponsorship tier
- optional message

## API Routes

## `GET /api/schools`

File:

- [src/app/api/schools/route.ts](/src/app/api/schools/route.ts)

Purpose:

- validate school lookup query params
- query Airtable for matching schools
- return normalized school options to the frontend

Expected query params:

- `lga`
- `category`

Response shape:

```json
{
  "schools": [
    {
      "name": "Example School",
      "category": "Private",
      "lga": "Abeokuta North"
    }
  ]
}
```

## `POST /api/registration`

File:

- [src/app/api/registration/route.ts](/src/app/api/registration/route.ts)

Purpose:

- validate the full registration payload
- create a new school record when the user entered a manual school
- create the main participant registration record

Important validation rules:

- enums are validated against shared option arrays
- email format is validated
- dates must match `YYYY-MM-DD`
- phone numbers must contain at least 7 digits after stripping punctuation
- school names are normalized before use

Important behavior:

- if `schoolSource === "new"`, the route checks the school database table first
- duplicate school matching is normalized by whitespace and case

## `POST /api/sponsorship`

File:

- [src/app/api/sponsorship/route.ts](/src/app/api/sponsorship/route.ts)

Purpose:

- validate sponsorship form data
- map the payload to Airtable field names
- create a sponsorship record

## Airtable Integration

All Airtable access goes through:

- [src/lib/airtable.ts](/src/lib/airtable.ts)

### Helper responsibilities

- resolve env configuration
- build Airtable URLs
- parse Airtable API errors
- create records
- list records
- find an existing school by normalized name, category, and LGA

### Supported table accessors

- `getParticipantsTableId()`
- `getSponsorshipTableId()`
- `getSchoolDatabaseTableId()`

### Environment strategy

The helper supports both:

- `AIRTABLE_*`
- `NEXT_PUBLIC_AIRTABLE_*`

Server-only env vars are the preferred configuration.

## Validation Model

Validation is implemented directly in the API routes using local helper functions such as:

- `requireString`
- `requireEmail`
- `requirePhone`
- `requireDate`
- `requireOption`

This keeps route logic readable, but it also means validation rules are duplicated across routes rather than centralized in a schema library.

## Navigation And Layout

The fixed navigation bar links to section anchors:

- `#about`
- `#impact`
- `#programme`
- `#dates`
- `#founder`
- `#register`
- `#partner`

Mobile navigation is handled by [src/components/layout/mobile-menu.tsx](/src/components/layout/mobile-menu.tsx).

## Assets

Images live in:

- `public/assets`

Current section components still use plain `<img>` elements instead of `next/image`, which shows up as a build-time lint warning.

## Known Issues

### 1. Airtable field mismatch in registration

The registration route currently maps:

```text
Zonal Finals Location
```

but the connected Airtable participants table does not currently recognize that exact field name. This causes registration submission to fail at runtime until the field mapping is corrected.

### 2. Build blocked by existing lint errors

`next build` fails because the codebase already contains ESLint violations unrelated to the school lookup work, mainly:

- `react/no-unescaped-entities`
- `@next/next/no-img-element` warnings

### 3. Some text values have encoding artifacts

Examples currently exist in `SPONSORSHIP_TIER_OPTIONS` in [src/lib/forms.ts](/src/lib/forms.ts).

## How To Extend The Codebase

### Add a new section

1. Create a new component in `src/components/sections`.
2. Import it into `src/app/page.tsx`.
3. Add a nav link if the section needs anchor navigation.

### Add a new Airtable-backed form

1. Define initial form data and option lists in `src/lib/forms.ts`.
2. Build the client component in `src/components/sections` or another suitable folder.
3. Add a dedicated API route under `src/app/api`.
4. Reuse `src/lib/airtable.ts` for record creation and lookup.
5. Validate all fields on the server before writing to Airtable.

### Add a new Airtable table

1. Add the table ID env var.
2. Add a getter in `src/lib/airtable.ts`.
3. Keep table-specific mapping logic inside the relevant API route.

## Suggested Refactors

- Move route validation to a schema library such as `zod`.
- Introduce a dedicated Airtable mapping layer per table.
- Add route-level tests for payload validation and field mapping.
- Replace plain `<img>` usage with `next/image` where appropriate.
- Clean up copy and encoding issues across the content sections.
