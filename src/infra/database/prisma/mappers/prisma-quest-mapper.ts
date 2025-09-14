import type { Prisma, Quest as PrismaQuest } from '@prisma/client';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Quest } from '@/domain/habbitTracker/enterprise/entities/quest';
import { Slug } from '@/domain/habbitTracker/enterprise/entities/value-objects/slug';

export class PrismaQuestMapper {
	static toDomain(raw: PrismaQuest): Quest {
		return Quest.create(
			{
				title: raw.title,
				description: raw.description,
				playerId: new UniqueEntityID(raw.playerId),
				dueDate: raw.dueDate,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				slug: Slug.create(raw.slug),
				completed: raw.completed,
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPersistance(quest: Quest): Prisma.QuestUncheckedCreateInput {
		return {
			id: quest.id.toString(),
			playerId: quest.playerId.toString(),
			title: quest.title,
			description: quest.description,
			slug: quest.slug.value,
			completed: quest.completed,
			createdAt: quest.createdAt,
			updatedAt: quest.updatedAt,
			dueDate: quest.dueDate,
		};
	}
}
