import { z } from 'zod';

export const envSchema = z.object({
	DATABASE_URL: z.url(),
	PORT: z.coerce.number().optional().default(3333),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
	OTEL_SERVICE_NAME: z.string().default('Levelify'),
});

export type Env = z.infer<typeof envSchema>;
