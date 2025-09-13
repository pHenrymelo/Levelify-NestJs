import { CreateQuestUseCase } from '@/domain/habbitTracker/application/use-cases/create-quest';
import { Module } from '@nestjs/common';
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
	providers: [CreateQuestUseCase],
})
export class HttpModule {}
