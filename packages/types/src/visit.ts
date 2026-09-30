export type VisitId = string;

export type VisitStatus = "SCHEDULED" | "STARTED" | "COMPLETED" | "MISSED";

export type VisitEvidence = {
  visitId: string;
  type: "CHECK_IN" | "CHECK_OUT" | "NOTE" | "PHOTO";
  recordedAt: string;
  recordedBy: string;
};
