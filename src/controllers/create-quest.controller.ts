import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/quests')
@UseGuards(JwtAuthGuard)
export class CreateQuestController {
	constructor() {}

	@Post()
	async handle() {
		return 'ok';
	}
}
