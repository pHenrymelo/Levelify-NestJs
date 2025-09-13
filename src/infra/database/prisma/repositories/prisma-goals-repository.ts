import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { GoalsRepository } from '@/domain/habbitTracker/application/repositories/goals-repository';
import type { Goal } from '@/domain/habbitTracker/enterprise/entities/goal';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaGoalsRepository implements GoalsRepository {
	findById(id: string): Promise<Goal | null> {
		throw new Error('Method not implemented.');
	}
	findManyByQuestId(
		QuestId: string,
		params: PaginationParams,
	): Promise<Goal[]> {
		throw new Error('Method not implemented.');
	}
	delete(quest: Goal): Promise<void> {
		throw new Error('Method not implemented.');
	}
	create(goal: Goal): Promise<void> {
		throw new Error('Method not implemented.');
	}
	save(quest: Goal): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
