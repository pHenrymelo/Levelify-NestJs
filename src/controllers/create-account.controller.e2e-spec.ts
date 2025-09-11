import { AppModule } from '@/app.module';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create account (e2e) tests', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	test('[POST] /accounts', async () => {
		const response = await request(app.getHttpServer()).post('/accounts').send({
			name: 'Jonny Test',
			email: 'jonny@test.com',
			password: 'testpassword',
		});

		expect(response.statusCode).toBe(201);
	});
});
