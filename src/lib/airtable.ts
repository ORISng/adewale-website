const AIRTABLE_API_BASE = "https://api.airtable.com/v0";

type AirtableRecordFields = Record<string, string>;

function getAirtableConfig() {
  const apiToken = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  const participantsTableId =
    process.env.NEXT_PUBLIC_AIRTABLE_PARTICIPANTS_TABLE_ID;
  const sponsorshipTableId =
    process.env.NEXT_PUBLIC_AIRTABLE_SPONSORSHIP_TABLE_ID;

  if (!apiToken || !baseId || !participantsTableId || !sponsorshipTableId) {
    throw new Error("Airtable environment variables are not fully configured.");
  }

  return { apiToken, baseId, participantsTableId, sponsorshipTableId };
}

async function parseAirtableError(response: Response) {
  try {
    const payload = (await response.json()) as {
      error?: { message?: string; type?: string };
    };

    if (payload.error?.type && payload.error.message) {
      return `${payload.error.type}: ${payload.error.message}`;
    }

    if (payload.error?.message) {
      return payload.error.message;
    }
  } catch {
    return response.statusText || "Unknown Airtable error";
  }

  return response.statusText || "Unknown Airtable error";
}

export function getParticipantsTableId() {
  return getAirtableConfig().participantsTableId;
}

export function getSponsorshipTableId() {
  return getAirtableConfig().sponsorshipTableId;
}

export async function createAirtableRecord(
  tableId: string,
  fields: AirtableRecordFields,
) {
  const { apiToken, baseId } = getAirtableConfig();

  const response = await fetch(`${AIRTABLE_API_BASE}/${baseId}/${tableId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      records: [{ fields }],
      typecast: false,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseAirtableError(response));
  }

  return response.json();
}
