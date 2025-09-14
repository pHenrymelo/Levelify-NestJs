import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Fetch quests (e2e) tests', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let jwt: JwtService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		prisma = moduleRef.get(PrismaService);
		jwt = moduleRef.get(JwtService);

		await app.init();
	});

	test('[GET] /quests', async () => {
		const user = await prisma.user.create({
			data: {
				name: 'Jonny Test',
				email: 'jonny@test.com',
				password: 'testpassword',
			},
		});

		const accessToken = jwt.sign({ sub: user.id });

		await prisma.quest.createMany({
			data: [
				{
					title: 'quest-1',
					slug: 'quest-1',
					description: 'description-1',
					playerId: user.id,
				},
				{
					title: 'quest-2',
					slug: 'quest-2',
					description: 'description-2',
					playerId: user.id,
				},
				{
					title: 'quest-3',
					slug: 'quest-3',
					description: 'description-3',
					playerId: user.id,
				},
			],
		});

		const response = await request(app.getHttpServer())
			.get('/quests')
			.set('Authorization', `Bearer ${accessToken}`)
			.send();

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			quests: [
				expect.objectContaining({ title: 'quest-1' }),
				expect.objectContaining({ title: 'quest-2' }),
				expect.objectContaining({ title: 'quest-3' }),
			],
		});
	});
});
