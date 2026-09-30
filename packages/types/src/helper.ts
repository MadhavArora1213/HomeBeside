export type HelperId = string;

export type HelperStatus =
  | "APPLIED"
  | "IN_REVIEW"
  | "ONBOARDED"
  | "ACTIVE"
  | "PAUSED"
  | "REJECTED"
  | "REMOVED";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";
