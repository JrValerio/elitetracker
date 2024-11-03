import { z } from 'zod';

export const createHabitSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  frequency: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
  startDate: z.date().default(() => new Date()),
  description: z.string().optional(),
});
