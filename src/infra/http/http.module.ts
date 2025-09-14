import { Module } from '@nestjs/common';
import { CreateQuestUseCase } from '@/domain/habbitTracker/application/use-cases/create-quest';
import { FetchPriorityQuestsUseCase } from '@/domain/habbitTracker/application/use-cases/fetch-priority-quests';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestController } from './controllers/create-quest.controller';
import { FetchPriorityQuestsController } from './controllers/fetch-quests.controller';

@Module({
	imports: [DatabaseModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestController,
		FetchPriorityQuestsController,
	],
	providers: [CreateQuestUseCase, FetchPriorityQuestsUseCase],
})
export class HttpModule {}
