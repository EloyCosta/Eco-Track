import { z } from 'zod';

// Schema para CREATE (todos campos obrigatórios exceto carbon_footprint)
export const createActivitySchema = z.object({
  type: z.enum(['transport', 'energy', 'food', 'waste'], {
    message: 'Tipo de atividade inválido'
  }),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  value: z.number().positive('Valor deve ser positivo'),
  date: z.coerce.date({ message: 'Data inválida' }),
  carbon_footprint: z.number().optional().default(0)
});

// Schema para UPDATE (todos campos opcionais)
export const updateActivitySchema = z.object({
  type: z.enum(['transport', 'energy', 'food', 'waste']).optional(),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres').optional(),
  value: z.number().positive('Valor deve ser positivo').optional(),
  date: z.coerce.date({ message: 'Data inválida' }).optional(),
  carbon_footprint: z.number().optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'Pelo menos um campo deve ser fornecido para atualização'
});

// Tipos inferidos
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;