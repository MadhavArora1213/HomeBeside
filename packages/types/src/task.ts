export type TaskId = string;

export type TaskStatus =
  | "REQUESTED"
  | "OFFERED"
  | "ACCEPTED"
  | "EN_ROUTE"
  | "ARRIVED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DECLINED"
  | "EXPIRED"
  | "REASSIGNING"
  | "NO_SHOW"
  | "PARTIAL"
  | "FAILED"
  | "CANCELLED"
  | "DISPUTED";
