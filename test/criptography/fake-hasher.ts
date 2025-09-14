import type { HashComparator } from '@/domain/habbitTracker/application/criptography/hash-comparator';
import type { HashGenerator } from '@/domain/habbitTracker/application/criptography/hash-generator';

export class FakeHasher implements HashGenerator, HashComparator {
	async hash(plain: string) {
		return plain.split('').reduce((reversed, char) => char + reversed, '');
	}
	async compare(plain: string, hash: string) {
		return (
			plain.split('').reduce((reversed, char) => char + reversed, '') === hash
		);
	}
}
