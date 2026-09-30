export interface DomainEvent<TPayload = unknown> {
  eventId: string;
  eventType: string;
  aggregateType: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt: Date;
  metadata?: Record<string, string>;
}
