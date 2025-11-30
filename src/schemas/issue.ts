import * as v from "valibot";
import { ISSUE_STATUS } from "@/constants";
import { parseDateFromUtc } from "@/lib/utils";

// Base schema for summary (list view)
export const issueSummarySchema = v.pipe(
  v.object({
    uuid: v.string(),
    status: v.picklist(ISSUE_STATUS),
    created_at: v.string(),
    last_updated: v.string(),
    account_uuid: v.string(),
    emergency_phone_number: v.string(),
    category: v.picklist(["blood_donation", "lost_and_found"]),
  }),
  v.transform((input) => ({
    issueUuid: input.uuid,
    status: input.status,
    createdAt: parseDateFromUtc(input.created_at),
    lastUpdated: parseDateFromUtc(input.last_updated),
    accountUuid: input.account_uuid,
    emergencyPhoneNumber: input.emergency_phone_number,
    category: input.category,
  })),
);

export type Issue = v.InferOutput<typeof issueSummarySchema>;

// Detailed schemas
const baseDetailSchema = v.object({
  issue_uuid: v.string(),
  status: v.picklist(ISSUE_STATUS),
  created_at: v.string(),
  last_updated: v.string(),
  account_uuid: v.string(),
  phone_number: v.string(),
  emergency_phone_number: v.string(),
  email_address: v.string(),
});

export const bloodDonationIssueSchema = v.pipe(
  v.object({
    ...baseDetailSchema.entries,
    category: v.literal("blood_donation"),
    patient_name: v.string(),
    blood_group: v.string(),
    amount_bag: v.number(),
    hospital_name: v.string(),
    district: v.string(),
    upazila: v.string(),
    instructions: v.optional(v.nullable(v.string())),
    contact_person_name: v.string(),
  }),
  v.transform((input) => ({
    issueUuid: input.issue_uuid,
    status: input.status,
    createdAt: new Date(input.created_at),
    lastUpdated: new Date(input.last_updated),
    accountUuid: input.account_uuid,
    phoneNumber: input.phone_number,
    emergencyPhoneNumber: input.emergency_phone_number,
    emailAddress: input.email_address,
    category: input.category,
    patientName: input.patient_name,
    bloodGroup: input.blood_group,
    amountBag: input.amount_bag,
    hospitalName: input.hospital_name,
    district: input.district,
    upazila: input.upazila,
    instructions: input.instructions,
    contactPersonName: input.contact_person_name,
  })),
);

export const lostAndFoundIssueSchema = v.pipe(
  v.object({
    ...baseDetailSchema.entries,
    category: v.literal("lost_and_found"),
    name_of_person: v.string(),
    age: v.number(),
    last_seen_location: v.string(),
    details: v.string(),
    district: v.string(),
    upazila: v.string(),
    blood_group: v.optional(v.nullable(v.string())),
    occupation: v.optional(v.nullable(v.string())),
    contact_person_name: v.string(),
  }),
  v.transform((input) => ({
    issueUuid: input.issue_uuid,
    status: input.status,
    createdAt: new Date(input.created_at),
    lastUpdated: new Date(input.last_updated),
    accountUuid: input.account_uuid,
    phoneNumber: input.phone_number,
    emergencyPhoneNumber: input.emergency_phone_number,
    emailAddress: input.email_address,
    category: input.category,
    nameOfPerson: input.name_of_person,
    age: input.age,
    lastSeenLocation: input.last_seen_location,
    details: input.details,
    district: input.district,
    upazila: input.upazila,
    bloodGroup: input.blood_group,
    occupation: input.occupation,
    contactPersonName: input.contact_person_name,
  })),
);
