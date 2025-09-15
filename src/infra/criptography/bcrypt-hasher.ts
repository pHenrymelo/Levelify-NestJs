import { compare, hash } from 'bcryptjs';
import { HashComparator } from '@/domain/habbitTracker/application/criptography/hash-comparator';
import { HashGenerator } from '@/domain/habbitTracker/application/criptography/hash-generator';

export class BcryptHasher implements HashGenerator, HashComparator {
	private HASH_SALT_LENGHT = 8;

	async hash(plain: string): Promise<string> {
		return hash(plain, this.HASH_SALT_LENGHT);
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash);
	}
}
