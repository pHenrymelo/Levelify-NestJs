import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaGoalRewardsRepository } from './prisma/repositories/prisma-goal-rewards-repository';
import { PrismaGoalsRepository } from './prisma/repositories/prisma-goals-repository';
import { PrismaNotificationsRepositoy } from './prisma/repositories/prisma-notification-repository';
import { PrismaQuestRewards } from './prisma/repositories/prisma-quest-reward-reporitory';
import { PrismaQuestsRepository } from './prisma/repositories/prisma-quests-repository';
import { PrismaRewardsRepository } from './prisma/repositories/prisma-rewards-repository';

@Module({
	providers: [
		PrismaService,
		PrismaQuestsRepository,
		PrismaQuestRewards,
		PrismaRewardsRepository,
		PrismaGoalsRepository,
		PrismaGoalRewardsRepository,
		PrismaNotificationsRepositoy,
	],
	exports: [
		PrismaService,
		PrismaQuestsRepository,
		PrismaQuestRewards,
		PrismaRewardsRepository,
		PrismaGoalsRepository,
		PrismaGoalRewardsRepository,
		PrismaNotificationsRepositoy,
	],
})
export class DatabaseModule {}
