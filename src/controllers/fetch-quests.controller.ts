import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import z from 'zod';

const pageQueryParamSchema = z
	.string()
	.optional()
	.default('1')
	.transform(Number)
	.pipe(z.number().min(1));

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('/quests')
@UseGuards(JwtAuthGuard)
export class FetchPriorityQuestsController {
	constructor(private prisma: PrismaService) {}

	@Get()
	async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
		const quests = await this.prisma.quest.findMany({
			take: 20,
			skip: (page - 1) * 20,
			orderBy: {
				dueDate: 'asc',
			},
		});

		return {
			quests,
		};
	}
}
