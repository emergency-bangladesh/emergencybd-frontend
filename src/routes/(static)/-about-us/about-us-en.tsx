import {
  IconClipboardList,
  IconClock,
  IconGlobe,
  IconHeart,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutUsEn() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
          <Badge variant="secondary">Emergency BD</Badge>
          <Badge className="uppercase">Trusted · Fast · Local</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-primary">Emergency BD</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          Your reliable partner in emergency response and crisis management —
          fast, organized help when every second counts.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button
            variant="default"
            asChild
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link to="/issues/new"> Get Help Now</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-transparent"
            asChild
          >
            <Link to="/registration/volunteer/personal-information">
              Become a Volunteer
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* WHAT WE COVER */}
        <section className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
          <Card>
            <CardContent className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted shrink-0">
                    <IconHeart className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Blood Management
                  </h3>
                </div>
                <Badge className="self-start sm:self-auto">Critical</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Facilitate quick access to blood donors and blood requisitions
                so critical patients never suffer from shortages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted shrink-0">
                    <IconSearch className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Lost &amp; Found
                  </h3>
                </div>
                <Badge className="self-start sm:self-auto">Community</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Reunite lost individuals and belongings with their owners
                through organized, searchable posts and local coordination.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted shrink-0">
                    <IconClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Crisis Management
                  </h3>
                </div>
                <Badge className="self-start sm:self-auto">Coordination</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                A platform to streamline communication and access to emergency
                services — improving response times and resource allocation.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* UNIQUE APPROACH */}
        <section className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Our Unique Approach
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Bangladesh faces fragmented emergency systems and inconsistent
              coordination. Emergency BD creates a streamlined, connected
              network that links people, volunteers, and services — reducing
              friction when lives are at stake.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded bg-muted shrink-0">
                  <IconGlobe className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">
                    Local-first
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Built for Bangladeshi communities, urban and rural.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded bg-muted shrink-0">
                  <IconUsers className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">
                    Community-driven
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Volunteers, hospitals, and citizens work together.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded bg-muted shrink-0">
                  <IconClock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">
                    Fast response
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Optimized flows to connect help quickly.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <Card className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              Why this matters
            </CardTitle>
            <CardContent className="px-0">
              <p className="text-sm text-muted-foreground">
                In many emergencies every second counts. Our lightweight tools
                reduce the time to find blood, volunteers, or emergency
                services, and provide clear next steps for citizens in distress.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active coverage</span>
                  <span className="text-sm font-medium">
                    Nationwide (expanding)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Platforms</span>
                  <span className="text-sm font-medium">
                    Web ready • Mobile-ready
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Primary users</span>
                  <span className="text-sm font-medium text-right">
                    All citizens, volunteers, hospitals
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* MISSION & TARGET AUDIENCE */}
        <section className="grid gap-6 sm:gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg font-semibold text-muted-foreground">
              To revolutionize crisis management in Bangladesh — when every
              second counts.
            </p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              We eliminate frustration and delays by giving citizens a reliable,
              easy-to-use system for getting and giving help.
            </p>

            <div className="mt-4 sm:mt-6 space-y-3">
              <div className="flex items-start sm:items-center gap-3">
                <Badge className="shrink-0">Vision</Badge>
                <p className="text-sm text-muted-foreground">
                  A safe, connected Bangladesh where help is a click away.
                </p>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <Badge className="shrink-0">Goal</Badge>
                <p className="text-sm text-muted-foreground">
                  Support every citizen in emergencies.
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardContent>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Our Target Audience
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                People across Bangladesh who use laptops or smartphones — from
                city hospitals to remote villages. The platform is designed to
                be simple, low-bandwidth friendly, and mobile-ready.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">
                    Urban Citizens
                  </strong>
                  <div className="text-xs text-muted-foreground">
                    Hospitals, students, commuters
                  </div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">
                    Rural Communities
                  </strong>
                  <div className="text-xs text-muted-foreground">
                    Local volunteers, clinics
                  </div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">Volunteers</strong>
                  <div className="text-xs text-muted-foreground">
                    Trained responders &amp; helpers
                  </div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">Hospitals</strong>
                  <div className="text-xs text-muted-foreground">
                    Emergency units &amp; blood banks
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* CTA - LARGE */}
        <section className="bg-muted p-6 sm:p-8 rounded-lg text-center">
          <h3 className="text-xl sm:text-2xl font-bold">
            Join Us in Building a Safer Bangladesh
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Help us expand coverage or get immediate assistance.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/issues/new">Get Help Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent"
              asChild
            >
              <Link to="/registration/volunteer/personal-information">
                Sign Up as Volunteer
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
