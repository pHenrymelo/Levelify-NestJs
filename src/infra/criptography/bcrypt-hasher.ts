import type { HashComparator } from '@/domain/habbitTracker/application/criptography/hash-comparator';
import type { HashGenerator } from '@/domain/habbitTracker/application/criptography/hash-generator';
import { compare, hash } from 'bcryptjs';

export class BcryptHasher implements HashGenerator, HashComparator {
	private HASH_SALT_LENGHT = 8;

	async hash(plain: string): Promise<string> {
		return hash(plain, this.HASH_SALT_LENGHT);
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash);
	}
}
