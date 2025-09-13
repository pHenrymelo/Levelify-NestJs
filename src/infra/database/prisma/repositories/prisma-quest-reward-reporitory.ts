import type { QuestRewardsRepository } from '@/domain/habbitTracker/application/repositories/quest-rewards-repository';
import type { QuestReward } from '@/domain/habbitTracker/enterprise/entities/quest-reward';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestRewards implements QuestRewardsRepository {
	findManyByQuestId(questId: string): Promise<QuestReward[]> {
		throw new Error('Method not implemented.');
	}
	deleteManyByQuestId(questId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	create(questReward: QuestReward): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(questReward: QuestReward): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findById(id: string): Promise<QuestReward | null> {
		throw new Error('Method not implemented.');
	}
	findByQuestId(questId: string): Promise<QuestReward | null> {
		throw new Error('Method not implemented.');
	}
	save(questReward: QuestReward): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
