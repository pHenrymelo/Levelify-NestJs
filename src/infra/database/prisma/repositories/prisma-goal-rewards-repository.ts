import { Injectable } from '@nestjs/common';
import type { GoalRewardsRepository } from '@/domain/habbitTracker/application/repositories/goal-rewards-repository';
import type { GoalReward } from '@/domain/habbitTracker/enterprise/entities/goal-reward';

@Injectable()
export class PrismaGoalRewardsRepository implements GoalRewardsRepository {
	findManyByGoalId(goalId: string): Promise<GoalReward[]> {
		throw new Error('Method not implemented.');
	}
	deleteManyByGoalId(goalId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	create(goalReward: GoalReward): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(goalReward: GoalReward): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findById(id: string): Promise<GoalReward | null> {
		throw new Error('Method not implemented.');
	}
	findByGoalId(goalId: string): Promise<GoalReward | null> {
		throw new Error('Method not implemented.');
	}
	save(goalReward: GoalReward): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
