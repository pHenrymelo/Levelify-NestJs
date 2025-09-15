import { RegisterPlayerUseCase } from '@/domain/habbitTracker/application/use-cases/register-player';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import z from 'zod';

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
	constructor(private registerPlayer: RegisterPlayerUseCase) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async handle(@Body() body: CreateAccountBodySchema) {
		const { name, email, password } = body;

		const result = await this.registerPlayer.execute({
			name,
			email,
			password,
		});

		if (result.isLeft()) {
			throw new Error();
		}
	}
}
