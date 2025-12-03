import {
  IconAlertCircle,
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
import { useState } from "react";
import { toast } from "sonner";
import { getBloodDonationIssueDetails } from "@/actions/issue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { fetchBackend } from "@/lib/fetch-backend";
import { parseResult } from "@/lib/result";
import type { Issue } from "@/schemas/issue";
import { Loader } from "./ui/loader";

interface bloodDonationIssueCardProps {
  issue: Issue;
}

const statusConfig: Record<
  Issue["status"],
  { label: string; className: string }
> = {
  open: {
    label: "Open",
    className: "bg-amber-600 text-white hover:bg-amber-700",
  },
  working: {
    label: "In Progress",
    className: "bg-blue-600 text-white hover:bg-blue-700",
  },
  solved: {
    label: "Solved",
    className: "bg-green-600 text-white hover:bg-green-700",
  },
  invalid: {
    label: "Invalid",
    className: "bg-muted text-muted-foreground hover:bg-destructive",
  },
  idle: {
    label: "Idle",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
  closed: {
    label: "Closed",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
};

export function BloodDonationIssueCard({ issue }: bloodDonationIssueCardProps) {
  const [isResponding, setIsResponding] = useState(false);
  const [isMarkingResolved, setIsMarkingResolved] = useState(false);
  const [isMarkingInvalid, setIsMarkingInvalid] = useState(false);

  const respondToIssue = async () => {
    setIsResponding(true);
    const [_, error] = await parseResult(() =>
      fetchBackend(`/issues/${issue.issueUuid}/respond`, "POST"),
    );
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
      });
    }
    setIsResponding(false);
  };
  const markIssueAsResolved = async () => {
    setIsMarkingResolved(true);
    const [_, error] = await parseResult(() =>
      fetchBackend(`/issues/${issue.issueUuid}/update/status/solved`, "PATCH"),
    );
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
      });
    }
    setIsMarkingResolved(false);
  };
  const markIssueAsInvalid = async () => {
    setIsMarkingInvalid(true);
    const [_, error] = await parseResult(() =>
      fetchBackend(`/issues/${issue.issueUuid}/update/status/invalid`, "PATCH"),
    );
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
      });
    }
    setIsMarkingInvalid(false);
  };

  const { user } = useAuth();
  const currentUserUuid = user?.uuid;

  const formatDate = (date: Date) => date.toLocaleDateString();
  const formatTime = (date: Date) => format(date, "dd/MM/yy, HH:mm");

  // HACK: I really can figure out the good design pattern. I tried many things,
  // but all seems like not scalable! Need to figure out a pattern for the codebase soon!
  // WARN: did the same at @./lost-and-found-issue-card.tsx file tho.
  const { data: bloodDonationIssue, isLoading } = useQuery({
    queryKey: ["issue", "blood_donation", issue.issueUuid],
    queryFn: () => getBloodDonationIssueDetails(issue.issueUuid),
  });

  if (isLoading) return <Loader />;

  if (!bloodDonationIssue || bloodDonationIssue.category !== "blood_donation") {
    console.log({ bloodDonationIssue }, "aborting");
    return null;
  }

  console.log({ bloodDonationIssue });

  const statusInfo = statusConfig[issue.status];
  const isOwner = currentUserUuid === bloodDonationIssue.accountUuid;

  return (
    <Card className="w-full md:w-2xl max-w-2xl overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <span className="text-2xl font-bold">
                {bloodDonationIssue.bloodGroup}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Required Blood</p>
              <p className="text-3xl font-bold text-primary">
                {bloodDonationIssue.amountBag}{" "}
                {bloodDonationIssue.amountBag === 1 ? "Bag" : "Bags"}
              </p>
            </div>
          </div>
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <IconDroplet className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">
              Patient: {bloodDonationIssue.patientName}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <IconUser className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Contact:{" "}
              <span className="font-medium text-card-foreground">
                {bloodDonationIssue.contactPersonName}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-3">
              <IconMapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-card-foreground">
                {bloodDonationIssue.hospitalName}
              </p>
            </div>
            <p className="text-sm font-medium text-muted-foreground ml-7">
              {bloodDonationIssue.upazila}, {bloodDonationIssue.district}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <IconPhone className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-card-foreground">
                <span className="text-muted-foreground">Primary: </span>
                {bloodDonationIssue.phoneNumber}
              </p>{" "}
              <p className="text-sm font-medium text-card-foreground">
                <span className="text-muted-foreground">Emergency: </span>
                {bloodDonationIssue.emergencyPhoneNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <IconMail className="mt-0.5 h-4 w-4 text-muted-foreground" />

            <p className="truncate text-sm font-medium text-card-foreground">
              {bloodDonationIssue.emailAddress}
            </p>
          </div>
        </div>

        {bloodDonationIssue.instructions && (
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <IconAlertCircle className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">
                Special Instructions
              </p>
              <p className="mt-1 text-sm leading-relaxed text-card-foreground">
                {bloodDonationIssue.instructions}
              </p>
            </div>
          </div>
        )}

        {currentUserUuid && (
          <div className="flex flex-wrap gap-2 border-t pt-4">
            {isOwner && bloodDonationIssue.status !== "solved" && (
              <Button
                onClick={() => markIssueAsResolved()}
                className="flex-1 sm:flex-none"
                disabled={isMarkingResolved}
              >
                <IconCircleCheck className="mr-2 h-4 w-4" />
                {isMarkingResolved && <Loader />}
                Mark as Resolved
              </Button>
            )}

            {user.type === "volunteer" && !isOwner && (
              <Button
                onClick={() => respondToIssue()}
                className="flex-1 sm:flex-none"
                disabled={isResponding}
              >
                {isResponding && <Loader />}
                Respond
              </Button>
            )}

            {user.type === "volunteer" &&
              bloodDonationIssue.respondersUuid.includes(currentUserUuid) &&
              !isOwner && (
                <>
                  <Button
                    onClick={() => markIssueAsResolved()}
                    className="flex-1 sm:flex-none"
                    disabled={isMarkingResolved}
                  >
                    <IconCircleCheck className="mr-2 h-4 w-4" />
                    {isMarkingResolved && <Loader />}
                    Mark as Resolved
                  </Button>
                  <Button
                    onClick={() => markIssueAsInvalid()}
                    variant="destructive"
                    className="flex-1 sm:flex-none"
                    disabled={isMarkingInvalid}
                  >
                    {isMarkingInvalid ? (
                      <Loader />
                    ) : (
                      <IconCircleX className="mr-2 h-4 w-4" />
                    )}
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
              Created {formatDate(new Date(bloodDonationIssue.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5" />
            <span>
              Updated at {formatTime(new Date(bloodDonationIssue.lastUpdated))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
