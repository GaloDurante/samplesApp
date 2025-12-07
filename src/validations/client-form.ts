import { z } from "zod";

export const clientFormSchema = z.object({
  name: z
    .string({
      message: "Este campo es obligatorio.",
    })
    .min(3, {
      message: "Debe contener al menos 3 caracteres.",
    }),
  lastName: z
    .string({
      message: "Este campo es obligatorio.",
    })
    .min(3, {
      message: "Debe contener al menos 3 caracteres.",
    }),
  cuit: z
    .string({
      message: "Este campo es obligatorio.",
    })
    .length(11, {
      message: "Debe contener 11 números.",
    }),
  address: z
    .string({
      message: "Este campo es obligatorio.",
    })
    .min(3, {
      message: "Debe contener al menos 3 caracteres.",
    }),
  phone: z
    .string({
      message: "Este campo es obligatorio.",
    })
    .min(8, {
      message: "Debe contener al menos 8 números.",
    }),
});

export type clientFormType = z.infer<typeof clientFormSchema>;
