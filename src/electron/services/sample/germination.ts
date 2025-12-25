import { db } from "../../db/client.js";
import { sampleGermination } from "../../db/schema.js";

import { eq } from "drizzle-orm";

export function getSampleGermination(sampleId: number) {
  return db
    .select()
    .from(sampleGermination)
    .where(eq(sampleGermination.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}
