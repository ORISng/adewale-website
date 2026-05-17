import { NextResponse } from "next/server";
import {
  getSchoolDatabaseTableId,
  listAirtableRecords,
  type SchoolRecordFields,
} from "@/lib/airtable";
import { LGA_OPTIONS, SCHOOL_CATEGORY_OPTIONS } from "@/lib/forms";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function requireOption<T extends readonly string[]>(
  value: string | null,
  options: T,
  fieldName: string,
): T[number] {
  if (!value) {
    throw new Error(`${fieldName} is required.`);
  }

  if (!options.includes(value)) {
    throw new Error(`${fieldName} is invalid.`);
  }

  return value as T[number];
}

function escapeFormulaValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lga = requireOption(searchParams.get("lga"), LGA_OPTIONS, "School LGA");
    const category = requireOption(
      searchParams.get("category"),
      SCHOOL_CATEGORY_OPTIONS,
      "School Category",
    );

    const params = new URLSearchParams();
    params.append("fields[]", "School Name");
    params.append("fields[]", "School Category");
    params.append("fields[]", "School Local Government Area");
    params.set(
      "filterByFormula",
      `AND({School Local Government Area}="${escapeFormulaValue(lga)}",{School Category}="${escapeFormulaValue(category)}")`,
    );
    params.set("sort[0][field]", "School Name");
    params.set("sort[0][direction]", "asc");

    const records = await listAirtableRecords<SchoolRecordFields>(
      getSchoolDatabaseTableId(),
      params,
    );

    const schools = records
      .map((record) => ({
        name: typeof record.fields["School Name"] === "string"
          ? record.fields["School Name"].trim()
          : "",
        category: typeof record.fields["School Category"] === "string"
          ? record.fields["School Category"].trim()
          : "",
        lga: typeof record.fields["School Local Government Area"] === "string"
          ? record.fields["School Local Government Area"].trim()
          : "",
      }))
      .filter((school) => school.name);

    return NextResponse.json({ schools });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "School LGA is required." ||
        error.message === "School Category is required." ||
        error.message === "School LGA is invalid." ||
        error.message === "School Category is invalid."
      ) {
        return badRequest(error.message);
      }
    }

    console.error("School lookup failed:", error);
    return NextResponse.json(
      { error: "Unable to load schools right now." },
      { status: 500 },
    );
  }
}
