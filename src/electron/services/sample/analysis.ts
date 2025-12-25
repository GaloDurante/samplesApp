import { db } from "../../db/client.js";
import { sampleAnalysis } from "../../db/schema.js";

import { eq } from "drizzle-orm";

export function getSampleAnalysis(sampleId: number) {
  return db
    .select()
    .from(sampleAnalysis)
    .where(eq(sampleAnalysis.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}

// export function createAnalysis(analysis: SampleAnalysis) {
//   const existing = queryOne("SELECT id FROM samples WHERE id = ?", [analysis.sample_id]);
//   if (!existing) {
//     throw new Error("La muestra seleccionada no existe.");
//   }

//   const validationResult = sampleAnalysisSchema.safeParse(analysis);
//   if (!validationResult.success) {
//     const firstError = validationResult.error.issues[0];
//     throw new Error(firstError.message || "Error de validación");
//   }
//   const validatedAnalysis = validationResult.data;

//   try {
//     execute(
//       `INSERT INTO sample_analysis (
//         sample_id, first_count, pg, pg_curado, ct,
//         ct_curado, ea, ea_curado, vigor_tz,
//         viability_tz, e, pms, purity_percent, other_analysis
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         validatedAnalysis.sample_id,
//         validatedAnalysis.first_count || null,
//         validatedAnalysis.pg || null,
//         validatedAnalysis.pg_curado || null,
//         validatedAnalysis.ct || null,
//         validatedAnalysis.ct_curado || null,
//         validatedAnalysis.ea || null,
//         validatedAnalysis.ea_curado || null,
//         validatedAnalysis.vigor_tz || null,
//         validatedAnalysis.viability_tz || null,
//         validatedAnalysis.e || null,
//         validatedAnalysis.pms || null,
//         validatedAnalysis.purity_percent || null,
//         validatedAnalysis.other_analysis || null,
//       ],
//     );
//   } catch (error) {
//     console.warn(error);

//     if (error instanceof Error) {
//       throw new Error("Error al acceder a la base de datos");
//     }

//     throw new Error("No se pudo crear el análisis por un problema en el servidor.");
//   }
// }

// export function updateAnalysis(analysis: SampleAnalysis) {
//   if (!analysis.id) throw new Error("El ID del análisis es requerido.");

//   const existing = queryOne("SELECT id FROM samples WHERE id = ?", [analysis.sample_id]);
//   if (!existing) {
//     throw new Error("La muestra seleccionada no existe.");
//   }

//   const validationResult = sampleAnalysisSchema.safeParse(analysis);
//   if (!validationResult.success) {
//     const firstError = validationResult.error.issues[0];
//     throw new Error(firstError.message || "Error de validación");
//   }

//   const validatedAnalysis = validationResult.data;

//   try {
//     execute(
//       `UPDATE sample_analysis
//          SET sample_id=?, first_count=?, pg=?, pg_curado=?, ct=?,
//              ct_curado=?, ea=?, ea_curado=?, vigor_tz=?,
//              viability_tz=?, e=?, pms=?, purity_percent=?, other_analysis=?
//        WHERE id=?`,
//       [
//         validatedAnalysis.sample_id,
//         validatedAnalysis.first_count || null,
//         validatedAnalysis.pg || null,
//         validatedAnalysis.pg_curado || null,
//         validatedAnalysis.ct || null,
//         validatedAnalysis.ct_curado || null,
//         validatedAnalysis.ea || null,
//         validatedAnalysis.ea_curado || null,
//         validatedAnalysis.vigor_tz || null,
//         validatedAnalysis.viability_tz || null,
//         validatedAnalysis.e || null,
//         validatedAnalysis.pms || null,
//         validatedAnalysis.purity_percent || null,
//         validatedAnalysis.other_analysis || null,
//         validatedAnalysis.id ?? analysis.id,
//       ],
//     );
//   } catch (error) {
//     console.warn(error);

//     if (error instanceof Error) {
//       throw new Error("Error al acceder a la base de datos");
//     }

//     throw new Error("No se pudo modificar el análisis por un problema en el servidor.");
//   }
// }
