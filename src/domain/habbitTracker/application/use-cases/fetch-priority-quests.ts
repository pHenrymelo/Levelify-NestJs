import { Injectable } from '@nestjs/common';
import { type Either, right } from '@/core/either';
import { Quest } from '../../enterprise/entities/quest';
import { QuestsRepository } from '../repositories/quests-repository';

interface FetchPriorityQuestsUseCaseRequest {
	page: number;
}

type FetchPriorityQuestsUseCaseResponse = Either<
	null,
	{
		quests: Quest[];
	}
>;

@Injectable()
export class FetchPriorityQuestsUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		page,
	}: FetchPriorityQuestsUseCaseRequest): Promise<FetchPriorityQuestsUseCaseResponse> {
		const quests = await this.questsRepository.findManyPriority({ page });

		return right({ quests });
	}
}
