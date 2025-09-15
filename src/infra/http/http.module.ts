import { Module } from '@nestjs/common';
import { AuthenticatePlayerUseCase } from '@/domain/habbitTracker/application/use-cases/authenticate-player';
import { CreateQuestUseCase } from '@/domain/habbitTracker/application/use-cases/create-quest';
import { FetchPriorityQuestsUseCase } from '@/domain/habbitTracker/application/use-cases/fetch-priority-quests';
import { RegisterPlayerUseCase } from '@/domain/habbitTracker/application/use-cases/register-player';
import { CriptographyModule } from '../criptography/criptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestController } from './controllers/create-quest.controller';
import { FetchPriorityQuestsController } from './controllers/fetch-quests.controller';

@Module({
	imports: [DatabaseModule, CriptographyModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestController,
		FetchPriorityQuestsController,
	],
	providers: [
		CreateQuestUseCase,
		FetchPriorityQuestsUseCase,
		AuthenticatePlayerUseCase,
		RegisterPlayerUseCase,
	],
})
export class HttpModule {}
