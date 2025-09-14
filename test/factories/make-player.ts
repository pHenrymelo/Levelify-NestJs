import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Player,
	type PlayerProps,
} from '@/domain/habbitTracker/enterprise/entities/player';
import { faker } from '@faker-js/faker';

export function MakePlayer(
	overide: Partial<PlayerProps> = {},
	id?: UniqueEntityID,
) {
	const player = Player.create(
		{
			name: faker.person.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			job: faker.person.jobTitle(),
			level: 1,
			title: faker.music.songName(),
			...overide,
		},
		id,
	);

	return player;
}
