import { z } from 'zod';

const tareaSchema = z.object({
    titulo: z.string().min(3, { message: "El título debe tener al menos 3 caracteres" }),
    descripcion: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
    completada: z.boolean().default(false)
});

export const validateTarea = (data) => tareaSchema.safeParse(data);
