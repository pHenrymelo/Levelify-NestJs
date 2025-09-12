import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestController } from './controllers/create-quest.controller';
import { FetchPriorityQuestsController } from './controllers/fetch-quests.controller';

@Module({
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestController,
		FetchPriorityQuestsController,
	],
	providers: [PrismaService],
})
export class HttpModule {}
