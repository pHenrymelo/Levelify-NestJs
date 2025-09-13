import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { Quest } from '../../enterprise/entities/quest';

export abstract class QuestsRepository {
	abstract findById(id: string): Promise<Quest | null>;
	abstract findBySlug(slug: string): Promise<Quest | null>;
	abstract findManyPriority(params: PaginationParams): Promise<Quest[]>;
	abstract create(quest: Quest): Promise<void>;
	abstract delete(quest: Quest): Promise<void>;
	abstract save(quest: Quest): Promise<void>;
}
