import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
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
import { Loader } from "./ui/loader";
import type { BloodDonationIssue, Issue } from "@/types/issue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/use-auth";
import { fetchBackend } from "@/lib/fetch-backend";
import { parseDateFromUtc } from "@/lib/utils";

interface bloodDonationIssueCardProps {
  issue: Issue;
}

const statusConfig = {
  open: {
    label: "Open",
    className: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  working: {
    label: "In Progress",
    className: "bg-chart-4 text-foreground hover:bg-chart-4/90",
  },
  solved: {
    label: "Solved",
    className: "bg-chart-4 text-foreground hover:bg-chart-4/90",
  },
  invalid: {
    label: "Invalid",
    className: "bg-muted text-muted-foreground hover:bg-muted/90",
  },
};

export function BloodDonationIssueCard({ issue }: bloodDonationIssueCardProps) {
  const onRespond = async () => {
    try {
      await fetchBackend(`/issues/${issue.uuid}/respond`, "POST");
    } catch (error) {
      toast.error("Something went wrong", {
        description: (error as Error).message,
      });
    }
  };
  const onMarkResolved = async () => {
    try {
      await fetchBackend(`/issues/${issue.uuid}/update/status/solved`, "POST");
    } catch (error) {
      toast.error("Something went wrong", {
        description: (error as Error).message,
      });
    }
  };
  const onMarkInvalid = async () => {
    try {
      await fetchBackend(`/issues/${issue.uuid}/update/status/invalid`, "POST");
    } catch (error) {
      toast.error("Something went wrong", {
        description: (error as Error).message,
      });
    }
  };

  const { user } = useAuth();
  const currentUserUuid = user?.uuid;
  const isVolunteer = user?.type === "volunteer";

  const formatDate = (date: Date) => date.toLocaleDateString();
  const formatTime = (date: Date) => format(date, "hh:mm a");

  const { data: bloodDonationIssue, isLoading } = useQuery({
    queryKey: ["issue", "blood_donation", issue.uuid],
    queryFn: async (): Promise<BloodDonationIssue> => {
      const res = await fetchBackend(
        `/issues/blood_donation/${issue.uuid}`,
        "GET",
      );
      const json = await res.json();
      const data = json.data;
      return {
        accountUuid: data.account_uuid,
        amountBag: data.amount_bag,
        bloodGroup: data.blood_group,
        contactPersonName: data.contact_person_name,
        createdAt: parseDateFromUtc(data.created_at),
        district: data.district,
        emailAddress: data.email_address,
        emergencyPhoneNumber: data.emergency_phone_number,
        hospitalName: data.hospital_name,
        instructions: data.instructions,
        lastUpdated: parseDateFromUtc(data.last_updated),
        patientName: data.patient_name,
        phoneNumber: data.phone_number,
        status: data.status,
        upazila: data.upazila,
        category: data.category,
        issueUuid: issue.uuid,
      };
    },
  });

  if (isLoading) return <Loader />;

  if (!bloodDonationIssue) {
    return null;
  }

  const statusInfo = statusConfig[bloodDonationIssue.status];
  const isOwner = currentUserUuid === bloodDonationIssue.accountUuid;
  const isVolunteerResponding =
    isVolunteer && currentUserUuid !== bloodDonationIssue.accountUuid;
  const hasVolunteerResponded = bloodDonationIssue.status === "working";

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
            {isOwner && (
              <Button
                onClick={() => onMarkResolved()}
                className="flex-1 sm:flex-none"
              >
                <IconCircleCheck className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
            )}

            {isVolunteerResponding && bloodDonationIssue.status === "open" && (
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
              Created {formatDate(new Date(bloodDonationIssue.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5" />
            <span>
              Updated {formatTime(new Date(bloodDonationIssue.lastUpdated))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
