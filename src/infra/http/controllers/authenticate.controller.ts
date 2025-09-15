import { AuthenticatePlayerUseCase } from '@/domain/habbitTracker/application/use-cases/authenticate-player';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import z from 'zod';

const authenticateBodySchema = z.object({
	email: z.email(),
	password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
	constructor(private authenticatePlayer: AuthenticatePlayerUseCase) {}

	@Post()
	@UsePipes(new ZodValidationPipe(authenticateBodySchema))
	async handle(@Body() body: AuthenticateBodySchema) {
		const { email, password } = body;

		const result = await this.authenticatePlayer.execute({
			email,
			password,
		});

		if (result.isLeft()) {
			throw new Error();
		}

		const { accessToken } = result.value;

		return {
			access_token: accessToken,
		};
	}
}
