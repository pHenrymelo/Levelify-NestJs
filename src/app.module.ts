import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestController } from './controllers/create-quest.controller';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestController,
	],
	providers: [PrismaService, JwtStrategy],
})
export class AppModule {}
