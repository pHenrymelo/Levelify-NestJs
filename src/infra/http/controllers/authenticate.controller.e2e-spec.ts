import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/prisma/prisma.service';

describe('Authenticate (e2e) tests', () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		prisma = moduleRef.get(PrismaService);
		await app.init();
	});

	test('[POST] /sessions', async () => {
		await prisma.user.create({
			data: {
				name: 'Jonny Test',
				email: 'jonny@test.com',
				password: await hash('testpassword', 8),
			},
		});

		const response = await request(app.getHttpServer()).post('/sessions').send({
			email: 'jonny@test.com',
			password: 'testpassword',
		});

		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			access_token: expect.any(String),
		});
	});
});
