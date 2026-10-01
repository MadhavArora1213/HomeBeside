import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { CacheModule } from './common/cache/cache.module.js';
import { RateLimitGuard } from './common/guards/rate-limit.guard.js';
import { PrismaModule } from './common/prisma/prisma.module.js';
import { EventsModule } from './events/events.module.js';
import { QueuesModule } from './queues/queues.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
      cache: true,
    }),
    PrismaModule,
    CacheModule,
    EventsModule,
    QueuesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: RateLimitGuard },
  ],
})
export class AppModule {}
