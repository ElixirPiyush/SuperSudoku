import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the Super Sudoku app and website, including advertising, rewarded ads and third-party services.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <article className="container-page mx-auto max-w-3xl pb-20">
        <h1 className="text-3xl font-extrabold tracking-tight">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-brand-50/50">
          Last updated: 16 September 2026
        </p>

        <p className="mt-6 text-brand-50/75">
          By accessing or using {SITE.name} (the &quot;Service&quot;) — the
          Android application{" "}
          <span className="whitespace-nowrap">{SITE.playPackage}</span> and this
          website — you agree to be bound by these Terms &amp; Conditions. If you
          do not agree, please do not use the Service.
        </p>

        <Section title="1. Use of the Service">
          <p>
            {SITE.name} is provided free of charge for personal, non-commercial
            entertainment. You agree not to misuse the Service, attempt to disrupt
            or reverse engineer it, interfere with advertising, generate invalid
            or automated ad traffic, or use it in violation of any applicable law
            or of Google Play&apos;s terms.
          </p>
        </Section>

        <Section title="2. No Account Required">
          <p>
            The Service does not require you to create an account. Signing in with
            Google Play Games Services is optional and is used only for
            leaderboards, achievements and saved progress. Your use of Play Games
            is subject to Google&apos;s own terms.
          </p>
        </Section>

        <Section title="3. Advertising and Mediation">
          <p>
            The Service is funded by advertising. Ads are delivered through{" "}
            <strong>Google AdMob</strong>, and we use <strong>AdMob Mediation</strong>{" "}
            so that multiple advertising networks — including{" "}
            <strong>Meta Audience Network</strong> — can compete to fill an ad
            request. When one of those networks serves an ad, that network also
            processes data relating to the ad request under its own terms and
            privacy policy.
          </p>
          <p>
            We do not control and are not responsible for the content of
            third-party advertisements, or for any website, product or service an
            advertisement links to. Ad availability is not guaranteed and may vary
            by region, device and network conditions.
          </p>
          <p>
            How your data is used for advertising, and how to give, change or
            withdraw your consent, is described in our{" "}
            <a href="/privacy-policy/" className="text-brand-300 underline">
              Privacy Policy
            </a>
            .
          </p>
        </Section>

        <Section title="4. Rewarded Ads and In-Game Rewards">
          <p>
            Some ads are <strong>rewarded</strong> ads: you are asked first, and
            you always choose whether to watch. Watching a qualifying rewarded ad
            grants an in-game reward, such as a bonus hint.
          </p>
          <p>
            In-game rewards, hints, streaks, statistics and achievements have no
            monetary value, cannot be exchanged for money or transferred, and may
            be changed or reset. A reward may not be granted if the ad is closed
            early, fails to load or play, or where invalid activity is detected.
          </p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>
            The Service integrates third-party services including Google AdMob,
            Meta Audience Network (via AdMob Mediation), Google Firebase
            (Analytics, Crashlytics, Remote Config and Cloud Firestore), Google
            Play Games Services and Google Play Services. Your use of those
            services is subject to their respective terms and privacy policies.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            All content, design, logos and software associated with the Service
            are the property of {SITE.name} or its licensors and are protected by
            applicable intellectual property laws. Sound assets are used under
            their respective licences, which are listed in the app under{" "}
            <em>Settings → Sound License</em>.
          </p>
        </Section>

        <Section title="7. Disclaimer of Warranties">
          <p>
            The Service is provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind, express or implied. We do not warrant
            that it will be uninterrupted, error-free, free of harmful components,
            or that progress stored on your device will always be preserved.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, {SITE.name} shall not be
            liable for any indirect, incidental, special or consequential damages,
            or for any loss of data or progress, arising from your use of or
            inability to use the Service.
          </p>
        </Section>

        <Section title="9. Termination">
          <p>
            You may stop using the Service at any time by uninstalling the app.
            We may suspend or discontinue the Service, or any part of it, at any
            time without notice.
          </p>
        </Section>

        <Section title="10. Changes to These Terms">
          <p>
            We may update these Terms from time to time. The revised version will
            be posted on this page with a new &quot;Last updated&quot; date, and
            continued use of the Service after the change constitutes acceptance
            of the revised Terms.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            Questions about these Terms? Email {SITE.name} at{" "}
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
