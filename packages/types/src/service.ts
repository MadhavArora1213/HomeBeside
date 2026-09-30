export type ServiceId = string;

export type ServiceCategory =
  | "ELDERLY_CARE"
  | "CHILD_CARE"
  | "MEDICAL_SUPPORT"
  | "HOUSEHOLD_SUPPORT"
  | "COMPANIONSHIP"
  | "TRANSPORT"
  | "OTHER";

export type ServiceStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "RETIRED";
