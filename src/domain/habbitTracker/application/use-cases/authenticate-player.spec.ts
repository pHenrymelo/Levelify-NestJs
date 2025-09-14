import { FakeEncrypter } from 'test/criptography/fake-encypter';
import { FakeHasher } from 'test/criptography/fake-hasher';
import { MakePlayer } from 'test/factories/make-player';
import { InMemoryPlayersRepository } from 'test/repositories/in-memory-players-repository';
import { AuthenticatePlayerUseCase } from './authenticate-player';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let inMemoryPlayersRepository: InMemoryPlayersRepository;
let fakeHasher: FakeHasher;
let fakeEncypter: FakeEncrypter;
let sut: AuthenticatePlayerUseCase;

describe('Authenticate player use case tests', () => {
	beforeEach(() => {
		inMemoryPlayersRepository = new InMemoryPlayersRepository();
		fakeHasher = new FakeHasher();
		fakeEncypter = new FakeEncrypter();
		sut = new AuthenticatePlayerUseCase(
			inMemoryPlayersRepository,
			fakeHasher,
			fakeEncypter,
		);
	});

	it('Shoud be able authenticate a player', async () => {
		const player = MakePlayer({
			name: 'Jonny Test',
			email: 'jonny@test.com',
			password: await fakeHasher.hash('test-password'),
		});

		await inMemoryPlayersRepository.create(player);

		const result = await sut.execute({
			email: 'jonny@test.com',
			password: 'test-password',
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({ accessToken: expect.any(String) });
	});

	it('Shoud not be able authenticate a player with wrong email', async () => {
		const player = MakePlayer({
			name: 'Jonny Test',
			email: 'jonny@test.com',
			password: await fakeHasher.hash('test-password'),
		});

		await inMemoryPlayersRepository.create(player);

		const result = await sut.execute({
			email: 'wrongjonny@test.com',
			password: 'test-password',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(InvalidCredentialsError);
	});

	it('Shoud not be able authenticate a player with wrong password', async () => {
		const player = MakePlayer({
			name: 'Jonny Test',
			email: 'jonny@test.com',
			password: await fakeHasher.hash('test-password'),
		});

		await inMemoryPlayersRepository.create(player);

		const result = await sut.execute({
			email: 'jonny@test.com',
			password: 'wrong-test-password',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(InvalidCredentialsError);
	});
});
