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
  lastName: z
    .string({
      message: "Apellido es requerido.",
    })
    .min(3, {
      message: "Apellido debe contener al menos 3 caracteres.",
    }),
  cuit: z
    .number({
      message: "CUIT es requerido.",
    })
    .min(10000000000, {
      message: "CUIT Debe contener 11 numeros.",
    })
    .max(99999999999, {
      message: "CUIT Debe contener 11 numeros.",
    }),
  address: z
    .string({
      message: "Direccion es requerida.",
    })
    .min(3, {
      message: "Direccion debe contener al menos 3 caracteres.",
    }),
  phone: z
    .string({
      message: "Telefono es requerido.",
    })
    .min(8, {
      message: "Telefono debe contener al menos 8 numeros.",
    }),
});

export type clientSchemaType = z.infer<typeof clientSchema>;
