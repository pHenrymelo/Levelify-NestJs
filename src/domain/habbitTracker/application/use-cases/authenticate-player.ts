import { type Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '../criptography/encrypter';
import { HashComparator } from '../criptography/hash-comparator';
import { PlayersRepository } from '../repositories/players-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticatePlayerUseCaseReplayer {
	email: string;
	password: string;
}

type AuthenticatePlayerUseCaseResponse = Either<
	InvalidCredentialsError,
	{
		accessToken: string;
	}
>;

@Injectable()
export class AuthenticatePlayerUseCase {
	constructor(
		private playersRepository: PlayersRepository,
		private hashComparator: HashComparator,
		private encrypter: Encrypter,
	) {}

	async execute({
		email,
		password,
	}: AuthenticatePlayerUseCaseReplayer): Promise<AuthenticatePlayerUseCaseResponse> {
		const player = await this.playersRepository.findByEmail(email);

		if (!player) {
			return left(new InvalidCredentialsError());
		}

		const isPasswordValid = await this.hashComparator.compare(
			password,
			player.password,
		);

		if (!isPasswordValid) {
			return left(new InvalidCredentialsError());
		}

		const accessToken = await this.encrypter.encrypt({
			sub: player.id.toString(),
		});

		return right({ accessToken });
	}
}
