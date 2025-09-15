import { type Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Player } from '../../enterprise/entities/player';
import { HashGenerator } from '../criptography/hash-generator';
import { PlayersRepository } from '../repositories/players-repository';
import { PlayerAlreadyExistsError } from './errors/player-already-exists-error';

interface RegisterPlayerUseCaseReplayer {
	name: string;
	email: string;
	password: string;
}

type RegisterPlayerUseCaseResponse = Either<
	PlayerAlreadyExistsError,
	{
		player: Player;
	}
>;

@Injectable()
export class RegisterPlayerUseCase {
	constructor(
		private playersRepository: PlayersRepository,
		private hashGenerator: HashGenerator,
	) {}

	async execute({
		name,
		email,
		password,
	}: RegisterPlayerUseCaseReplayer): Promise<RegisterPlayerUseCaseResponse> {
		const playerWithSameEmail = await this.playersRepository.findByEmail(email);

		if (playerWithSameEmail) {
			return left(new PlayerAlreadyExistsError(email));
		}

		const hashedPassword = await this.hashGenerator.hash(password);

		const player = Player.create({
			name,
			email,
			password: hashedPassword,
		});

		await this.playersRepository.create(player);

		return right({ player });
	}
}
