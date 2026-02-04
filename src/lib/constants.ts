import type { Step } from "@/components/ui/stepper";

export const PAGE_SIZES = [10, 20, 50, 100] as const;

export const SAMPLE_FORM_STEPS: Step[] = [
  {
    title: "Información General",
    description: "Datos básicos de la muestra",
  },
  {
    title: "Datos del Lote",
    description: "Información del lote",
  },
  {
    title: "Otros",
    description: "Información adicional",
  },
];

export const ANALYSIS_COLUMNS = [
  { key: "firstCount", label: "1° recuento" },
  { key: "pg", label: "PG" },
  { key: "vigorTz", label: "Vigor TZ" },
  { key: "viabilityTz", label: "Viabilidad TZ" },
  { key: "pms", label: "PMS" },
  { key: "purityPercent", label: "Pureza" },
] as const;

export const scientificSpeciesList = [
  "Avena sativa L.",
  "Avena strigosa Schreb.",
  "Beta vulgaris L. (variedades monogérmicas)",
  "Beta vulgaris L. (variedades poligérmicas)",
  "Brassica carinata A. Braun",
  "Brassica napus L.",
  "Brassica oleracea L.",
  "Coriandrum sativum L.",
  "Glycine max (L.) Merr.",
  "Helianthus annuus L.",
  "Hordeum vulgare L. subsp. vulgare",
  "Panicum miliaceum L.",
  "Pisum sativum L. s.l.",
  "Secale cereale L.",
  "Sorghum bicolor (L.) Moench subsp. bicolor",
  "Triticum aestivum L. subsp. aestivum",
  "Triticum durum",
  "Vicia faba L.",
  "Vicia sativa L.",
  "Vicia villosa Roth",
  "Vigna radiata (L.) R. Wilczek",
  "Zea mays L.",
];

export const speciesList = [
  "Acelga",
  "Arveja",
  "Avena",
  "Avena negra",
  "Cebada",
  "Centeno",
  "Col",
  "Colza",
  "Coriandro",
  "Girasol",
  "Maíz",
  "Mijo",
  "Nabo",
  "Poroto mung",
  "Soja",
  "Sorgo",
  "Trigo",
  "Vicia",
];
