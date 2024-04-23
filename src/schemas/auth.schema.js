import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Usuario requerido",
  }),
  email: z
    .string({
      required_error: "Email requerido",
    })
    .email({
      required_error: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, { required_error: "6 caracteres como minimo" }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email requerido",
    })
    .email({
      required_error: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, { required_error: "6 caracteres como minimo" }),
});
