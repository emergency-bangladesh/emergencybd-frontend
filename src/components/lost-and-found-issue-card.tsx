import {
  IconAlertCircle,
  IconBriefcase,
  IconCalendar,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconDroplet,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { getLostAndFoundIssueDetails } from "@/actions/issue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { apiUrl, fetchBackend } from "@/lib/fetch-backend";
import { parseResult } from "@/lib/result";
import type { Issue } from "@/schemas/issue";
import { Loader } from "./ui/loader";

interface LostAndFoundIssueCardProps {
  issue: Issue;
}

const statusConfig = {
  open: {
    label: "Open",
    className: "bg-amber-600 text-white hover:bg-amber-700",
  },
  working: {
    label: "In Progress",
    className: "bg-blue-600 text-white hover:bg-blue-700",
  },
  solved: {
    label: "Found",
    className: "bg-green-600 text-white hover:bg-green-700",
  },
  invalid: {
    label: "Invalid",
    className: "bg-muted text-muted-foreground hover:bg-muted/90",
  },
};

export function LostAndFoundIssueCard({ issue }: LostAndFoundIssueCardProps) {
  const onRespond = async () => {
    const [_, error] = await parseResult(() =>
      fetchBackend(`/issues/${issue.issueUuid}/respond`, "POST"),
    );
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
      });
    }
  };
  const onMarkResolved = async () => {
    const [_, error] = await parseResult(() =>
      fetchBackend(`/issues/${issue.issueUuid}/update/status/solved`, "PATCH"),
    );
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
      });
    }
  };
  const onMarkInvalid = async () => {
    const [_, error] = await parseResult(() =>
      fetchBackend(`/issues/${issue.issueUuid}/update/status/invalid`, "PATCH"),
    );
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
      });
    }
  };

  const { user } = useAuth();
  const currentUserUuid = user?.uuid;
  const isVolunteer = user?.type === "volunteer";

  const formatDate = (date: Date) => date.toLocaleDateString();
  const formatTime = (date: Date) => format(date, "hh:mm a");

  const { data: lostAndFoundIssue, isLoading: isIssueLoading } = useQuery({
    queryKey: ["issue", issue.issueUuid],
    queryFn: () => getLostAndFoundIssueDetails(issue.issueUuid),
  });

  const { data: image_urls, isLoading: areImagesLoading } = useQuery({
    queryKey: ["issue", "lost_and_found", issue.issueUuid, "images"],
    queryFn: async () => {
      const res = await fetchBackend(
        `/image/issue/lost-and-found/${issue.issueUuid}/images`,
        "GET",
      );
      const data = await res.json();
      return data.data as Array<string>;
    },
  });

  if (isIssueLoading || areImagesLoading) return <Loader />;

  if (
    !lostAndFoundIssue ||
    !image_urls ||
    lostAndFoundIssue.category !== "lost_and_found"
  ) {
    return null;
  }

  const statusInfo = statusConfig[lostAndFoundIssue.status];

  const isOwner = currentUserUuid === lostAndFoundIssue.accountUuid;
  const isVolunteerResponding =
    isVolunteer && currentUserUuid !== lostAndFoundIssue.accountUuid;
  const hasVolunteerResponded = lostAndFoundIssue.status === "working";

  // Validate image_urls length (1-3 images)
  const validImages = image_urls.slice(0, 3);

  console.log(JSON.stringify({ validImages }));

  return (
    <Card className="w-full max-w-2xl overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <IconAlertCircle className="h-6 w-6 text-amber-600" />
              <div>
                <h3 className="text-2xl font-bold text-card-foreground">
                  {lostAndFoundIssue.nameOfPerson}
                </h3>
                <p className="text-lg text-muted-foreground">
                  Age: {lostAndFoundIssue.age} years
                </p>
              </div>
            </div>
          </div>
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
        </div>

        {validImages.length > 0 && (
          <div
            className={`grid gap-2 ${
              validImages.length === 1
                ? "grid-cols-1"
                : validImages.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
            }`}
          >
            {validImages.map((url, index) => (
              <div
                key={url}
                className={`relative overflow-hidden rounded-lg ${
                  validImages.length === 1 ? "aspect-4/3" : "aspect-square"
                }`}
              >
                <img
                  src={`${apiUrl}${url}`}
                  alt={`${lostAndFoundIssue.nameOfPerson} - ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Last Seen Location - Prominent */}
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <IconMapPin className="mt-0.5 h-5 w-5 text-amber-600" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-amber-900 dark:text-amber-100">
                Last Seen Location
              </p>
              <p className="mt-1 text-sm font-semibold text-amber-950 dark:text-amber-50">
                {lostAndFoundIssue.lastSeenLocation}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                {lostAndFoundIssue.upazila}, {lostAndFoundIssue.district}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div className="flex items-center gap-2">
          <IconUser className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Contact Person:{" "}
            <span className="font-medium text-card-foreground">
              {lostAndFoundIssue.contactPersonName}
            </span>
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Details */}
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground">Details</p>
          <p className="mt-1 text-sm leading-relaxed text-card-foreground">
            {lostAndFoundIssue.details}
          </p>
        </div>

        {/* Additional Information */}
        <div className="grid gap-3 sm:grid-cols-2">
          {lostAndFoundIssue.bloodGroup && (
            <div className="flex items-start gap-3">
              <IconDroplet className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Blood Group</p>
                <p className="text-sm font-medium text-card-foreground">
                  {lostAndFoundIssue.bloodGroup}
                </p>
              </div>
            </div>
          )}

          {lostAndFoundIssue.occupation && (
            <div className="flex items-start gap-3">
              <IconBriefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Occupation</p>
                <p className="text-sm font-medium text-card-foreground">
                  {lostAndFoundIssue.occupation}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <IconPhone className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium text-card-foreground">
                {lostAndFoundIssue.phoneNumber}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <IconPhone className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Emergency Phone</p>
              <p className="text-sm font-medium text-card-foreground">
                {lostAndFoundIssue.emergencyPhoneNumber}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <IconMail className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium text-card-foreground">
                {lostAndFoundIssue.emailAddress}
              </p>
            </div>
          </div>
        </div>

        {currentUserUuid && (
          <div className="flex flex-wrap gap-2 border-t pt-4">
            {isOwner && (
              <Button
                onClick={() => onMarkResolved()}
                className="flex-1 sm:flex-none"
              >
                <IconCircleCheck className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
            )}

            {isVolunteerResponding && lostAndFoundIssue.status === "open" && (
              <Button
                onClick={() => onRespond()}
                className="flex-1 sm:flex-none"
              >
                Respond
              </Button>
            )}

            {isVolunteer && hasVolunteerResponded && !isOwner && (
              <>
                <Button
                  onClick={() => onMarkResolved()}
                  className="flex-1 sm:flex-none"
                >
                  <IconCircleCheck className="mr-2 h-4 w-4" />
                  Mark as Resolved
                </Button>
                <Button
                  onClick={() => onMarkInvalid()}
                  variant="destructive"
                  className="flex-1 sm:flex-none"
                >
                  <IconCircleX className="mr-2 h-4 w-4" />
                  Mark as Invalid
                </Button>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <IconCalendar className="h-3.5 w-3.5" />
            <span>
              Created {formatDate(new Date(lostAndFoundIssue.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5" />
            <span>
              Updated {formatTime(new Date(lostAndFoundIssue.lastUpdated))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
