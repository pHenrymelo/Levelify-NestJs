import { FakeHasher } from 'test/criptography/fake-hasher';
import { MakePlayer } from 'test/factories/make-player';
import { InMemoryPlayersRepository } from 'test/repositories/in-memory-players-repository';
import { PlayerAlreadyExistsError } from './errors/player-already-exists-error';
import { RegisterPlayerUseCase } from './register-player';

let inMemoryPlayersRepository: InMemoryPlayersRepository;
let fakeHasher: FakeHasher;
let sut: RegisterPlayerUseCase;

describe('Register player use case tests', () => {
	beforeEach(() => {
		inMemoryPlayersRepository = new InMemoryPlayersRepository();
		fakeHasher = new FakeHasher();
		sut = new RegisterPlayerUseCase(inMemoryPlayersRepository, fakeHasher);
	});

	it('Shoud be able register a player', async () => {
		const result = await sut.execute({
			name: 'Jonny Test',
			email: 'jonny@test.com',
			password: 'test-password',
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			player: inMemoryPlayersRepository.items[0],
		});
	});

	it('Shoud hash player password on register', async () => {
		const result = await sut.execute({
			name: 'Jonny Test',
			email: 'jonny@test.com',
			password: 'test-password',
		});

		const hashedPassword = await fakeHasher.hash('test-password');

		expect(result.isRight()).toBe(true);
		expect(inMemoryPlayersRepository.items[0].password).toEqual(hashedPassword);
	});

	it('Shoud not be able register a player with same email from another player', async () => {
		const player = MakePlayer({
			email: 'jonny@test.com',
		});

		await inMemoryPlayersRepository.create(player);

		const result = await sut.execute({
			name: 'Jonny Test',
			email: 'jonny@test.com',
			password: 'test-password',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(PlayerAlreadyExistsError);
	});
});
