import type { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import type { Notification } from '@/domain/notification/enterprise/entities/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepositoy implements NotificationsRepository {
	findById(id: string): Promise<Notification | null> {
		throw new Error('Method not implemented.');
	}
	create(notification: Notification): Promise<void> {
		throw new Error('Method not implemented.');
	}
	save(notification: Notification): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
