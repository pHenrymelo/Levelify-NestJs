import { Module } from '@nestjs/common';

import { Encrypter } from '@/domain/habbitTracker/application/criptography/encrypter';
import { HashComparator } from '@/domain/habbitTracker/application/criptography/hash-comparator';
import { HashGenerator } from '@/domain/habbitTracker/application/criptography/hash-generator';

import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
	providers: [
		{
			provide: Encrypter,
			useClass: JwtEncrypter,
		},
		{
			provide: HashGenerator,
			useClass: BcryptHasher,
		},
		{
			provide: HashComparator,
			useClass: BcryptHasher,
		},
	],
	exports: [Encrypter, HashComparator, HashGenerator],
})
export class CriptographyModule {}
