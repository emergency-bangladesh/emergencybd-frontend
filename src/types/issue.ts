export type IssueStatus = "open" | "working" | "solved" | "invalid";

export interface Issue {
  uuid: string;
  status: IssueStatus;
  createdAt: Date;
  lastUpdated: Date;
  category: "lost_and_found" | "blood_donation";
  emergency_phone_number: string;
}

export interface BloodDonationIssue {
  issueUuid: string;
  status: IssueStatus;
  createdAt: Date;
  lastUpdated: Date;
  accountUuid: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  emailAddress: string;
  category: "blood_donation";
  patientName: string;
  contactPersonName: string;
  bloodGroup: string;
  amountBag: number;
  hospitalName: string;
  district: string;
  upazila: string;
  instructions?: string | null;
}

export interface LostAndFoundIssue {
  issueUuid: string;
  status: IssueStatus;
  createdAt: Date;
  lastUpdated: Date;
  accountUuid: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  emailAddress: string;
  category: "lost_and_found";
  nameOfPerson: string;
  age: number;
  lastSeenLocation: string;
  details: string;
  district: string;
  upazila: string;
  bloodGroup?: string | null;
  occupation?: string | null;
  contactPersonName: string;
}
