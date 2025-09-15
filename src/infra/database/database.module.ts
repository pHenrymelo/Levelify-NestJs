import { PlayersRepository } from '@/domain/habbitTracker/application/repositories/players-repository';
import { QuestsRepository } from '@/domain/habbitTracker/application/repositories/quests-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaGoalRewardsRepository } from './prisma/repositories/prisma-goal-rewards-repository';
import { PrismaGoalsRepository } from './prisma/repositories/prisma-goals-repository';
import { PrismaNotificationsRepositoy } from './prisma/repositories/prisma-notification-repository';
import { PrismaPlayersRepository } from './prisma/repositories/prisma-players-repository';
import { PrismaQuestRewards } from './prisma/repositories/prisma-quest-reward-reporitory';
import { PrismaQuestsRepository } from './prisma/repositories/prisma-quests-repository';
import { PrismaRewardsRepository } from './prisma/repositories/prisma-rewards-repository';

@Module({
	providers: [
		PrismaService,
		{
			provide: QuestsRepository,
			useClass: PrismaQuestsRepository,
		},
		{
			provide: PlayersRepository,
			useClass: PrismaPlayersRepository,
		},
		PrismaQuestRewards,
		PrismaRewardsRepository,
		PrismaGoalsRepository,
		PrismaGoalRewardsRepository,
		PrismaNotificationsRepositoy,
	],
	exports: [
		PrismaService,
		QuestsRepository,
		PlayersRepository,
		PrismaQuestRewards,
		PrismaRewardsRepository,
		PrismaGoalsRepository,
		PrismaGoalRewardsRepository,
		PrismaNotificationsRepositoy,
	],
})
export class DatabaseModule {}
