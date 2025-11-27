import type { Metadata } from "next";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using NoUploadTools. Understand your rights and responsibilities when using our privacy-first browser utilities.",
  alternates: {
    canonical: `${siteUrl}/terms/`
  },
  openGraph: {
    url: `${siteUrl}/terms/`,
    type: "website",
    title: "Terms of Service | NoUploadTools"
  }
};

export default function TermsPage() {
  return (
    <div className="space-y-6 text-base text-gray-800">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Last Updated: November 27, 2025
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
        <p>
          Welcome to NoUploadTools (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;)
          govern your access to and use of our website{" "}
          <a
            href="https://nouploadtools.com"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            nouploadtools.com
          </a>{" "}
          (the &ldquo;Site&rdquo;) and any tools, features, or services provided
          through the Site (collectively, the &ldquo;Services&rdquo;).
        </p>
        <p>
          By accessing or using our Services, you agree to be bound by these
          Terms. If you do not agree to these Terms, you must not access or use
          the Services.
        </p>
        <p>
          We reserve the right to modify these Terms at any time. Your continued
          use of the Services after changes are posted constitutes your
          acceptance of the modified Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Description of Services</h2>
        <p>
          NoUploadTools provides free, browser-based utilities for file
          conversion and manipulation, including but not limited to:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Image to PDF conversion</li>
          <li>File compression and optimization</li>
          <li>Format conversion tools</li>
          <li>Other utility tools as made available</li>
        </ul>
        <p className="mt-2">
          Our Services are designed to process files locally in your browser
          using JavaScript. Files are not uploaded to our servers during normal
          operation of the tools.
        </p>
        <p>
          We may modify, suspend, or discontinue any aspect of the Services at
          any time without prior notice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Eligibility</h2>
        <p>
          You must be at least 13 years old to use our Services. If you are
          under 18, you must have permission from a parent or guardian. By using
          the Services, you represent and warrant that you meet these
          requirements.
        </p>
        <p>
          If you are using the Services on behalf of an organization, you
          represent that you have the authority to bind that organization to
          these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Acceptable Use Policy</h2>
        <p>
          You agree to use the Services only for lawful purposes. You must not:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Use the Services in any way that violates any applicable law or
            regulation
          </li>
          <li>
            Use the Services to transmit or process illegal, harmful, or
            offensive content
          </li>
          <li>
            Attempt to gain unauthorized access to the Services or related
            systems
          </li>
          <li>
            Interfere with or disrupt the Services or servers or networks
            connected to the Services
          </li>
          <li>
            Use automated means (bots, scrapers) to access the Services without
            our permission
          </li>
          <li>
            Reverse engineer, decompile, or disassemble any part of the Services
          </li>
          <li>
            Remove, alter, or obscure any copyright, trademark, or other
            proprietary notices
          </li>
          <li>Use the Services to violate the rights of others</li>
          <li>
            Use the Services in any manner that could damage, disable,
            overburden, or impair the Site
          </li>
          <li>
            Attempt to circumvent any security features or access restrictions
          </li>
        </ul>
        <p className="mt-2">
          We reserve the right to terminate or suspend your access to the
          Services for violation of these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Intellectual Property Rights
        </h2>

        <h3 className="text-lg font-semibold">5.1 Our Content</h3>
        <p>
          The Services and all content, features, and functionality (including
          but not limited to software, text, graphics, logos, images, and
          design) are owned by NoUploadTools or our licensors and are protected
          by copyright, trademark, and other intellectual property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable license to
          access and use the Services for personal or internal business purposes
          only.
        </p>

        <h3 className="mt-4 text-lg font-semibold">5.2 Your Content</h3>
        <p>
          You retain all rights to any files you process using our Services.
          Because our tools operate locally in your browser, we do not obtain
          any ownership rights or licenses to your files.
        </p>
        <p>
          However, by using the Services, you grant us a limited license to any
          feedback, suggestions, or ideas you provide to us, which we may use to
          improve the Services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. Privacy and Data Processing
        </h2>
        <p>
          Your use of the Services is also governed by our Privacy Policy,
          available at{" "}
          <a href="/privacy" className="underline">
            nouploadtools.com/privacy
          </a>
          . Please review the Privacy Policy to understand our data practices.
        </p>
        <p className="font-semibold">
          Key Privacy Point: Files you process using our tools are processed
          locally in your browser and are not uploaded to or stored on our
          servers.
        </p>
        <p>
          While we collect certain usage data for analytics and advertising
          purposes, we do not access, collect, or retain the content of files
          you process.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          7. Third-Party Links and Services
        </h2>
        <p>
          The Services may contain links to third-party websites or services
          that are not owned or controlled by NoUploadTools. We have no control
          over, and assume no responsibility for, the content, privacy policies,
          or practices of any third-party websites or services.
        </p>
        <p>
          We use third-party services including Google AdSense for advertising.
          These services are governed by their own terms and privacy policies.
        </p>
        <p>
          You acknowledge and agree that we shall not be responsible or liable
          for any damage or loss caused by your use of third-party websites or
          services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          8. Disclaimers and Limitations
        </h2>

        <h3 className="text-lg font-semibold">8.1 &ldquo;As Is&rdquo; Basis</h3>
        <p className="font-semibold uppercase">
          The Services are provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis without warranties of any kind, either express
          or implied.
        </p>
        <p>
          To the fullest extent permitted by law, we disclaim all warranties,
          including but not limited to:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Implied warranties of merchantability, fitness for a particular
            purpose, and non-infringement
          </li>
          <li>
            Warranties that the Services will be uninterrupted, error-free, or
            secure
          </li>
          <li>
            Warranties regarding the accuracy, reliability, or quality of any
            content or output
          </li>
          <li>
            Warranties that defects will be corrected or that the Services are
            free of viruses
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">
          8.2 Browser-Based Limitations
        </h3>
        <p>
          Our Services rely on your browser&apos;s capabilities and JavaScript
          support. Performance may vary depending on:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Browser type and version</li>
          <li>Device specifications (memory, processor)</li>
          <li>File size and complexity</li>
          <li>Internet connection stability</li>
        </ul>
        <p className="mt-2">
          Large or complex files may cause performance issues or browser
          crashes. We recommend working with reasonably-sized files.
        </p>

        <h3 className="mt-4 text-lg font-semibold">8.3 File Integrity</h3>
        <p>
          While we strive to ensure accurate file processing, you are
          responsible for:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Maintaining backups of your original files</li>
          <li>Verifying the output quality and accuracy</li>
          <li>Ensuring processed files meet your requirements before use</li>
        </ul>
        <p className="mt-2 font-semibold">
          We are not responsible for any loss, corruption, or quality issues
          with processed files.
        </p>

        <h3 className="mt-4 text-lg font-semibold">
          8.4 No Professional Advice
        </h3>
        <p>
          The Services are for informational and utility purposes only and do
          not constitute professional advice. You should consult with
          appropriate professionals for specific advice tailored to your
          situation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
        <p className="font-semibold uppercase">
          To the fullest extent permitted by law, NoUploadTools and its
          affiliates, officers, directors, employees, and agents shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses resulting from:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Your use or inability to use the Services</li>
          <li>
            Any unauthorized access to or use of our servers or personal
            information
          </li>
          <li>Any interruption or cessation of the Services</li>
          <li>
            Any bugs, viruses, or harmful code transmitted through the Services
          </li>
          <li>
            Any errors or omissions in content or any loss or damage incurred as
            a result of using content
          </li>
          <li>Any loss, corruption, or quality issues with processed files</li>
        </ul>
        <p className="mt-2">
          In no event shall our total liability to you for all damages exceed
          the amount of $100 USD or the amount you paid us in the past 12
          months, whichever is greater.
        </p>
        <p className="mt-2 text-sm">
          Some jurisdictions do not allow the exclusion of certain warranties or
          limitation of liability for incidental or consequential damages. In
          such jurisdictions, our liability shall be limited to the maximum
          extent permitted by law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">10. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless NoUploadTools and
          its affiliates, officers, directors, employees, agents, and licensors
          from and against any claims, liabilities, damages, losses, costs,
          expenses, or fees (including reasonable attorneys&apos; fees) arising
          from:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Your use or misuse of the Services</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another person or entity</li>
          <li>Any content you submit or process using the Services</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">11. Termination</h2>
        <p>
          We may terminate or suspend your access to the Services immediately,
          without prior notice or liability, for any reason, including but not
          limited to breach of these Terms.
        </p>
        <p>
          Upon termination, your right to use the Services will cease
          immediately. All provisions of these Terms that by their nature should
          survive termination shall survive, including but not limited to
          ownership provisions, warranty disclaimers, indemnification, and
          limitations of liability.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          12. Governing Law and Jurisdiction
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Country/State], without regard to its conflict of law
          provisions.
        </p>
        <p>
          Any disputes arising out of or relating to these Terms or the Services
          shall be resolved in the courts of [Your Jurisdiction]. You consent to
          the personal jurisdiction of such courts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">13. Dispute Resolution</h2>

        <h3 className="text-lg font-semibold">13.1 Informal Resolution</h3>
        <p>
          If you have any dispute with us, you agree to first contact us and
          attempt to resolve the dispute informally. Contact us at
          write@digiwares.xyz.
        </p>

        <h3 className="mt-4 text-lg font-semibold">13.2 Arbitration</h3>
        <p>
          If we cannot resolve a dispute informally, any dispute shall be
          resolved through binding arbitration in accordance with the rules of
          [Arbitration Association], except as otherwise provided herein. The
          arbitration shall take place in [Your Jurisdiction].
        </p>
        <p className="text-sm">
          You waive any right to a jury trial or to participate in a class
          action lawsuit or class-wide arbitration.
        </p>

        <h3 className="mt-4 text-lg font-semibold">13.3 Exceptions</h3>
        <p>
          Either party may seek injunctive relief or other equitable relief in
          any court of competent jurisdiction to prevent the actual or
          threatened infringement, misappropriation, or violation of
          intellectual property rights.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">14. Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid, illegal, or
          unenforceable, the remaining provisions shall continue in full force
          and effect. The invalid provision shall be modified to the minimum
          extent necessary to make it valid and enforceable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">15. Entire Agreement</h2>
        <p>
          These Terms, together with our Privacy Policy, constitute the entire
          agreement between you and NoUploadTools regarding the Services and
          supersede all prior agreements and understandings.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">16. Waiver</h2>
        <p>
          No waiver of any term or condition of these Terms shall be deemed a
          further or continuing waiver of such term or any other term. Our
          failure to assert any right or provision under these Terms shall not
          constitute a waiver of such right or provision.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">17. Assignment</h2>
        <p>
          You may not assign or transfer these Terms or your rights hereunder
          without our prior written consent. We may assign these Terms at any
          time without notice to you.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">18. Force Majeure</h2>
        <p>
          We shall not be liable for any failure or delay in performance due to
          circumstances beyond our reasonable control, including but not limited
          to acts of God, war, terrorism, riots, natural disasters, or
          governmental actions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">19. Contact Information</h2>
        <p>
          If you have any questions about these Terms or the Services, please
          contact us at:
        </p>
        <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
          <p>
            <strong>Email:</strong> write@digiwares.xyz
          </p>
          <p className="mt-1">
            <strong>Website:</strong>{" "}
            <a
              href="https://nouploadtools.com"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              nouploadtools.com
            </a>
          </p>
        </div>
      </section>

      <section className="rounded-md border border-gray-300 bg-gray-50 p-4 text-sm">
        <p className="font-semibold">Summary of Key Terms:</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>Services provided &ldquo;as is&rdquo; without warranties</li>
          <li>Files processed locally in browser - not uploaded to servers</li>
          <li>You must use Services for lawful purposes only</li>
          <li>
            We are not liable for file loss, corruption, or quality issues
          </li>
          <li>You retain all rights to your files</li>
          <li>Disputes resolved through arbitration in [Your Jurisdiction]</li>
          <li>We may modify or discontinue Services at any time</li>
          <li>Always maintain backups of important files</li>
        </ul>
      </section>
    </div>
  );
}
