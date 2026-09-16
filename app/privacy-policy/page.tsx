import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Super Sudoku collects, uses and shares information across the app and website, including advertising through Google AdMob and Meta Audience Network.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <article className="container-page prose-legal mx-auto max-w-3xl pb-20">
        <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-brand-50/50">
          Last updated: 16 September 2026
        </p>

        <p className="mt-6 text-brand-50/75">
          This Privacy Policy explains how {SITE.name} (&quot;we&quot;,
          &quot;our&quot;, or &quot;us&quot;) collects, uses, shares and protects
          information when you use the {SITE.name} mobile application for Android
          and this website (together, the &quot;Service&quot;). The app is
          distributed on Google Play as{" "}
          <span className="whitespace-nowrap">{SITE.playPackage}</span>.
        </p>
        <p className="mt-4 text-brand-50/75">
          We do not ask you to create an account, and we do not knowingly collect
          your name, address or phone number. The app is, however, supported by
          advertising, and advertising involves sharing limited device and
          identifier data with our advertising partners. This policy sets out
          exactly what that means.
        </p>

        <Section title="1. Information We Collect">
          <p>
            <strong>Information you provide.</strong> If you email us, or submit
            feedback from inside the app, we receive the contents of that message
            and the email address you send it from.
          </p>
          <p>
            <strong>Game and device information collected automatically.</strong>{" "}
            When you use the app we and our service providers may collect:
          </p>
          <ul>
            <li>
              Device and technical information — device model, manufacturer,
              operating system version, screen characteristics, language, country
              and time zone, and mobile network or connection type
            </li>
            <li>
              App information — app version and build, installation and session
              identifiers, and the approximate time and length of your sessions
            </li>
            <li>
              Gameplay and usage data — puzzles started and completed, difficulty
              selected, hints and undos used, mistakes made, solve times, streaks,
              achievements and daily-challenge participation
            </li>
            <li>
              Advertising identifiers — your Android Advertising ID (AAID) and
              similar identifiers used to select, deliver, cap and measure ads
            </li>
            <li>
              Diagnostics — crash reports, stack traces, and performance and
              stability data
            </li>
          </ul>
          <p>
            <strong>Stored on your device only.</strong> Your puzzle progress,
            statistics, theme, sound, language and other settings are saved in
            local storage on your device. This data is not uploaded to us and is
            removed when you uninstall the app.
          </p>
        </Section>

        <Section title="2. How We Use Information">
          <ul>
            <li>To provide, operate and maintain the game</li>
            <li>To save your progress, statistics and preferences</li>
            <li>To display advertising and to measure and cap how often ads are shown</li>
            <li>To understand which features are used so we can improve them</li>
            <li>To diagnose crashes, fix bugs and improve performance and stability</li>
            <li>To detect and prevent fraud, invalid traffic and abuse of the Service</li>
            <li>To comply with legal obligations and platform policies</li>
          </ul>
        </Section>

        <Section title="3. Advertising">
          <p>
            The app is free and is funded by advertising. Ads are served through{" "}
            <strong>Google AdMob</strong>, and we use{" "}
            <strong>AdMob Mediation</strong> so that more than one advertising
            network can compete to fill each ad request. The formats we show are
            app open ads, rewarded ads (which you always choose to watch in
            exchange for an in-game reward such as a bonus hint) and, where
            enabled, interstitial ads. We do not show banner ads.
          </p>
          <p>
            Through AdMob Mediation, ad requests may be sent to{" "}
            <strong>Meta Audience Network</strong> in addition to the Google
            AdMob network. When Meta Audience Network takes part in the auction
            for an ad request or serves an ad to you,{" "}
            <strong>
              Meta Platforms, Inc. receives and processes data as an independent
              controller of that data
            </strong>
            . That data can include your advertising identifier, IP address,
            device and app information, and information about the ad shown and
            how you interacted with it. Meta uses it to select and deliver ads,
            to measure their performance and to combat fraud. Meta&apos;s handling
            of that data is governed by its own terms, which you can read in the{" "}
            <a
              href="https://www.facebook.com/about/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 underline"
            >
              Meta Privacy Policy
            </a>{" "}
            and the{" "}
            <a
              href="https://www.facebook.com/legal/terms/businesstools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 underline"
            >
              Meta Business Tools Terms
            </a>
            .
          </p>
          <p>
            <strong>Personalised and non-personalised ads.</strong> Personalised
            ads use your advertising identifier and inferred interests to make the
            ads you see more relevant. Non-personalised ads are targeted using
            only contextual information such as the app you are using and your
            coarse location; they still use identifiers for frequency capping,
            aggregated reporting and fraud prevention. Which of the two you
            receive depends on your consent choice and on the privacy laws that
            apply where you are.
          </p>
          <p>
            <strong>Your controls.</strong> On Android you can reset or delete
            your advertising ID, and opt out of ad personalisation, under{" "}
            <em>Settings → Privacy → Ads</em>. Deleting your advertising ID stops
            ads being personalised, but does not stop ads being shown.
          </p>
        </Section>

        <Section title="4. Consent (Google UMP)">
          <p>
            We manage advertising consent with{" "}
            <strong>
              Google&apos;s User Messaging Platform (UMP), the consent management
              platform built into the Google Mobile Ads SDK
            </strong>
            . Where consent is legally required — in particular for users in the
            European Economic Area, the United Kingdom and Switzerland — the app
            presents a consent form before any ad is requested, and your choice is
            recorded and stored on your device.
          </p>
          <ul>
            <li>
              <strong>No ads before consent.</strong> The app does not initialise
              the ads SDK or request any ad until the consent flow has completed
              and has confirmed that ad requests are permitted.
            </li>
            <li>
              <strong>Your choice is remembered.</strong> You are not asked again
              on every launch. You can change or withdraw your choice at any time
              from <em>Settings → Ad Privacy Settings</em> in the app, where the
              consent form is available again.
            </li>
            <li>
              <strong>Where consent is not required</strong> by local law, no
              consent form is shown and ads are served in line with this policy
              and the platform&apos;s own advertising controls.
            </li>
          </ul>
          <p>
            Consent covers Google and the advertising partners disclosed in the
            consent form, including Meta Audience Network where it is an
            authorised partner for your region.
          </p>
        </Section>

        <Section title="5. Analytics, Crash Reporting and Other Services">
          <p>
            We use the following third-party services. Each has its own privacy
            policy, and we recommend reading them:
          </p>
          <ul>
            <li>
              <strong>Google AdMob</strong> — advertising and AdMob Mediation
            </li>
            <li>
              <strong>Meta Audience Network</strong> — advertising, via AdMob
              Mediation
            </li>
            <li>
              <strong>Google Firebase Analytics</strong> — aggregated usage and
              engagement measurement
            </li>
            <li>
              <strong>Firebase Crashlytics</strong> — crash and stability
              reporting
            </li>
            <li>
              <strong>Firebase Remote Config</strong> — remote feature
              configuration
            </li>
            <li>
              <strong>Cloud Firestore</strong> — storage of feedback you choose to
              submit
            </li>
            <li>
              <strong>Google Play Games Services</strong> — optional sign-in for
              leaderboards, achievements and saved progress
            </li>
            <li>
              <strong>Google Play Services and the Google Play Store</strong> —
              app distribution, updates and in-app review prompts
            </li>
          </ul>
          <p>
            Google Play Games Services is optional. If you do not sign in, no
            Play Games profile information is associated with your use of the app.
          </p>
        </Section>

        <Section title="6. How Information Is Shared">
          <p>
            We do not sell your personal information. We share information only:
          </p>
          <ul>
            <li>
              with the advertising, analytics and infrastructure providers listed
              above, so they can perform those functions
            </li>
            <li>
              where you have consented, or where sharing is otherwise permitted by
              the law that applies to you
            </li>
            <li>
              to comply with a legal obligation, court order or enforceable
              governmental request
            </li>
            <li>
              to protect the rights, safety or property of our users, the public
              or us
            </li>
          </ul>
          <p>
            Our providers operate globally, so information may be processed in
            countries other than your own, including the United States. Where
            required, those transfers rely on safeguards such as the European
            Commission&apos;s standard contractual clauses.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            Progress and settings remain on your device until you clear the
            app&apos;s data or uninstall it. Crash reports and analytics data are
            retained by Google for the periods set out in their documentation and
            in our project configuration. Feedback you submit is retained until it
            is no longer needed to answer you. Advertising data is retained by the
            relevant ad network under its own policy.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>
            Depending on where you live — in particular under the GDPR and UK GDPR
            in Europe, and under laws such as the CCPA/CPRA in parts of the United
            States — you may have the right to:
          </p>
          <ul>
            <li>access the personal data held about you</li>
            <li>have inaccurate data corrected</li>
            <li>have your data deleted</li>
            <li>restrict or object to certain processing, including profiling for advertising</li>
            <li>receive your data in a portable form</li>
            <li>withdraw consent at any time, without affecting processing already carried out</li>
            <li>opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal information for cross-context behavioural advertising</li>
            <li>lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a href={`mailto:${SITE.email}`} className="text-brand-300 underline">
              {SITE.email}
            </a>
            . You can withdraw or change advertising consent yourself at any time
            from <em>Settings → Ad Privacy Settings</em> in the app. Because the
            app has no accounts, we may need additional information to identify
            the data associated with your device before we can act on a request.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            The Service is not directed to children under 13, and we do not
            knowingly collect personal information from them. The app is not
            listed in Google Play&apos;s Designed for Families programme. If you
            believe a child has provided us with personal information, contact us
            and we will delete it.
          </p>
        </Section>

        <Section title="10. Data Security">
          <p>
            We use commercially reasonable measures to protect information,
            including encrypted transport (HTTPS/TLS) for data in transit and the
            access controls provided by our infrastructure providers. No method of
            transmission or storage is completely secure, so we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section title="11. Changes to This Privacy Policy">
          <p>
            We may update this policy from time to time. The revised version will
            be posted on this page with a new &quot;Last updated&quot; date, and
            significant changes will be highlighted in the app or on this website.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            For any question about this Privacy Policy, about how your data is
            handled, or to exercise your rights, contact {SITE.name} at{" "}
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
