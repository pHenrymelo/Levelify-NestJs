import { Injectable } from '@nestjs/common';
import type { PlayersRepository } from '@/domain/habbitTracker/application/repositories/players-repository';
import type { Player } from '@/domain/habbitTracker/enterprise/entities/player';
import { PrismaPlayerMapper } from '../mappers/prisma-player-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPlayersRepository implements PlayersRepository {
	constructor(private prisma: PrismaService) {}

	async create(player: Player): Promise<void> {
		const data = PrismaPlayerMapper.toPersistance(player);

		await this.prisma.user.create({
			data,
		});
	}

	async findByEmail(email: string) {
		const player = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!player) {
			return null;
		}

		return PrismaPlayerMapper.toDomain(player);
	}
}
