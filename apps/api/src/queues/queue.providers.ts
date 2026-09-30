import type { Provider } from '@nestjs/common';
import { QUEUE_NAMES } from './queue.names.js';
import { QueuesService } from './queues.service.js';

export const queueProviders: Provider[] = [
  QueuesService,
  ...QUEUE_NAMES.map((name) => ({
    provide: name,
    inject: [QueuesService],
    useFactory: (service: QueuesService) => service.get(name),
  })),
];
