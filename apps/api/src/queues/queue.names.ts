export const QUEUE_NAMES = [
  'bookings',
  'tasks',
  'notifications',
  'payments',
  'outbox',
] as const;

export type QueueName = (typeof QUEUE_NAMES)[number];
