import { db } from "../../db/client.js";
import { sampleHumidity } from "../../db/schema.js";

import { eq } from "drizzle-orm";

export function getSampleHumidity(sampleId: number) {
  return db
    .select()
    .from(sampleHumidity)
    .where(eq(sampleHumidity.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}
