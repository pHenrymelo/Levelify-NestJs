import { Injectable } from '@nestjs/common';
import type { RewardsRepository } from '@/domain/habbitTracker/application/repositories/rewards-repository';
import type { Reward } from '@/domain/habbitTracker/enterprise/entities/reward';

@Injectable()
export class PrismaRewardsRepository implements RewardsRepository {
	create(reward: Reward): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
