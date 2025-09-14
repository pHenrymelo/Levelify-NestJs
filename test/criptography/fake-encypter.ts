import type { Encrypter } from '@/domain/habbitTracker/application/criptography/encrypter';

export class FakeEncrypter implements Encrypter {
	async encrypt(payload: Record<string, unknown>) {
		return JSON.stringify(payload);
	}
}
