# PRD: Register Your School Airtable Lookup and New School Capture

## Overview

The current `Register Your School` flow uses a local in-code school list in [src/lib/registered-schools.ts](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/lib/registered-schools.ts) to populate the school dropdown inside [src/components/sections/registration-modal.tsx](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/components/sections/registration-modal.tsx). That list is empty and is not connected to Airtable.

This change will replace the static school lookup with a dynamic Airtable-backed lookup using the `Adewale School Database` table (`tblMmGw7SY2dHzQOj`). It will also allow users to add a missing school during registration and persist that new school to Airtable on successful form submission.

## Problem

- Users currently cannot reliably select their school from a maintained source of truth.
- The school dropdown is not populated from Airtable.
- Missing schools can be typed into the form, but there is no defined workflow to save them into the `Adewale School Database`.
- The current flow does not distinguish between:
  - selecting an existing school
  - creating a new school record for future use

## Goal

Create a registration experience where:

1. The user selects `School LGA`.
2. The user selects `School Category`.
3. The app fetches matching schools from Airtable and populates the `School Name` dropdown.
4. The user either selects an existing school or chooses an option to add a missing school.
5. The user continues and submits the full registration form.
6. If the school was newly entered, the app creates a new Airtable record in `Adewale School Database` with:
   - `School Name`
   - `School Category`
   - `School Local Government Area`

## Non-Goals

- Rebuilding the full registration form.
- Editing existing school records in Airtable from the frontend.
- Deduplicating historical Airtable school records beyond basic submission-time checks.
- Syncing school address or school email into the school database table unless explicitly added later.

## Users

- Ogun State secondary school representatives registering their school.
- Internal ASC/Adewale operations staff who rely on Airtable as the source of truth for school data.

## Airtable Source

- Base ID: `apppcnjdT5iHZuflw`
- Table ID: `tblMmGw7SY2dHzQOj`
- Table Name: `Adewale School Database`

### Required fields

| Field Name | Field ID | Type |
| --- | --- | --- |
| School Name | `fldM9yhT6fVEw4kHp` | single line text |
| School Category | `fldjcRVLN9uExrO1f` | single line text |
| School Local Government Area | `fldqzB9AfIBAKQCfa` | single line text |

## Current State

- UI logic already requires users to select LGA and category before school selection.
- The school dropdown is currently driven by `findSchools(formData.schoolLGA, formData.schoolCategory)`.
- New schools can already be typed when the user selects `My school isn't listed here`.
- Form submission currently creates only the participant registration record through [src/app/api/registration/route.ts](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/app/api/registration/route.ts).

## Proposed Experience

### User flow

1. User opens `Register Your School`.
2. User selects `School LGA`.
3. User selects `School Category`.
4. System calls a backend endpoint to fetch matching schools from Airtable.
5. `School Name` dropdown is populated with the returned school names.
6. User does one of the following:
   - selects an existing school name
   - selects `My school isn't listed here`
7. If the user selects `My school isn't listed here`, a text input appears for manual school name entry.
8. User completes the rest of the registration form.
9. On form submission:
   - the registration record is created as it is today
   - if the school name was manually entered, a new record is also created in `Adewale School Database`

### UX requirements

- `School Name` must stay disabled or hidden until both `School LGA` and `School Category` are selected.
- While school options are loading, show a loading state such as `Loading schools...`.
- If no Airtable records match, the dropdown should still show the `My school isn't listed here` option.
- If the fetch fails, show a clear inline error and allow retry by changing the selection or reopening the dropdown.
- The manual school-name input should only appear when the user explicitly chooses the missing-school option.

## Functional Requirements

### FR1: Airtable-backed school lookup

After `School LGA` and `School Category` are selected, the frontend must request matching schools from Airtable through a server-side API.

The lookup must filter by:

- `School Local Government Area = selected LGA`
- `School Category = selected category`

The response should return only the fields needed for dropdown rendering:

- `School Name`
- optionally `School Category`
- optionally `School Local Government Area`

### FR2: Existing school selection

If matches are returned, the `School Name` dropdown must list the matching Airtable school names in ascending alphabetical order.

### FR3: Missing school option

The dropdown must always include a final option:

- `My school isn't listed here`

Selecting this option must:

- clear any previously selected school name
- reveal a required free-text input for manual school name entry

### FR4: Continue registration with manual school entry

If the user enters a manual school name, the rest of the form must remain fully submittable as long as all other registration fields are valid.

### FR5: Create new school record in Airtable

When the registration form is submitted and the school name came from manual entry, the backend must create a new record in `Adewale School Database` containing:

- `School Name`
- `School Category`
- `School Local Government Area`

### FR6: Do not create duplicate school records for existing selections

If the user selected a school from the Airtable-populated dropdown, no new school record should be created in `Adewale School Database`.

### FR7: Submission order

Recommended backend submission order:

1. Validate the full registration payload.
2. If school was manually entered, check whether an exact school record already exists for the same `School Name`, `School Category`, and `School Local Government Area`.
3. If it does not exist, create the school record in `Adewale School Database`.
4. Create the participant registration record.

This prevents duplicate school creation from repeated submissions and keeps the school database current.

## API Requirements

### 1. School lookup endpoint

Add a server-side endpoint, for example:

- `GET /api/schools?lga=Abeokuta%20North&category=Private`

Responsibilities:

- validate query params
- call Airtable from the server
- filter by LGA + category
- sort by `School Name`
- return normalized dropdown options

Example Airtable filter formula:

```text
AND(
  {School Local Government Area} = "Abeokuta North",
  {School Category} = "Private"
)
```

Recommended Airtable request shape:

- `fields[]=School Name`
- `fields[]=School Category`
- `fields[]=School Local Government Area`
- `sort[0][field]=School Name`
- `sort[0][direction]=asc`

Example response:

```json
{
  "schools": [
    {
      "name": "AGGREY MEMORIAL SECONDARY SCHOOL",
      "category": "Private",
      "lga": "Abeokuta North"
    }
  ]
}
```

### 2. Registration submission endpoint

Update the existing registration endpoint in [src/app/api/registration/route.ts](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/app/api/registration/route.ts) so it can determine whether:

- the user selected an existing school
- the user entered a new school manually

Recommended payload addition:

- `schoolSource: "existing" | "new"`

This removes ambiguity and avoids inferring intent only from `schoolFullName`.

### 3. Airtable helper updates

Extend [src/lib/airtable.ts](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/lib/airtable.ts) to support:

- listing records from `Adewale School Database`
- creating records in `Adewale School Database`
- optionally checking for an existing exact-match school before insertion

Recommended helper additions:

- `getSchoolDatabaseTableId()`
- `listAirtableRecords(...)`
- `findSchoolByNameCategoryLga(...)`

## Data Rules

- `School LGA` must match one of the allowed `LGA_OPTIONS`.
- `School Category` must match one of the allowed `SCHOOL_CATEGORY_OPTIONS`.
- `School Name` is required:
  - from dropdown for existing schools
  - from text input for new schools
- Manual school name should be trimmed before save.
- Manual school name comparison for dedupe should use a normalized comparison:
  - trim whitespace
  - collapse duplicate internal spaces
  - compare case-insensitively

## Error Handling

### Lookup errors

If the Airtable lookup fails:

- do not block the entire form permanently
- show an inline message such as `Unable to load schools right now`
- preserve the selected LGA and category
- keep the missing-school path available so the user can continue if necessary

### Submission errors

If the school record creation fails:

- return a clear server error
- do not report success to the user
- do not partially treat the registration as successful unless the team explicitly wants partial success semantics

Recommended default: keep the full submission transactional from the user’s perspective. If school creation fails, the user should see submission failure.

## Security Requirements

The Airtable API token must remain server-side only.

The current helper reads `NEXT_PUBLIC_AIRTABLE_API_TOKEN` and `NEXT_PUBLIC_AIRTABLE_BASE_ID`, which exposes implementation risk because `NEXT_PUBLIC_*` variables are intended for client exposure in Next.js. For this feature, use server-only environment variables instead, for example:

- `AIRTABLE_API_TOKEN`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_PARTICIPANTS_TABLE_ID`
- `AIRTABLE_SPONSORSHIP_TABLE_ID`
- `AIRTABLE_SCHOOLS_TABLE_ID`

## Acceptance Criteria

1. Given a user selects an LGA and category, when matching schools exist in Airtable, then the `School Name` dropdown shows only those matching schools.
2. Given a user changes the LGA or category, when the previous school selection no longer applies, then the selected school is cleared and the school list refreshes.
3. Given no matching schools exist, when the dropdown opens, then the user can still choose `My school isn't listed here`.
4. Given the user chooses `My school isn't listed here`, when the manual input appears, then entering a school name becomes required before submission.
5. Given the user selected an existing school from the dropdown, when they submit successfully, then no new record is created in `Adewale School Database`.
6. Given the user manually entered a school name, when they submit successfully, then a new Airtable record is created in `Adewale School Database` with `School Name`, `School Category`, and `School Local Government Area`.
7. Given a manual school entry already exists in Airtable for the same normalized name, category, and LGA, when the user submits, then the system should not create a duplicate school record.
8. Given Airtable is unavailable during school lookup, when the user has selected LGA and category, then the UI shows a recoverable error and still allows the missing-school path.
9. Given Airtable is unavailable during submission, when the user submits, then the user sees submission failure and no false success state.

## Implementation Notes

### Frontend

Update [src/components/sections/registration-modal.tsx](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/components/sections/registration-modal.tsx):

- replace `useMemo(findSchools(...))` with server-fetched school options
- add loading and error state for school lookup
- add `schoolSource` state or equivalent
- preserve existing `My school isn't listed here` interaction pattern

### Backend

Update [src/app/api/registration/route.ts](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/app/api/registration/route.ts):

- validate whether school is `existing` or `new`
- if `new`, create school record in `tblMmGw7SY2dHzQOj`
- continue creating participant registration record

### Data source cleanup

[src/lib/registered-schools.ts](/C:/Users/23481/OneDrive/Desktop/Build/Oris/adewale-website/src/lib/registered-schools.ts) should either:

- be removed if no longer needed, or
- be retained only for fallback/mock data in non-production environments

## Open Questions

1. Should a newly added school be created before the participant record, or only after the participant record succeeds?
2. Should duplicate detection use exact text match only, or normalized case-insensitive matching?
3. Should the user be allowed to proceed with manual school entry if the Airtable lookup endpoint is down?
4. Should newly created schools require staff review before being treated as selectable in future sessions?
5. Do we want to store additional school metadata in the school database later, such as address or email?

## Recommendation

Implement this in two backend-facing steps:

1. Add a dedicated `/api/schools` lookup endpoint for Airtable-backed dropdown data.
2. Extend `/api/registration` to create a school record only when `schoolSource = "new"` and only after duplicate checking.

This keeps the UI responsive, keeps the Airtable token off the client, and avoids coupling dropdown population to hardcoded data.
