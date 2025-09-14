import type { Quest } from '@/domain/habbitTracker/enterprise/entities/quest';

export class QuestPresenter {
	static toHTTP(quest: Quest) {
		return {
			id: quest.id.toString(),
			title: quest.title,
			slug: quest.slug.value,
			dueDate: quest.dueDate,
			createdAt: quest.createdAt,
			updatedAt: quest.updatedAt,
		};
	}
}
