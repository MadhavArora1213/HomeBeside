import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'node:events';
import type { DomainEvent } from './domain-event.js';

export type DomainEventListener = (event: DomainEvent) => void;

@Injectable()
export class EventsService {
  private readonly emitter = new EventEmitter();

  constructor() {
    this.emitter.setMaxListeners(0);
  }

  publish(event: DomainEvent): void {
    this.emitter.emit(event.eventType, event);
    this.emitter.emit('*', event);
  }

  subscribe(eventType: string, listener: DomainEventListener): void {
    this.emitter.on(eventType, listener);
  }

  unsubscribe(eventType: string, listener: DomainEventListener): void {
    this.emitter.off(eventType, listener);
  }
}
