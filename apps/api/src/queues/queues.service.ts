import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { QUEUE_NAMES, type QueueName } from './queue.names.js';
import { toRedisConnectionOptions } from '../common/cache/redis-connection.js';

@Injectable()
export class QueuesService implements OnModuleDestroy {
  private readonly queues = new Map<QueueName, Queue>();

  constructor(config: ConfigService) {
    const connection = toRedisConnectionOptions(
      config.getOrThrow<string>('REDIS_URL'),
    );

    for (const name of QUEUE_NAMES) {
      this.queues.set(name, new Queue(name, { connection }));
    }
  }

  get(name: QueueName): Queue {
    const queue = this.queues.get(name);

    if (!queue) {
      throw new Error(`Unknown queue: ${name}`);
    }

    return queue;
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all([...this.queues.values()].map((queue) => queue.close()));
  }
}
