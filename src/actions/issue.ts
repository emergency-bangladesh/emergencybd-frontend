import * as v from "valibot";
import { fetchBackend } from "@/lib/fetch-backend";
import {
  type Issue,
  issueSummarySchema,
  bloodDonationIssueSchema,
  lostAndFoundIssueSchema,
} from "@/schemas/issue";
export type { Issue } from "@/schemas/issue";

export async function getIssues(): Promise<{
  issues: Array<Issue>;
  has_more: boolean;
}> {
  const res = await fetchBackend("/issues", "GET");
  const data = await res.json();
  const issues = v.parse(v.array(issueSummarySchema), data.data.issues);
  return { issues, has_more: data.data.has_more };
}

export async function getIssueDetail(uuid: string) {
  const res = await fetchBackend(`/issues/${uuid}`, "GET");
  const data = await res.json();
  return v.parse(issueSummarySchema, data.data);
}

export async function getBloodDonationIssueDetails(uuid: string) {
  const res = await fetchBackend(`/issues/blood_donation/${uuid}`, "GET");
  const data = await res.json();
  return v.parse(bloodDonationIssueSchema, data.data);
}

export async function getLostAndFoundIssueDetails(uuid: string) {
  const res = await fetchBackend(`/issues/lost_and_found/${uuid}`, "GET");
  const data = await res.json();
  return v.parse(lostAndFoundIssueSchema, data.data);
}
