export type FamilyId = string;

export type FamilyStatus = "PROSPECTIVE" | "ACTIVE" | "SUSPENDED" | "ARCHIVED";

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};
