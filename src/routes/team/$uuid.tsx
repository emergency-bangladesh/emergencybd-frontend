import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  IconCalendarEvent,
  IconClock,
  IconForbid,
  IconLocationPin,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { volunteerProfilePicUrl } from "@/actions/get-volunteer-details";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import Muted from "@/components/ui/typography/muted";
import { useTeamPlanQuery } from "@/queries/use-team-plan-query";
import { teamQueryOptions, useTeamQuery } from "@/queries/use-team-query";

export const Route = createFileRoute("/team/$uuid")({
  component: RouteComponent,
  loader: ({ params, context: { queryClient } }) => {
    queryClient.ensureQueryData(teamQueryOptions(params.uuid));
  },
});

function RouteComponent() {
  const { uuid } = Route.useParams();
  const { data: team, isLoading } = useTeamQuery(uuid);
  const { data: teamPlans, isLoading: isTeamPlanLoading } =
    useTeamPlanQuery(uuid);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    );
  if (!team)
    return (
      <div className="flex items-center justify-center w-full h-full">
        No team found with uuid {uuid}
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl w-full p-4 h-full flex flex-col items-center gap-12">
      <div
        id="team-header"
        className="flex flex-col gap-2 items-center justify-center"
      >
        <h1>{team.name}</h1>
        <small className="text-muted-foreground">
          Expires on: {format(team.expirationDate, "dd MMMM, yyyy")}
        </small>
        <div className="bg-background flex gap-1 items-center rounded-full border shadow-sm mt-1 p-1 w-fit">
          <div className="flex -space-x-1 items-center">
            <Avatar className="size-5">
              <AvatarImage
                src={volunteerProfilePicUrl(team.leaderUuid)}
                className="ring-1 ring-accent"
              />
              <AvatarFallback>
                <p>leader</p>
              </AvatarFallback>
            </Avatar>
            {team.coLeaderUuid && (
              <Avatar className="size-5">
                <AvatarImage
                  src={volunteerProfilePicUrl(team.coLeaderUuid)}
                  className="ring-1 ring-accent"
                />
                <AvatarFallback>
                  <p>co-leader</p>
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            +
            <strong className="text-foreground font-medium">
              {team.membersCount}
            </strong>{" "}
            members →
          </p>
        </div>
      </div>
      <div id="team-plans" className="w-full">
        <h3>Team Plans</h3>
        <div className="border-t w-full mt-2" />
        {isTeamPlanLoading ? (
          <div className="flex items-center justify-center w-full h-full mt-4">
            <Loader />
          </div>
        ) : teamPlans ? (
          <Timeline className="mt-4">
            {teamPlans.map((item, index) => (
              <TimelineItem
                key={index}
                step={index + 1}
                className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                  <TimelineTitle className="mt-0.5">{item.title}</TimelineTitle>
                  <TimelineIndicator className="bg-primary/10! text-foreground! group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                    <IconCalendarEvent height={16} width={16} />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent className="mt-1 rounded-lg border px-4 py-3">
                  <p className="text-foreground text-[1rem]">
                    {item.description}
                  </p>
                  <div className="flex gap-2 items-center justify-start mt-4">
                    <IconLocationPin size={14} />
                    <span className="tracking-wider text-primary">
                      {item.workingUpazila}, {item.workingDistrict}
                    </span>
                  </div>
                  <TimelineDate className="mt-1 mb-0 flex items-center gap-2">
                    <IconClock size={14} />
                    <span className="text-foreground">
                      {format(item.startDate, "dd MMMM, yyyy")}
                    </span>
                    to
                    <span className="text-foreground">
                      {format(item.endDate, "dd MMMM, yyyy")}
                    </span>
                  </TimelineDate>
                </TimelineContent>
                <Muted className="ml-2 mt-1">See Details →</Muted>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <div className="flex items-center justify-center w-full h-full mt-4 text-muted-foreground gap-2">
            <IconForbid size={16} />
            This Team Has Not Added Any Plans Yet
          </div>
        )}
      </div>
    </div>
  );
}
