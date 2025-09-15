import { FetchPriorityQuestsUseCase } from '@/domain/habbitTracker/application/use-cases/fetch-priority-quests';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
	BadRequestException,
	Controller,
	Get,
	Query,
	UseGuards,
} from '@nestjs/common';
import z from 'zod';
import { QuestPresenter } from '../presenters/quest-presenter';

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
	constructor(private fetchQuests: FetchPriorityQuestsUseCase) {}

	@Get()
	async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
		const result = await this.fetchQuests.execute({ page });

		if (result.isLeft()) {
			throw new BadRequestException();
		}

		const quests = result.value.quests;

		return {
			quests: quests.map(QuestPresenter.toHTTP),
		};
	}
}
