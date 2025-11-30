import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WhyWeRequireIdDocumentsEn() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <div className="max-w-4xl mx-auto">
        <Card className="border-none bg-background! shadow-none">
          <CardHeader className="p-0!">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Rationale and Legal Basis for ID Document Collection by Emergency
              Bangladesh
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Date:{" "}
              <span className="text-primary font-medium">
                30 September 2025
              </span>
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-base leading-relaxed p-0!">
            <h2>
              <strong>1. Purpose of ID Document Collection</strong>
            </h2>
            <p>
              In order to fulfil its mandate of blood-donor & receiver matching,
              volunteer team formation and crisis incident coordination,
              Emergency Bangladesh collects certain identity-related data (name,
              date of birth, mobile number, national identification number [NID]
              or birth registration number). The collection is justified on
              several grounds:
            </p>
            <ol className="list-decimal">
              <li>
                <strong>Authentication of users:</strong> By obtaining a legally
                verifiable identifier (such as a NID or birth registration
                number), the system can ensure that the registered person is a
                real individual and reduce fraud (for example, fictitious donor
                profiles, false volunteers).
              </li>
              <li>
                <strong>Accountability and traceability:</strong> In crisis
                response, especially when blood donation or volunteer teams are
                mobilised, it is important to have a reliable way to contact,
                verify and hold accountable individuals. A mobile number plus
                official ID supports this.
              </li>
              <li>
                <strong>Legal/compliance alignment:</strong> Using official ID
                numbers (NID or birth registration number) aligns with national
                identity frameworks and supports integration with other
                emergency systems or government-verified data.
              </li>
              <li>
                <strong>Safety and trust:</strong> Donors and receivers must
                trust the network. Verifying identities helps build confidence
                and reduces risk of misuse (e.g., impersonation, false claims).
              </li>
              <li>
                <strong>
                  Volunteer team coordination & resource allocation:
                </strong>
                Knowing exactly who is registered, their identity, age (via date
                of birth), and contact enables planning, logistics, insurance
                and risk mitigation in field operations.
              </li>
            </ol>
            <p>
              In short, the identity document requirement supports the core
              mission by enhancing integrity, reliability and safety of the
              platform.
            </p>
            <h2>
              <strong>2. Legal and Regulatory Basis in Bangladesh</strong>
            </h2>
            <p>
              Here are the relevant legal/regulatory points in Bangladesh that
              support or contextualise identity document collection:
            </p>
            <h4>
              <strong>2.1 National Identity / NID framework</strong>
            </h4>
            <ul className="list-disc">
              <li>
                The system of the national identity card (NID) in Bangladesh is
                overseen by the Election Commission of Bangladesh. (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://en.wikipedia.org/wiki/National_identity_card_%28Bangladesh%29"
                >
                  Wikipedia
                </a>
                )
              </li>
              <li>
                The National Identity Registration Act, 2010 remains a key piece
                of legislation governing NID registration in Bangladesh. (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://seap.nationalityforall.org/digital-id/regional-overview/south-asia/bangladesh/"
                >
                  seap.nationalityforall.org
                </a>
                )
              </li>
              <li>
                Use of the NID (or equivalent national identifier) by
                organisations can support verification of citizenship and
                identity, which is directly relevant to systems like Emergency
                Bangladesh.
              </li>
            </ul>
            <h4>
              <strong>2.2 Data Protection / Privacy Framework</strong>
            </h4>
            <ul className="list-disc">
              <li>
                The Constitution of the People’s Republic of Bangladesh under
                Article 43(b) provides that
                <em>
                  “every citizen shall have the right to the privacy of his
                  correspondence and other means of communication.”
                </em>
                (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://juralacuity.com/need-of-personal-data-protection-laws-in-bangladesh/"
                >
                  Jural Acuity
                </a>
                )
              </li>
              <li>
                Bangladesh is in the process of adopting comprehensive data
                protection legislation (e.g., the draft Personal Data Protection
                Act, 2024) which emphasises lawful, fair, transparent processing
                of personal data. (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://www.ti-bangladesh.org/upload/files/position-paper/2024/Personal-Data-Protection-Act-Review-TIB-Article-19.pdf"
                >
                  Transparency International Bangladesh
                </a>
                )
              </li>
              <li>
                Under the Cyber Security Act, 2023 (which replaced the earlier
                Digital Security Act) section 26 provides that collecting,
                selling or using identification information without lawful
                authority constitutes an offence. (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://www.dlapiperdataprotection.com/?c=BD&t=security"
                >
                  DLA Piper Data Protection
                </a>
                )
              </li>
            </ul>
            <h4>
              <strong>2.3 Implications for Emergency Bangladesh</strong>
            </h4>
            <ul className="list-disc">
              <li>
                Collecting NID or birth registration numbers by Emergency
                Bangladesh is supported by the national identity framework (NID
                law) as a valid identifier.
              </li>
              <li>
                At the same time, Emergency Bangladesh must ensure compliance
                with privacy rights and emerging data protection obligations:
                data collection must be lawful, with clear purpose, minimal to
                what is necessary, with adequate safeguards.
              </li>
              <li>
                Under the Cyber Security Act, 2023, or its successor mechanisms,
                using someone’s identification information without lawful
                authority may expose the organisation to liability. (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://www.dlapiperdataprotection.com/?c=BD&t=security"
                >
                  DLA Piper Data Protection
                </a>
                )
              </li>
            </ul>
            <h2>
              <strong>
                3. Why NID or Birth Registration Number Specifically?
              </strong>
            </h2>
            <p>
              The requirement to use
              <strong>
                either a National Identification (NID) number or a Birth
                Registration Number
              </strong>
              (in cases where NID may not be available) is justified by:
            </p>
            <ul className="list-disc">
              <li>
                Ensuring <strong>legal verifiability</strong>: NID is an
                official government-issued identifier used in many services in
                Bangladesh. (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://en.wikipedia.org/wiki/National_identity_card_%28Bangladesh%29"
                >
                  Wikipedia
                </a>
                )
              </li>
              <li>
                <strong>Inclusivity:</strong> Some individuals (especially
                younger persons) may not yet hold a NID; using a Birth
                Registration Number enables them to register and participate
                while maintaining legal traceability.
              </li>
              <li>
                <strong>Risk mitigation:</strong> Official IDs reduce risk of
                false identities, duplicates, ghosts, which improves the
                integrity of the donor-receiver database and the volunteer
                deployment system.
              </li>
              <li>
                <strong>Government policy trends:</strong> The government is
                increasingly requiring NID for services (e.g., mandatory for
                government job recruitment). (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://www.dhakatribune.com/bangladesh/government-affairs/383061/national-id-to-be-made-mandatory-for-government"
                >
                  Dhaka Tribune
                </a>
                )
              </li>
            </ul>
            <p>
              Therefore, the document requirement is both functional and aligns
              with evolving national standards of identity verification.
            </p>
            <h2>
              <strong>
                4. Challenges and Risks in Collecting ID Documents
              </strong>
            </h2>
            <p>
              While the collection of ID documents provides many benefits, it
              also introduces several challenges that Emergency Bangladesh must
              anticipate and manage. Here are some of the key challenges and how
              Emergency Bangladesh resolves them:
            </p>
            <h4>
              <strong>4.1 Privacy and Data Protection Risks</strong>
            </h4>
            <ul className="list-disc">
              <li>
                Because Bangladesh currently lacks a fully mature and enforced
                data protection law, there is legal uncertainty about
                obligations and liabilities for handling sensitive personal data
                (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://www.dataguidance.com/jurisdictions/bangladesh"
                >
                  DataGuidance
                </a>
                ). Emergency Bangladesh is designed to follow current laws and
                it will adapt when there's any changes in the laws.
              </li>
              <li>
                The risk of <strong>data breaches, leaks or misuse</strong> is
                elevated, especially when handling national identifiers and
                other personal information. For example, previous data leaks in
                Bangladesh have exposed large volumes of NID and personal data (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://en.wikipedia.org/wiki/2023_Bangladesh_Government_website_data_breach"
                >
                  Wikipedia
                </a>
                ). Emergency Bangladesh encrypts every personal data (as per
                defined in the law of Bangladesh) it collects. It's ovbious that
                there's minimal chances to leak personal information. The
                platform also tries its best to ensure data safety.
              </li>
              <li>
                Potential negative impact on users’ trust if data is mishandled.
                Although it is harder to control negative impressions, Emergency
                Banlgadesh is fully committed to respect users' privacy.
              </li>
            </ul>
            <h4>
              <strong>4.2 Verification & Exclusion Risks</strong>
            </h4>
            <p>
              Some individuals may not possess NID or a Birth Registration
              Number (for example, migrants, stateless persons, minors, remote
              dwellers), which could exclude them from participation unless the
              system accommodates alternative verification mechanisms (
              <a
                className="text-blue-500 hover:underline"
                href="https://seap.nationalityforall.org/digital-id/regional-overview/south-asia/bangladesh/"
              >
                seap.nationalityforall.org
              </a>
              ). Currently we are working on this issue. We may push an update
              in later releases to address this issue.
            </p>
            <h4>
              <strong>4.3 Legal & Compliance Ambiguities</strong>
            </h4>
            <ul className="list-disc">
              <li>
                Because the data protection law is still being finalised,
                obligations on data controllers/processors may evolve rapidly;
                Emergency Bangladesh must remain agile to adapt to new
                regulations. Good news is that it is ready to adapt if there any
                changes happens.
              </li>
              <li>
                “Lawful authority” for collecting national identifiers may not
                be expressly defined in current law; for example, under the
                Cyber Security Act 2023 the term is not clearly defined (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://www.dlapiperdataprotection.com/?c=BD&t=security"
                >
                  DLA Piper Data Protection
                </a>
                ). Emergency Bangladesh is collecting data as a 'Volunteer
                Organisation'.
              </li>
              <li>
                Ensuring compliance with cross-border data rules, data
                localisation, consent, and user rights (e.g., correction,
                deletion) may be complex as the legal regime matures (
                <a
                  className="text-blue-500 hover:underline"
                  href="https://itif.org/publications/2025/05/16/bangladesh-cross-border-data-transfer-regulation/"
                >
                  ITIF
                </a>
                ). Emergency Banlgadesh tackles this issue via mentioning itself
                a Volunteer Organisation.
              </li>
            </ul>
            <h4>
              <strong>4.4 Trust & Public Perception</strong>
            </h4>
            <p>
              Some users may be reluctant to provide NID or other sensitive
              information due to fear of misuse or privacy concerns (e.g.,
              identity theft). Emergency Bangladesh assures that the
              administrators and the core team WILL NOT MISUSE the collected
              data.
            </p>
            <h2>
              <strong>5. Conclusion</strong>
            </h2>
            <p>
              The collection of identity documents (NID or Birth Registration
              Number) by Emergency Bangladesh is a sound and justified measure —
              supporting authentication, accountability, safety and operational
              integrity in blood donation and volunteer management. The legal
              landscape in Bangladesh provides a supporting framework via the
              national ID system and evolving data protection law; however,
              because the regulatory regime is still developing, there are
              significant challenges and risks — especially around privacy,
              exclusion, data security and evolving compliance obligations.
            </p>
            <p>
              By recognising these risks, adopting proper safeguards and
              maintaining transparent practices, Emergency Bangladesh can
              effectively manage the identity-document collection process in a
              way that is legally compliant, ethical and trustworthy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
