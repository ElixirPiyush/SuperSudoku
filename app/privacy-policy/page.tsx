import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { ADDRESS_LINE, PHONE_HREF, SITE } from "@/lib/site";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Super Sudoku collects, uses and shares information: the Monthly League and leaderboard, Firebase, Google Play Games, and advertising through Google AdMob and Meta Audience Network.",
  path: "/privacy-policy/",
});

const TOC = [
  { id: "collect", label: "1. Information we collect" },
  { id: "league", label: "2. Monthly League and leaderboard" },
  { id: "use", label: "3. How we use information" },
  { id: "ads", label: "4. Advertising" },
  { id: "consent", label: "5. Consent (Google UMP)" },
  { id: "services", label: "6. Third-party services" },
  { id: "sharing", label: "7. How information is shared" },
  { id: "retention", label: "8. Data retention" },
  { id: "rights", label: "9. Your rights" },
  { id: "children", label: "10. Children" },
  { id: "security", label: "11. Security" },
  { id: "website", label: "12. This website" },
  { id: "changes", label: "13. Changes" },
  { id: "contact", label: "14. Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="9 October 2026"
      toc={TOC}
      intro={
        <>
          <p>
            This Privacy Policy explains how {SITE.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), developed by {SITE.developer},
            collects, uses, shares and protects information when you use the {SITE.name} app for Android (Google Play package{" "}
            <span className="whitespace-nowrap">{SITE.playPackage}</span>) and this website (together, the &quot;Service&quot;).
          </p>
          <p>
            You do not need to sign up or give us your name, email address or phone number to play. The app does use an
            anonymous account for the Monthly League, it can link that account to Google Play Games if you sign in, it shows a
            display name on a public leaderboard, and it is supported by advertising. This policy explains each of these.
          </p>
        </>
      }
    >
      <LegalSection id="collect" title="1. Information we collect">
        <p><strong>Information you provide.</strong></p>
        <ul>
          <li>Your league <strong>display name</strong> and <strong>country</strong> if you change them (see section 2).</li>
          <li><strong>Feedback</strong> you send from the app: a star rating, any text you type, the app version and the time.</li>
          <li>The content of any <strong>email</strong> you send us, and the address you send it from.</li>
        </ul>
        <p><strong>Collected automatically.</strong> When you use the app, we and our service providers may collect:</p>
        <ul>
          <li>Device and technical information: device model and manufacturer, Android version, screen size, language, country and time zone, network type</li>
          <li>App information: app version and build, installation and session identifiers, approximate time and length of sessions</li>
          <li>Gameplay and usage data: puzzles started and completed, difficulty, hints, undos, mistakes, solve times, streaks, achievements and Daily Challenge participation</li>
          <li>Advertising identifiers: your Android Advertising ID and similar identifiers used to select, deliver, cap and measure ads</li>
          <li>Diagnostics: crash reports, stack traces and performance data</li>
        </ul>
        <p>
          <strong>Stored only on your device.</strong> Your regular puzzle progress, statistics, theme, sound, language and other
          settings are kept in the app&apos;s local storage. They are not uploaded to us and are removed when you uninstall the app or
          clear its data.
        </p>
      </LegalSection>

      <LegalSection id="league" title="2. Monthly League and leaderboard">
        <p>
          The Monthly League runs on our servers (Google Firebase: Authentication, Cloud Firestore and Cloud Functions). To take
          part, the app creates an <strong>anonymous Firebase account</strong> on your device. It is identified by a random user ID
          and contains no name, email or phone number.
        </p>
        <p>
          <strong>Google Play Games link (app version 1.0.23 and later).</strong> If you are signed in to Google Play Games, the app
          links your league account to your Play Games account, so your league progress can be restored after a reinstall or on
          another device. For this, Google issues a one-time code that Firebase Authentication uses to verify your Play Games
          account; Firebase then stores your Play Games player identifier with your league account. We do not receive your Google
          password or email address. If you do not sign in to Play Games, no link is made.
        </p>
        <p>For each player we store on our servers:</p>
        <ul>
          <li>Your user ID, display name and country code (if any)</li>
          <li>Each Daily Challenge you complete: the date, your solved board (checked and not kept), time taken, mistakes, hints, score and stars</li>
          <li>Monthly totals: Monthly Score, days played, streaks, Streak Shield use, rank, badges and rewards</li>
          <li>Your ad-free end date from league rewards, and the time-zone offset used for your league days in each month</li>
          <li>For fair play: a note when a puzzle is solved unusually fast (user ID, date and solve time), reviewed only by us</li>
        </ul>
        <p>
          <strong>Display name and country.</strong> Your display name starts as &quot;Player&quot; plus five characters of your user ID,
          or your Play Games name if you are signed in. The country is detected on your device from your SIM, mobile network and
          time zone, without location permission. You can change your name, choose another country or hide your flag at any time
          on the league screen.
        </p>
        <p>
          <strong>What other players see.</strong> On the leaderboard and in the Top 100, the app shows other players your display
          name, country flag (unless hidden), Monthly Score, days played and rank. Your monthly leaderboard entry (display name,
          flag, random user ID, daily scores and stars, streak and rank) is stored so that signed-in app users can read it; your
          daily records, ad-free time and league history are readable only by you.
        </p>
      </LegalSection>

      <LegalSection id="use" title="3. How we use information">
        <ul>
          <li>To provide the game, the Daily Challenge and the Monthly League, calculate scores and ranks, and deliver rewards</li>
          <li>To save your progress, statistics and preferences</li>
          <li>To show advertising and to measure and cap how often ads are shown</li>
          <li>To understand which features are used so we can improve them</li>
          <li>To diagnose crashes and improve performance and stability</li>
          <li>To keep the league fair and to detect and prevent fraud, invalid ad traffic and abuse</li>
          <li>To answer your messages and to comply with legal obligations and platform policies</li>
        </ul>
      </LegalSection>

      <LegalSection id="ads" title="4. Advertising">
        <p>
          The app is free and funded by advertising, served through <strong>Google AdMob</strong>. We use AdMob Mediation so that
          more than one advertising network can compete to fill each ad request. The formats are app open ads, rewarded ads and
          rewarded interstitial ads (which you choose to watch for something in return, such as a bonus hint, a new theme, opening
          the Top 100 or claiming a league reward) and, where enabled, interstitial ads. We do not show banner ads. While you have
          ad-free time from a league reward, no ads are shown.
        </p>
        <p>
          Through AdMob Mediation, ad requests may be sent to <strong>Meta Audience Network</strong>. When Meta takes part in the
          auction or serves an ad, Meta Platforms, Inc. receives and processes data as an independent controller, including your
          advertising identifier, IP address, device and app information, and information about the ad and your interaction with
          it, to deliver and measure ads and to combat fraud, under the{" "}
          <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</a>.
        </p>
        <p>
          <strong>Personalised and non-personalised ads.</strong> Personalised ads use your advertising identifier and inferred
          interests. Non-personalised ads use contextual information such as the app and your coarse location, and still use
          identifiers for frequency capping, reporting and fraud prevention. Which you receive depends on your consent and local law.
        </p>
        <p>
          <strong>Your controls.</strong> On Android you can reset or delete your advertising ID, or opt out of ad personalisation,
          in your phone&apos;s Settings → Privacy → Ads. This stops personalisation but does not stop ads being shown.
        </p>
      </LegalSection>

      <LegalSection id="consent" title="5. Consent (Google UMP)">
        <p>
          We manage advertising consent with Google&apos;s User Messaging Platform. Where consent is legally required (in particular in
          the European Economic Area, the United Kingdom and Switzerland), the app shows a consent form before any ad is requested,
          and stores your choice on your device. The app does not request ads until the consent flow allows it. You can change your
          choice at any time in the app under Settings → Ad Privacy Settings. Consent covers Google and the partners listed in the
          form, including Meta Audience Network where it is a partner for your region.
        </p>
      </LegalSection>

      <LegalSection id="services" title="6. Third-party services">
        <ul>
          <li>Google AdMob, including AdMob Mediation — advertising</li>
          <li>Meta Audience Network — advertising, through AdMob Mediation</li>
          <li>Firebase Authentication — the anonymous league account and its optional Play Games link</li>
          <li>Cloud Firestore and Cloud Functions — Monthly League data, rewards and feedback</li>
          <li>Google Analytics for Firebase — usage and engagement measurement</li>
          <li>Firebase Crashlytics — crash and stability reports</li>
          <li>Firebase Remote Config — remote feature settings</li>
          <li>Google Play Games Services — optional sign-in, achievements, leaderboards and the league link</li>
          <li>Google Play Services and Google Play — distribution, updates and in-app review prompts</li>
        </ul>
        <p>
          Each service has its own privacy policy. Google&apos;s is at{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.
        </p>
      </LegalSection>

      <LegalSection id="sharing" title="7. How information is shared">
        <p>We do not sell your personal information. We share information only:</p>
        <ul>
          <li>with other players, through the leaderboard described in section 2</li>
          <li>with the service providers listed above, so they can perform their functions</li>
          <li>where you have consented, or where the law that applies to you permits it</li>
          <li>to comply with a legal obligation, court order or enforceable government request</li>
          <li>to protect the rights, safety or property of our users, the public or us</li>
        </ul>
        <p>
          Our providers operate worldwide, so information may be processed outside your country, including in the United States
          and India. Where required, these transfers rely on safeguards such as the European Commission&apos;s standard contractual
          clauses.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="8. Data retention">
        <ul>
          <li>Data on your device stays until you clear the app&apos;s data or uninstall it.</li>
          <li>League data (your league account, profile, daily results, monthly results, rewards and history) is kept while the league runs so that past months and rewards stay available, and is deleted when you ask us to.</li>
          <li>Feedback is kept until it is no longer needed.</li>
          <li>Analytics, crash reports and advertising data are kept by Google and our ad partners for the periods in their own policies and our settings.</li>
        </ul>
      </LegalSection>

      <LegalSection id="rights" title="9. Your rights">
        <p>
          Depending on where you live (for example under the GDPR and UK GDPR, or laws such as the CCPA/CPRA), you may have the right
          to access, correct or delete your personal data, to restrict or object to processing (including profiling for
          advertising), to receive your data in a portable form, to withdraw consent at any time, to opt out of the
          &quot;sale&quot; or &quot;sharing&quot; of personal information for cross-context behavioural advertising, and to complain to your
          data protection authority.
        </p>
        <p>
          To use these rights, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. For league data, include your display
          name and the month you played so we can find your record; we may ask for more information to confirm the data is yours.
          You can change advertising consent yourself under Settings → Ad Privacy Settings in the app.
        </p>
      </LegalSection>

      <LegalSection id="children" title="10. Children">
        <p>
          The Service is not directed to children under 13, and we do not knowingly collect personal information from them. The
          app is not part of Google Play&apos;s Designed for Families programme. If you believe a child has given us personal
          information, contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="security" title="11. Security">
        <p>
          Data is sent over encrypted connections (HTTPS/TLS). League data can only be changed by our server code; the app and
          other players cannot change scores, ranks or rewards, and your private league data (your ad-free time, daily records
          and league history) is readable only by you. No system is completely secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="website" title="12. This website">
        <p>
          This website is a static site hosted on Firebase Hosting. It does not use cookies, analytics or advertising, and it has
          no login. Like any web server, the hosting provider processes your IP address and request details to deliver pages and
          protect the service. The browser version of Sudoku (Play Online) saves your current game in your browser&apos;s local
          storage only. The support form opens your own email app; nothing is sent from the site.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13. Changes">
        <p>
          We may update this policy. The new version will be posted on this page with a new date, and significant changes will be
          highlighted in the app or on this website.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="14. Contact">
        <p>
          Questions about privacy or this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See also our{" "}
          <Link href="/terms/">Terms of Service</Link>.
        </p>
        <p>
          {SITE.developer}, {ADDRESS_LINE}. Phone <a href={PHONE_HREF}>{SITE.phone}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
