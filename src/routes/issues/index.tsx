import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getIssues } from "@/actions/issue";
import { BloodDonationIssueCard } from "@/components/blood-donation-issue-card";
import { LostAndFoundIssueCard } from "@/components/lost-and-found-issue-card";
import { Loader } from "@/components/ui/loader";
import { useLanguage } from "@/integrations/language/use-language";

export const Route = createFileRoute("/issues/")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({
      queryKey: ["issues"],
      queryFn: getIssues,
    });
  },
});

const message = {
  en: "No issues found",
  bn: "দেখানোর মত কিছু পাওয়া যায় নাই",
};

function RouteComponent() {
  const { language } = useLanguage();
  const { data, isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  if (isLoading) return <Loader />;

  if (!data || data.issues.length === 0) {
    return <div className="text-center">{message[language]}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {data.issues.map((issue) => {
        console.log(issue);
        if (issue.category === "blood_donation") {
          return <BloodDonationIssueCard key={issue.issueUuid} issue={issue} />;
        } else
          return <LostAndFoundIssueCard key={issue.issueUuid} issue={issue} />;
      })}
    </div>
  );
}
