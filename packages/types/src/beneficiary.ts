export type BeneficiaryId = string;

export type BeneficiaryStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export type CareConsent = {
  beneficiaryId: string;
  grantedTo: string[];
  validFrom: string;
  validUntil?: string;
};
