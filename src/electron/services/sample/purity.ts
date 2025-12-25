import { db } from "../../db/client.js";
import { samplePurity } from "../../db/schema.js";

import { eq } from "drizzle-orm";

export function getSamplePurity(sampleId: number) {
  return db
    .select()
    .from(samplePurity)
    .where(eq(samplePurity.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}
