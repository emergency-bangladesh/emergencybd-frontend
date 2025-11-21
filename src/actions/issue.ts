import * as v from "valibot";
import { fetchBackend } from "@/lib/fetch-backend";
import {
  type IssueDetail,
  type IssueSummary,
  issueDetailSchema,
  issueSummarySchema,
} from "@/schemas/issue";
export type { Issue, IssueDetail, IssueSummary } from "@/schemas/issue";

export async function getIssues(): Promise<{
  issues: Array<IssueSummary>;
  has_more: boolean;
}> {
  const res = await fetchBackend("/issues", "GET");
  const data = await res.json();
  const issues = v.parse(v.array(issueSummarySchema), data.data.issues);
  return { issues, has_more: data.data.has_more };
}

export async function getIssue(uuid: string): Promise<IssueDetail> {
  const res = await fetchBackend(`/issues/${uuid}`, "GET");
  const data = await res.json();
  return v.parse(issueDetailSchema, data.data);
}
