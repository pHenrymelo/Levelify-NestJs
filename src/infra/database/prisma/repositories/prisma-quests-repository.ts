import { Injectable } from '@nestjs/common';
import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { QuestsRepository } from '@/domain/habbitTracker/application/repositories/quests-repository';
import type { Quest } from '@/domain/habbitTracker/enterprise/entities/quest';
import { PrismaQuestMapper } from '../mappers/prisma-quest-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaQuestsRepository implements QuestsRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: string) {
		const quest = await this.prisma.quest.findUnique({
			where: {
				id,
			},
		});

		if (!quest) {
			return null;
		}

		return PrismaQuestMapper.toDomain(quest);
	}

	async findBySlug(slug: string) {
		const quest = await this.prisma.quest.findUnique({
			where: {
				slug,
			},
		});

		if (!quest) {
			return null;
		}

		return PrismaQuestMapper.toDomain(quest);
	}

	async findManyPriority({ page }: PaginationParams) {
		const quests = this.prisma.quest.findMany({
			orderBy: {
				dueDate: 'asc',
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return (await quests).map((quest) => PrismaQuestMapper.toDomain(quest));
	}

	async create(quest: Quest) {
		const data = PrismaQuestMapper.toPersistance(quest);

		await this.prisma.quest.create({
			data,
		});
	}

	async delete(quest: Quest): Promise<void> {
		const data = PrismaQuestMapper.toPersistance(quest);

		await this.prisma.quest.delete({
			where: {
				id: data.id,
			},
		});
	}

	async save(quest: Quest) {
		const data = PrismaQuestMapper.toPersistance(quest);

		await this.prisma.quest.update({
			where: {
				id: data.id,
			},
			data,
		});
	}
}
