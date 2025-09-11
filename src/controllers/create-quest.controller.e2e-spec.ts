import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create account (e2e) tests', () => {
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

	test('[POST] /quests', async () => {
		const user = await prisma.user.create({
			data: {
				name: 'Jonny Test',
				email: 'jonny@test.com',
				password: 'testpassword',
			},
		});

		const accessToken = jwt.sign({ sub: user.id });

		const response = await request(app.getHttpServer())
			.post('/quests')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				title: 'the test quest',
				goal: 'test quest goal',
			});

		expect(response.statusCode).toBe(201);

		const questOnDatabase = await prisma.quest.findUnique({
			where: {
				slug: 'the-test-quest',
			},
		});

		expect(questOnDatabase).toBeTruthy();
	});
});
