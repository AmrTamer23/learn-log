import { z } from 'zod';

export const courseFormSchema = z.object({
	name: z.string().min(2).max(50),
	description: z.string().max(500),
	dateOfStart: z.string().optional(),
	color: z.string().optional(),
	emoji: z.string().optional()
});

export type FormSchema = typeof courseFormSchema;
