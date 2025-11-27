import type { Metadata } from "next";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how NoUploadTools protects your privacy. Our tools run entirely in your browser without uploading files to servers.",
  alternates: {
    canonical: `${siteUrl}/privacy/`
  },
  openGraph: {
    url: `${siteUrl}/privacy/`,
    type: "website",
    title: "Privacy Policy | NoUploadTools"
  }
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6 text-base text-gray-800">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Last Updated: November 27, 2025
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p>
          Welcome to NoUploadTools (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;). We are committed to protecting your privacy and
          ensuring that your personal information is handled responsibly. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website{" "}
          <a
            href="https://nouploadtools.com"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            nouploadtools.com
          </a>{" "}
          (the &ldquo;Site&rdquo;).
        </p>
        <p>
          Please read this Privacy Policy carefully. By using our Site, you
          agree to the collection and use of information in accordance with this
          policy. If you do not agree with the terms of this Privacy Policy,
          please do not access the Site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Our Core Privacy Principle</h2>
        <p className="font-semibold">
          Your files never leave your device when using our tools.
        </p>
        <p>
          NoUploadTools is built on a fundamental principle of privacy: all file
          processing happens locally in your browser using JavaScript. When you
          convert an image to PDF, compress a file, or use any of our utilities,
          your files are processed entirely on your device. We do not upload,
          transmit, store, or have any access to the content of your files.
        </p>
        <p>
          This means that sensitive documents, personal photos, confidential
          reports, or any other files you process remain completely private and
          under your control at all times.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Information We Collect</h2>

        <h3 className="text-lg font-semibold">3.1 Information You Provide</h3>
        <p>
          We do not require you to create an account or provide personal
          information to use our tools. However, if you contact us via email or
          feedback forms, we may collect:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Your name (if provided)</li>
          <li>Email address</li>
          <li>Message content</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">
          3.2 Automatically Collected Information
        </h3>
        <p>
          When you visit our Site, we may automatically collect certain
          information about your device and browsing behavior, including:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Device type</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referring website</li>
          <li>Date and time of visits</li>
        </ul>
        <p className="mt-2 text-sm italic">
          Important: We do NOT collect, access, or have any visibility into the
          files you process using our tools. File contents remain entirely on
          your device.
        </p>

        <h3 className="mt-4 text-lg font-semibold">
          3.3 Cookies and Tracking Technologies
        </h3>
        <p>We use cookies and similar tracking technologies including:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Essential Cookies:</strong> Required for the Site to
            function properly
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors
            use our Site
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Used by third-party
            advertising partners (Google AdSense)
          </li>
        </ul>
        <p className="mt-2">
          You can control cookies through your browser settings. However,
          disabling cookies may affect the functionality of the Site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          4. How We Use Your Information
        </h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Provide, maintain, and improve our services</li>
          <li>Understand and analyze how you use our Site</li>
          <li>Develop new features and functionality</li>
          <li>Communicate with you, including responding to your inquiries</li>
          <li>Monitor and analyze usage trends and preferences</li>
          <li>Detect, prevent, and address technical issues</li>
          <li>Display relevant advertisements</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p className="mt-2 font-semibold">
          We do NOT use, access, or process the content of files you convert or
          process using our tools.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Third-Party Services and Disclosure
        </h2>

        <h3 className="text-lg font-semibold">5.1 Google AdSense</h3>
        <p>
          We use Google AdSense to display advertisements on our Site. Google
          may use cookies and similar technologies to serve ads based on your
          prior visits to our Site or other websites. You can opt out of
          personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </p>

        <h3 className="mt-4 text-lg font-semibold">5.2 Analytics Services</h3>
        <p>
          We may use analytics services (such as Google Analytics) to help us
          understand how users interact with our Site. These services may
          collect information about your use of our Site and other websites.
        </p>

        <h3 className="mt-4 text-lg font-semibold">
          5.3 When We May Share Information
        </h3>
        <p>We may share your information in the following situations:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>With Service Providers:</strong> Third parties that perform
            services on our behalf (hosting, analytics, advertising)
          </li>
          <li>
            <strong>For Legal Reasons:</strong> When required by law or to
            protect our rights
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger,
            sale, or acquisition
          </li>
          <li>
            <strong>With Your Consent:</strong> When you explicitly agree to
            share information
          </li>
        </ul>
        <p className="mt-2 font-semibold">
          We never share, sell, or disclose the content of files you process
          using our tools because we never have access to them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. However, no method of
          transmission over the internet or electronic storage is 100% secure.
          While we strive to protect your information, we cannot guarantee
          absolute security.
        </p>
        <p>
          Because our tools process files locally in your browser, the security
          of your file contents depends on your device security, not our
          servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Your Privacy Rights</h2>

        <h3 className="text-lg font-semibold">7.1 General Rights</h3>
        <p>Depending on your location, you may have the following rights:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Access:</strong> Request access to your personal information
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate
            information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal
            information
          </li>
          <li>
            <strong>Objection:</strong> Object to processing of your information
          </li>
          <li>
            <strong>Portability:</strong> Request transfer of your information
          </li>
          <li>
            <strong>Withdraw Consent:</strong> Withdraw consent at any time
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">
          7.2 GDPR Rights (European Users)
        </h3>
        <p>
          If you are located in the European Economic Area (EEA), you have
          additional rights under the General Data Protection Regulation (GDPR),
          including the right to lodge a complaint with a supervisory authority.
        </p>

        <h3 className="mt-4 text-lg font-semibold">
          7.3 CCPA Rights (California Users)
        </h3>
        <p>
          If you are a California resident, you have rights under the California
          Consumer Privacy Act (CCPA), including:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Right to know what personal information is collected</li>
          <li>Right to delete personal information</li>
          <li>Right to opt-out of the sale of personal information</li>
          <li>Right to non-discrimination for exercising your rights</li>
        </ul>
        <p className="mt-2 text-sm">
          Note: We do not sell personal information to third parties.
        </p>

        <h3 className="mt-4 text-lg font-semibold">
          7.4 How to Exercise Your Rights
        </h3>
        <p>
          To exercise any of these rights, please contact us at
          write@digiwares.xyz. We will respond to your request within 30 days.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Children&apos;s Privacy</h2>
        <p>
          Our Site is not intended for children under the age of 13 (or 16 in
          the EEA). We do not knowingly collect personal information from
          children. If you believe we have collected information from a child,
          please contact us immediately, and we will take steps to delete such
          information.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          9. International Data Transfers
        </h2>
        <p>
          Your information may be transferred to and processed in countries
          other than your country of residence. These countries may have
          different data protection laws. By using our Site, you consent to such
          transfers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">10. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy, unless a longer
          retention period is required by law.
        </p>
        <p>
          Files you process using our tools are not retained by us because they
          never leave your device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">11. Do Not Track Signals</h2>
        <p>
          Some browsers have a &ldquo;Do Not Track&rdquo; feature. Currently, we
          do not respond to Do Not Track signals. We will follow industry
          developments on this topic and update our practices as appropriate.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          12. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the &ldquo;Last Updated&rdquo; date at the top.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes are effective when posted on this page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">13. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our privacy
          practices, please contact us at:
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
        <p className="font-semibold">Summary of Key Privacy Points:</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>Your files never leave your device - all processing is local</li>
          <li>We do not access, store, or transmit your file contents</li>
          <li>We use cookies and analytics to improve the Site experience</li>
          <li>Third-party services (AdSense, Analytics) may collect data</li>
          <li>You have rights to access, correct, and delete your data</li>
          <li>We comply with GDPR and CCPA privacy regulations</li>
          <li>This policy may be updated - check back periodically</li>
        </ul>
      </section>
    </div>
  );
}
