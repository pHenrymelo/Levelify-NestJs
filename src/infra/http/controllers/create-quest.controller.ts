import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import z from 'zod';
import { CreateQuestUseCase } from '@/domain/habbitTracker/application/use-cases/create-quest';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

const createQuestBodySchema = z.object({
	title: z.string(),
	description: z.string(),
});

type CreateQuestBodySchema = z.infer<typeof createQuestBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(createQuestBodySchema);

@Controller('/quests')
@UseGuards(JwtAuthGuard)
export class CreateQuestController {
	constructor(private createQuest: CreateQuestUseCase) {}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body: CreateQuestBodySchema,
		@CurrentUser() user: UserPayload,
	) {
		const { title, description } = body;
		const userId = user.sub;

		await this.createQuest.execute({
			title,
			description,
			playerId: userId,
			rewardIds: [],
		});
	}
}
