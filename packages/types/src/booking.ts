export type BookingId = string;

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "SEARCHING_HELPER"
  | "HELPER_ASSIGNED"
  | "HELPER_ACCEPTED"
  | "EN_ROUTE"
  | "ARRIVED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED"
  | "NO_SHOW"
  | "REASSIGNING"
  | "DISPUTED"
  | "INCIDENT_REVIEW";

export type BookingCancellationReason =
  | "FAMILY_REQUEST"
  | "HELPER_REQUEST"
  | "HELPER_UNAVAILABLE"
  | "PAYMENT_FAILED"
  | "OPERATOR_DECISION"
  | "OTHER";
