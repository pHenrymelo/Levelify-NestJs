import { CreateQuestUseCase } from '@/domain/habbitTracker/application/use-cases/create-quest';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
	BadRequestException,
	Body,
	Controller,
	Post,
	UseGuards,
} from '@nestjs/common';
import z from 'zod';

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

		const result = await this.createQuest.execute({
			title,
			description,
			playerId: userId,
			rewardIds: [],
		});

		if (result.isLeft()) {
			throw new BadRequestException();
		}
	}
}
