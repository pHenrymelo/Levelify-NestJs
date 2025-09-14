import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';

export interface PlayerProps {
	name: string;
	email: string;
	password: string;
	level: number;
	title: string;
	job: string;
}

export class Player extends Entity<PlayerProps> {
	static create(
		props: Optional<PlayerProps, 'level' | 'title' | 'job'>,
		id?: UniqueEntityID,
	) {
		const player = new Player(
			{
				...props,
				title: props.title ?? 'none',
				job: props.job ?? 'none',
				level: props.level ?? 1,
			},
			id,
		);

		return player;
	}

	public get name() {
		return this.props.name;
	}

	public get email() {
		return this.props.email;
	}

	public get password() {
		return this.props.password;
	}

	public get level() {
		return this.props.level;
	}

	public get title() {
		return this.props.title;
	}

	public get job() {
		return this.props.job;
	}

	public set title(title: string) {
		this.props.title = title;
	}

	public set job(job: string) {
		this.props.job = job;
	}

	public levelUp() {
		this.props.level += 1;
	}
}
