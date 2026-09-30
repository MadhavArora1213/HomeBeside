export type NotificationId = string;

export type NotificationChannel =
  "IN_APP" | "EMAIL" | "SMS" | "WHATSAPP" | "PUSH";

export type NotificationStatus =
  "QUEUED" | "SENT" | "DELIVERED" | "FAILED" | "READ";
