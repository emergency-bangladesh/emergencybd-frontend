import {
  IconBan,
  IconCalendar,
  IconCircleCheck,
  IconLocationPin,
  IconMail,
  IconUsers,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { fetchBackend } from "@/lib/fetch-backend";
import { parseDateFromUtc } from "@/lib/utils";
import {
  useVolunteerQuery,
  volunteerQueryOptions,
} from "@/queries/use-volunteer-query";

export const Route = createFileRoute("/volunteer/$uuid")({
  component: VolunteerProfilePage,
  loader: ({ params, context: { queryClient } }) => {
    const uuid = params.uuid;
    queryClient.ensureQueryData(volunteerQueryOptions(uuid));
    queryClient.ensureQueryData({
      queryKey: ["volunteer-recent-activity", uuid],
      queryFn: async () => {
        const res = await fetchBackend(
          `/volunteers/${uuid}/recent-activities`,
          "GET",
        );
        const data = await res.json();
        return data.data as Array<{
          title: string;
          description: string;
          time: string;
        }>;
      },
    });
  },
});

function VolunteerProfilePage() {
  const navigate = useNavigate();
  const { uuid } = Route.useParams();
  const { user } = useAuth();
  const { data: volunteer, isLoading } = useVolunteerQuery(uuid);
  const { data: recentActivities } = useQuery({
    queryKey: ["volunteer-recent-activity", uuid],
    queryFn: async () => {
      const res = await fetchBackend(
        `/volunteers/${uuid}/recent-activities`,
        "GET",
      );
      const data = await res.json();
      return data.data as Array<{
        title: string;
        description: string;
        time: string;
      }>;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-4xl w-full p-4">
      {/* Profile Section */}
      <div className="relative">
        {/* Edit Button - Top Right */}
        {user && (
          <div className="absolute right-0 top-0">
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings/update-information">Edit Information</Link>
            </Button>
          </div>
        )}

        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center gap-4 pb-4 md:items-start">
          {/* Profile Picture */}
          <Avatar className="size-40 border-4 border-background shadow-lg relative">
            <AvatarImage
              src={volunteer?.profilePictureSrc}
              alt={volunteer?.fullName}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl">
              {volunteer?.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Name and Verified Badge */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{volunteer?.fullName}</h1>
              {volunteer?.status === "verified" && (
                <IconCircleCheck className="size-6 fill-blue-500 text-white" />
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {volunteer?.issueResponses} Responses
              </span>
              <span>·</span>
              <span className="font-semibold text-foreground">
                {volunteer?.bloodGroup}
              </span>
              <span>·</span>
              <span className="font-semibold text-foreground">
                {volunteer?.currentUpazila}, {volunteer?.currentDistrict}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t" />

        <div className="space-y-3 pb-6 text-sm">
          <a
            className="flex items-center gap-3 font-medium hover:underline"
            href={`mailto:${volunteer?.emailAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconMail className="size-5 text-muted-foreground" />
            <span className="text-foreground">{volunteer?.emailAddress}</span>
          </a>

          <div className="flex items-center gap-3 text-muted-foreground">
            <IconCalendar className="size-5" />
            <span>
              Joined on{" "}
              <span className="font-semibold text-foreground">
                {volunteer?.createdAt.toLocaleDateString()}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <IconLocationPin className="size-5" />
            <span>
              Lives in{" "}
              <span className="font-semibold text-foreground">
                {volunteer?.currentUpazila}, {volunteer?.currentDistrict}
              </span>
            </span>
          </div>
        </div>

        {volunteer?.teamInformation && (
          <button
            type="button"
            onClick={() => {
              if (!volunteer.teamInformation) return;
              navigate({
                to: "/team/$uuid",
                params: {
                  uuid: volunteer.teamInformation.teamUuid,
                },
              });
            }}
            className="group mb-6 w-fit rounded-lg border-2 border-border bg-muted/30 p-4 text-left transition-all hover:border-primary hover:bg-muted/50 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <IconUsers className="size-5" />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {volunteer.teamInformation.role.toUpperCase()} At
                  </p>
                  <p className="font-semibold text-foreground">
                    {volunteer.teamInformation.teamName}
                  </p>
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Divider */}
        <div className="my-8 border-t" />

        {/* Recent Activities Timeline */}
        <div className="pb-8">
          <h2 className="mb-6 text-xl font-bold">Recent Activities</h2>
          {recentActivities && recentActivities.length > 1 ? (
            <Timeline>
              {recentActivities.map((activity, index) => (
                <TimelineItem key={activity.title} step={index + 1}>
                  <TimelineHeader>
                    <TimelineDate>
                      {parseDateFromUtc(activity.time).toLocaleString()}
                    </TimelineDate>
                    <TimelineTitle>{activity.title}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>{activity.description}</TimelineContent>
                  <TimelineIndicator />
                  <TimelineSeparator />
                </TimelineItem>
              ))}
            </Timeline>
          ) : (
            <div className="flex gap-3 items-center justify-center text-sm text-muted-foreground">
              <IconBan className="size-3.5" /> No Recent Activities
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
