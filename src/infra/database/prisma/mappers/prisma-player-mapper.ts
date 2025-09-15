import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Player } from '@/domain/habbitTracker/enterprise/entities/player';
import type { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaPlayerMapper {
	static toDomain(raw: PrismaUser): Player {
		return Player.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.password,
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPersistance(player: Player): Prisma.UserUncheckedCreateInput {
		return {
			id: player.id.toString(),
			name: player.name,
			email: player.email,
			password: player.password,
		};
	}
}
