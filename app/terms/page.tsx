import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the Super Sudoku app and website.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <article className="container-page mx-auto max-w-3xl pb-20">
        <h1 className="text-3xl font-extrabold tracking-tight">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-brand-50/50">Effective Date: April 2026</p>

        <p className="mt-6 text-brand-50/75">
          By accessing or using {SITE.name} (the &quot;Service&quot;), you agree
          to be bound by these Terms &amp; Conditions. If you do not agree, please
          do not use the Service.
        </p>

        <Section title="1. Use of the Service">
          <p>
            {SITE.name} is provided for personal, non-commercial entertainment.
            You agree not to misuse the Service, attempt to disrupt it, or use it
            in violation of any applicable law.
          </p>
        </Section>

        <Section title="2. Intellectual Property">
          <p>
            All content, design, logos, and software associated with the Service
            are the property of {SITE.name} or its licensors and are protected by
            applicable intellectual property laws.
          </p>
        </Section>

        <Section title="3. Advertising & Third Parties">
          <p>
            The Service may display ads and integrate third-party services such as
            Google AdMob, Firebase, and Google Play Games. Your use of those
            services is subject to their respective terms.
          </p>
        </Section>

        <Section title="4. Disclaimer of Warranties">
          <p>
            The Service is provided &quot;as is&quot; without warranties of any
            kind. We do not guarantee that it will be uninterrupted, error-free,
            or free of harmful components.
          </p>
        </Section>

        <Section title="5. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, {SITE.name} shall not be
            liable for any indirect, incidental, or consequential damages arising
            from your use of the Service.
          </p>
        </Section>

        <Section title="6. Changes to These Terms">
          <p>
            We may update these Terms from time to time. Continued use of the
            Service after changes constitutes acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="7. Contact">
          <p>
            Questions about these Terms? Email us at{" "}
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
    <section className="mt-8 space-y-3 text-brand-50/75">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}
