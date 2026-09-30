export type PaymentId = string;

export type PaymentStatus =
  | "PENDING"
  | "AUTHORIZED"
  | "CAPTURED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export type RefundStatus = "REQUESTED" | "APPROVED" | "REJECTED" | "PROCESSED";
