import { SCHOOL_CATEGORY_OPTIONS } from "./forms";

export type SchoolCategory = (typeof SCHOOL_CATEGORY_OPTIONS)[number];

export interface RegisteredSchool {
  name: string;
  lga: string;
  category: SchoolCategory;
}

// Populate this list from the previously-registered schools file.
// `lga` must exactly match one of LGA_OPTIONS in `forms.ts`.
// `category` must be "Public" or "Private".
export const REGISTERED_SCHOOLS: RegisteredSchool[] = [
  // { name: "Example High School", lga: "Sagamu", category: "Public" },
];

export const NEW_SCHOOL_VALUE = "__new_school__";

export function findSchools(lga: string, category: string): RegisteredSchool[] {
  if (!lga || !category) return [];
  return REGISTERED_SCHOOLS.filter(
    (school) => school.lga === lga && school.category === category,
  );
}
