import type { PlayersRepository } from '@/domain/habbitTracker/application/repositories/players-repository';
import type { Player } from '@/domain/habbitTracker/enterprise/entities/player';

export class InMemoryPlayersRepository implements PlayersRepository {
	public items: Player[] = [];

	async create(player: Player) {
		this.items.push(player);
	}

	async findByEmail(email: string) {
		const player = this.items.find((item) => item.email === email);

		if (!player) {
			return null;
		}

		return player;
	}
}
