import { z } from 'zod';

export const activitySchema = z.object({
  type: z.enum(['transport', 'energy', 'food', 'waste'], {
    message: 'Tipo de atividade inválido'
  }),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  value: z.number().positive('Valor deve ser positivo'),
  date: z.string().datetime('Data inválida')
});

export type ActivityInput = z.infer<typeof activitySchema>;
