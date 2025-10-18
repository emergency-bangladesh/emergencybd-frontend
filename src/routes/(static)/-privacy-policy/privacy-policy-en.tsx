import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PrivacyPolicyEn() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-none bg-background">
        <CardHeader className="p-0!">
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Privacy Policy for Emergency BD
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Effective Date:{" "}
            <span className="text-primary font-medium">30 September 2025</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6 text-base leading-relaxed p-0!">
          <p>
            Emergency BD (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is
            committed to protecting your privacy. This Privacy Policy outlines
            the types of personal information we collect, how we use it, and the
            steps we take to ensure that your data is handled securely. By using
            the Emergency BD application (the &quot; App&quot;), you agree to
            the terms of this Privacy Policy.
          </p>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Personal Information:</span> This
                may include your name, phone number, email address, blood group,
                national identity or birth certificate number, and location
                data.
              </li>
              <li>
                <span className="font-medium">Emergency Data:</span> Information
                related to emergencies, such as blood requests, lost and found
                alerts, and crisis-specific details.
              </li>
              <li>
                <span className="font-medium">Location Data:</span> With your
                consent, we may collect location data for localized crisis
                response services.
              </li>
              <li>
                <span className="font-medium">Usage Data:</span> Information
                about how you use the App, such as device info, IP addresses,
                and usage patterns.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                To provide and maintain services like emergency requests and
                crisis support.
              </li>
              <li>
                To send notifications about emergencies, resources, and updates.
              </li>
              <li>To communicate with you, including customer support.</li>
              <li>To improve the app by analyzing usage data.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Sharing Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">With Service Providers:</span> For
                hosting, communication, and payment processing.
              </li>
              <li>
                <span className="font-medium">With Emergency Responders:</span>{" "}
                To assist healthcare providers and authorities during crises.
              </li>
              <li>
                <span className="font-medium">For Legal Compliance:</span> As
                required by law or valid legal request.
              </li>
              <li>
                <span className="font-medium">With Your Consent:</span> When you
                explicitly agree.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary or
              legally required. Emergency-related data may be stored longer
              depending on operational needs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Security of Your Information
            </h2>
            <p>
              We use industry-standard measures to protect your data. However,
              no method of transmission or storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Your Data Protection Rights
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Access:</span> Request access to
                your data.
              </li>
              <li>
                <span className="font-medium">Correction:</span> Request
                corrections to inaccurate data.
              </li>
              <li>
                <span className="font-medium">Deletion:</span> Request deletion
                of personal info (subject to legal limits).
              </li>
              <li>
                <span className="font-medium">Opt-out:</span> Opt out of
                marketing and non-essential notifications.
              </li>
              <li>
                <span className="font-medium">Data Portability:</span> Request a
                copy of your data in a structured format.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
            <p>
              The App may contain links to third-party services. We are not
              responsible for their privacy practices and encourage reviewing
              their policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Children’s Privacy
            </h2>
            <p>
              Our services are not intended for children under 13. We do not
              knowingly collect critical personal data from them. Accounts for
              individuals under 18 may include parental controls. If you believe
              we collected such info, contact us to resolve it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page, and the effective date updated. Please
              check periodically to stay informed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
              <a
                href="mailto:project.emergencybd@gmail.com"
                className="text-destructive hover:underline"
              >
                project.emergencybd@gmail.com
              </a>{" "}
              or through our social media handles.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
