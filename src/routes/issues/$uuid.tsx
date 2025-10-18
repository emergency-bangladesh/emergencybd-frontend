import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { Issue } from "@/types/issue";
import { BloodDonationIssueCard } from "@/components/blood-donation-issue-card";
import { LostAndFoundIssueCard } from "@/components/lost-and-found-issue-card";
import { Loader } from "@/components/ui/loader";
import { fetchBackend } from "@/lib/fetch-backend";

export const Route = createFileRoute("/issues/$uuid")({
  component: RouteComponent,
  loader: ({ params, context: { queryClient } }) => {
    queryClient.ensureQueryData({
      queryKey: ["issue", params.uuid],
      queryFn: async () => {
        const res = await fetchBackend(`/issues/${params.uuid}`, "GET");
        const data = await res.json();
        return data.data;
      },
    });
  },
});

function RouteComponent() {
  const { uuid } = Route.useParams();
  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", uuid],
    queryFn: async () => {
      const res = await fetchBackend(`/issues/${uuid}`, "GET");
      const data = await res.json();
      return data.data as Issue;
    },
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
