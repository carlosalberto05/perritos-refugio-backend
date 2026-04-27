import { z } from 'zod';

export const createDogSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    age: z.string().min(1, 'La edad es obligatoria'),
    size: z.enum(['Pequeño', 'Mediano', 'Grande'], {
      error: 'El tamaño debe ser "Pequeño", "Mediano" o "Grande"',
    }),
    breed: z.string().min(2, 'La raza debe tener al menos 2 caracteres'),
    adoptionStatus: z.enum(['En adopción', 'Adoptado', 'Reservado'], {
      error: 'El estado debe ser "En adopción", "Adoptado" o "Reservado"',
    }),
    image: z.string().url('La imagen debe ser una URL válida'),
    description: z
      .string()
      .min(10, 'La descripción debe tener al menos 10 caracteres'),
    color: z.string().optional(),
    distance: z.number().optional(),
    shelterId: z.string().optional(),
  }),
});

export type CreateDogBody = z.infer<typeof createDogSchema>['body'];
