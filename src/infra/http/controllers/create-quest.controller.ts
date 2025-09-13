import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
	constructor(private prisma: PrismaService) {}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body: CreateQuestBodySchema,
		@CurrentUser() user: UserPayload,
	) {
		const { title, description } = body;

		const userId = user.sub;

		await this.prisma.quest.create({
			data: {
				playerId: userId,
				title,
				description,
				slug: this.convertToSlug(title),
			},
		});
	}

	private convertToSlug(title: string): string {
		return title
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-');
	}
}
