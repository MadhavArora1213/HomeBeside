import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { queueProviders } from './queue.providers.js';
import { QUEUE_NAMES } from './queue.names.js';
import { QueuesService } from './queues.service.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: queueProviders,
  exports: [QueuesService, ...QUEUE_NAMES],
})
export class QueuesModule {}
