import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(static)/legal/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h3>Legal Docs of Emergency Bangladesh</h3>
      <div className="flex flex-col gap-2 items-center justify-center mt-8">
        <Button asChild variant="link">
          <Link to="/legal/privacy-policy">Privacy Policy</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/legal/terms-and-conditions">Terms and Conditions</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/legal/why-we-require-id-documents">
            Why We Require ID Documents?
          </Link>
        </Button>
      </div>
    </div>
  );
}
