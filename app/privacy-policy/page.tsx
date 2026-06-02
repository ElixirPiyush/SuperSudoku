import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Super Sudoku collects, uses and protects your information across the app and website.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <article className="container-page prose-legal mx-auto max-w-3xl pb-20">
        <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-brand-50/50">Effective Date: April 2026</p>

        <p className="mt-6 text-brand-50/75">
          This Privacy Policy describes how {SITE.name} (&quot;we&quot;,
          &quot;our&quot;, or &quot;us&quot;) collects, uses, and discloses
          information when you use our mobile application and website (the
          &quot;Service&quot;).
        </p>

        <Section title="1. Information We Collect">
          <p>
            We do not collect personally identifiable information unless you
            voluntarily provide it. The app may automatically collect certain
            non-personal information, including:
          </p>
          <ul>
            <li>Device type and operating system</li>
            <li>App usage data (game progress, levels, session duration)</li>
            <li>Crash logs and diagnostics</li>
          </ul>
        </Section>

        <Section title="2. Use of Information">
          <ul>
            <li>Provide and maintain the Service</li>
            <li>Improve app performance and user experience</li>
            <li>Fix bugs and technical issues</li>
            <li>Analyze usage trends</li>
          </ul>
        </Section>

        <Section title="3. Third-Party Services">
          <p>
            The app may use third-party services that may collect information
            used to identify you, including:
          </p>
          <ul>
            <li>Google Firebase (Analytics, Crash Reporting)</li>
            <li>Google AdMob (Advertising)</li>
            <li>Google Play Games Services</li>
          </ul>
          <p>
            These services have their own privacy policies and we recommend
            reviewing them.
          </p>
        </Section>

        <Section title="4. Advertising">
          <p>
            We may display advertisements through third-party ad networks such as
            AdMob. These services may use device identifiers and cookies to show
            relevant ads.
          </p>
        </Section>

        <Section title="5. Data Security">
          <p>
            We value your trust and strive to use commercially acceptable means
            of protecting your information. However, no method of transmission
            over the internet is 100% secure.
          </p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            Our Service is not directed to children under the age of 13. We do
            not knowingly collect personally identifiable information from
            children under 13.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain collected data only as long as necessary for the purposes
            described in this policy.
          </p>
        </Section>

        <Section title="8. Your Consent">
          <p>By using our Service, you consent to this Privacy Policy.</p>
        </Section>

        <Section title="9. Changes to This Privacy Policy">
          <p>
            We may update our Privacy Policy from time to time. Any changes will
            be posted on this page.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, contact us at{" "}
            <a href={`mailto:${SITE.email}`} className="text-brand-300 underline">
              {SITE.email}
            </a>
            .
          </p>
        </Section>

        <p className="mt-10 text-sm text-brand-50/50">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 space-y-3 text-brand-50/75 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}
