import { execute, queryOne } from "../../database/sql.js";
import { sampleAnalysesSchema } from "../../../validations/sample.js";

import type { SampleAnalyses } from "../../../types/sample.js";

export function createAnalysis(analysis: SampleAnalyses) {
  const existing = queryOne("SELECT id FROM samples WHERE id = ?", [analysis.sample_id]);
  if (!existing) {
    throw new Error("La muestra seleccionada no existe.");
  }

  const validationResult = sampleAnalysesSchema.safeParse(analysis);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }
  const validatedAnalysis = validationResult.data;

  try {
    execute(
      `INSERT INTO sample_analyses (
        sample_id, first_count, pg, pg_curado, ct,
        ct_curado, ea, ea_curado, vigor_tz,
        viability_tz, e, pms, purity_percent, other_analysis
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validatedAnalysis.sample_id,
        validatedAnalysis.first_count,
        validatedAnalysis.pg,
        validatedAnalysis.pg_curado,
        validatedAnalysis.ct,
        validatedAnalysis.ct_curado,
        validatedAnalysis.ea,
        validatedAnalysis.ea_curado,
        validatedAnalysis.vigor_tz,
        validatedAnalysis.viability_tz,
        validatedAnalysis.e,
        validatedAnalysis.pms,
        validatedAnalysis.purity_percent,
        validatedAnalysis.other_analysis,
      ],
    );
  } catch (error) {
    console.warn(error);

    if (error instanceof Error) {
      throw new Error("Error al acceder a la base de datos");
    }

    throw new Error("No se pudo crear el análisis por un problema en el servidor.");
  }
}

export function updateAnalysis(analysis: SampleAnalyses) {
  if (!analysis.id) throw new Error("El ID del análisis es requerido.");

  const existing = queryOne("SELECT id FROM samples WHERE id = ?", [analysis.sample_id]);
  if (!existing) {
    throw new Error("La muestra seleccionada no existe.");
  }

  const validationResult = sampleAnalysesSchema.safeParse(analysis);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const validatedAnalysis = validationResult.data;

  try {
    execute(
      `UPDATE sample_analyses
         SET sample_id=?, first_count=?, pg=?, pg_curado=?, ct=?,
             ct_curado=?, ea=?, ea_curado=?, vigor_tz=?,
             viability_tz=?, e=?, pms=?, purity_percent=?, other_analysis=?
       WHERE id=?`,
      [
        validatedAnalysis.sample_id,
        validatedAnalysis.first_count,
        validatedAnalysis.pg,
        validatedAnalysis.pg_curado,
        validatedAnalysis.ct,
        validatedAnalysis.ct_curado,
        validatedAnalysis.ea,
        validatedAnalysis.ea_curado,
        validatedAnalysis.vigor_tz,
        validatedAnalysis.viability_tz,
        validatedAnalysis.e,
        validatedAnalysis.pms,
        validatedAnalysis.purity_percent,
        validatedAnalysis.other_analysis,
        validatedAnalysis.id ?? analysis.id,
      ],
    );
  } catch (error) {
    console.warn(error);

    if (error instanceof Error) {
      throw new Error("Error al acceder a la base de datos");
    }

    throw new Error("No se pudo modificar el análisis por un problema en el servidor.");
  }
}
