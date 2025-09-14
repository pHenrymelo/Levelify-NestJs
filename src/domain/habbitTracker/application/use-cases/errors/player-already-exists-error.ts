import type { UseCaseError } from '@/core/errors/use-case-error';

export class PlayerAlreadyExistsError extends Error implements UseCaseError {
	constructor(identifier: string) {
		super(`The player "${identifier}" already exists in the system.`);
	}
}
