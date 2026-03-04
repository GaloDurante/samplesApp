import { z } from "zod";

export const clientSchema = z.object({
  id: z.number().optional(),
  name: z
    .string({
      message: "Nombre es requerido.",
    })
    .min(3, {
      message: "Nombre debe contener al menos 3 caracteres.",
    }),
  cuit: z
    .number({
      message: "CUIT debe ser un número.",
    })
    .min(10000000000, {
      message: "CUIT Debe contener 11 números.",
    })
    .max(99999999999, {
      message: "CUIT Debe contener 11 números.",
    })
    .nullable(),
  address: z
    .string({
      message: "Dirección es requerida.",
    })
    .min(3, {
      message: "Dirección debe contener al menos 3 caracteres.",
    }),
  email: z.email("Email no es válido.").nullable(),
  phone: z
    .string({
      message: "Teléfono no es válido.",
    })
    .min(8, {
      message: "Teléfono debe contener al menos 8 números.",
    })
    .nullable(),
});

export type ClientType = z.infer<typeof clientSchema>;
