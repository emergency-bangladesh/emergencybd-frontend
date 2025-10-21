import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BloodDonationIssueCard } from "@/components/blood-donation-issue-card";
import { LostAndFoundIssueCard } from "@/components/lost-and-found-issue-card";
import { Loader } from "@/components/ui/loader";
import { useLanguage } from "@/integrations/language/use-language";
import { fetchBackend } from "@/lib/fetch-backend";
import type { Issue } from "@/types/issue";

export const Route = createFileRoute("/issues/")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({
      queryKey: ["issues"],
      queryFn: async () => {
        const res = await fetchBackend("/issues", "GET");
        const data = await res.json();
        return data.data as { issues: Array<Issue>; has_more: boolean };
      },
    });
  },
});

function RouteComponent() {
  const { language } = useLanguage();
  const { data, isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await fetchBackend("/issues", "GET");
      const issue_data = await res.json();
      return issue_data.data as { issues: Array<Issue>; has_more: boolean };
    },
  });

  if (isLoading) return <Loader />;

  if (!data || data.issues.length === 0) {
    return (
      <div className="text-center">
        {language === "en" && "No issues found"}
        {language === "bn" && "দেখানোর মত কিছুই নাই"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {data.issues.map((issue) => {
        if (issue.category === "blood_donation")
          return <BloodDonationIssueCard key={issue.uuid} issue={issue} />;
        else return <LostAndFoundIssueCard key={issue.uuid} issue={issue} />;
      })}
    </div>
  );
}
