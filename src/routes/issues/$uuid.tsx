import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/ui/loader";
import { BloodDonationIssueCard } from "@/features/issues/blood-donation/components/issue-card";
import { getIssueDetail } from "@/features/issues/actions";
import { LostAndFoundIssueCard } from "@/features/issues/lost-and-found/components/issue-card";

export const Route = createFileRoute("/issues/$uuid")({
  component: RouteComponent,
  loader: ({ params, context: { queryClient } }) => {
    queryClient.ensureQueryData({
      queryKey: ["issue", params.uuid],
      queryFn: () => getIssueDetail(params.uuid),
    });
  },
});

function RouteComponent() {
  const { uuid } = Route.useParams();
  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", uuid],
    queryFn: () => getIssueDetail(uuid),
  });
  if (isLoading) {
    return <Loader />;
  }

  if (!issue) {
    return (
      <div className="flex h-full min-h-96 w-full items-center justify-center">
        <p className="text-lg text-muted-foreground">Issue not found</p>
      </div>
    );
  }

  if (issue.category === "blood_donation") {
    return <BloodDonationIssueCard issue={issue} />;
  } else {
    return <LostAndFoundIssueCard issue={issue} />;
  }
}
