import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { ADDRESS_LINE, PHONE_HREF, SITE } from "@/lib/site";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms for using Super Sudoku: the app and website, the Monthly League, fair play, display names, ad-free rewards, rewarded ads and third-party services.",
  path: "/terms/",
});

const TOC = [
  { id: "use", label: "1. Using the Service" },
  { id: "accounts", label: "2. Accounts and Play Games" },
  { id: "league", label: "3. Monthly League" },
  { id: "fair-play", label: "4. Fair play" },
  { id: "names", label: "5. Display names" },
  { id: "rewards", label: "6. League rewards" },
  { id: "ads", label: "7. Advertising and rewarded ads" },
  { id: "third-party", label: "8. Third-party services" },
  { id: "ip", label: "9. Intellectual property" },
  { id: "warranty", label: "10. Disclaimer" },
  { id: "liability", label: "11. Limitation of liability" },
  { id: "termination", label: "12. Changes and termination" },
  { id: "contact", label: "13. Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="9 October 2026"
      toc={TOC}
      intro={
        <p>
          By using {SITE.name} (the &quot;Service&quot;) — the Android app {SITE.playPackage} and this website — you agree to these
          Terms. If you do not agree, please do not use the Service. Our <Link href="/privacy-policy/">Privacy Policy</Link>{" "}
          explains how we handle data.
        </p>
      }
    >
      <LegalSection id="use" title="1. Using the Service">
        <p>
          {SITE.name} is free for personal, non-commercial entertainment. You agree not to misuse it: not to disrupt, reverse
          engineer or attack it, not to interfere with advertising or generate invalid or automated ad traffic, and not to use it
          against the law or Google Play&apos;s terms.
        </p>
      </LegalSection>

      <LegalSection id="accounts" title="2. Accounts and Play Games">
        <p>
          You do not need to create an account. For the Monthly League the app creates an anonymous account on your device.
          Signing in to Google Play Games is optional; from app version 1.0.23 it links your league progress to your Play Games
          account so it can be restored on a new install. Your use of Play Games is subject to Google&apos;s terms.
        </p>
      </LegalSection>

      <LegalSection id="league" title="3. Monthly League">
        <ul>
          <li>Taking part is free and open to everyone who completes the Daily Challenge in the app. Each month is a separate league that starts on the 1st.</li>
          <li>Daily Scores, Monthly Scores and ranks are calculated by our server using the rules published on the <Link href="/monthly-league/">Monthly League page</Link>. Only the first completion of each day&apos;s puzzle counts.</li>
          <li>Ties are decided in favour of the player who reached the score first.</li>
          <li>A month&apos;s results become final when the month has ended in every time zone and the league is closed. We may still correct results that are wrong because of a technical error or a breach of these Terms.</li>
          <li>We may change the league rules, scoring or rewards for future months, or pause or end the league. Changes do not affect rewards already awarded for a closed month.</li>
        </ul>
      </LegalSection>

      <LegalSection id="fair-play" title="4. Fair play">
        <p>
          Play with your own logic. You must not use bots, scripts, solvers, modified apps, automation, several accounts or any
          other way to gain an unfair advantage, and you must not interfere with other players or the league&apos;s servers.
          Unusual results may be reviewed. If we find a breach, we may remove scores or entries, withhold or cancel rewards and
          restrict access to the league.
        </p>
      </LegalSection>

      <LegalSection id="names" title="5. Display names">
        <p>
          Your display name and country flag are shown to other players. Do not use a name that is offensive, hateful, sexual,
          misleading, an impersonation of another person or brand, or that contains personal information such as a phone number.
          We may change or remove names that break this rule.
        </p>
      </LegalSection>

      <LegalSection id="rewards" title="6. League rewards">
        <ul>
          <li>Monthly rewards are ad-free time in the app (30, 14, 7, 3 or 1 days depending on final rank) and badges, as listed on the Monthly League page. There are no cash prizes, gift cards or physical prizes.</li>
          <li>Rewards are claimed in the app by the player who earned them, once. From app version 1.0.23 claiming may ask you to watch a short video first (not while you already have ad-free time).</li>
          <li>Ad-free time is added to any ad-free time you still have and runs in calendar days from the moment you claim. It applies to the app on the league account that earned it.</li>
          <li>Rewards and badges have no monetary value and cannot be sold, transferred or exchanged.</li>
        </ul>
      </LegalSection>

      <LegalSection id="ads" title="7. Advertising and rewarded ads">
        <p>
          The Service is funded by advertising delivered through Google AdMob with AdMob Mediation, including Meta Audience
          Network. We are not responsible for the content of third-party ads or the sites and products they link to, and ads may
          not always be available.
        </p>
        <p>
          Rewarded ads are optional: you are asked first and choose whether to watch. A completed video can give an in-game
          benefit such as a bonus hint, applying a new theme, opening the Top 100 or claiming a league reward. A benefit may not
          be given if the video is closed early, fails to load or play, or if invalid activity is detected. In-game benefits,
          hints, streaks, statistics and achievements have no monetary value and may be changed or reset.
        </p>
      </LegalSection>

      <LegalSection id="third-party" title="8. Third-party services">
        <p>
          The Service uses third-party services including Google AdMob, Meta Audience Network, Google Firebase (Authentication,
          Cloud Firestore, Cloud Functions, Analytics, Crashlytics and Remote Config), Google Play Games Services and Google Play.
          Your use of them is subject to their own terms and privacy policies.
        </p>
      </LegalSection>

      <LegalSection id="ip" title="9. Intellectual property">
        <p>
          The {SITE.name} name, logo, design, content and software belong to {SITE.developer} or its licensors. Sound assets are
          used under their licences, listed in the app under Settings → Sound License.
        </p>
      </LegalSection>

      <LegalSection id="warranty" title="10. Disclaimer">
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind. We do not promise that it will
          be uninterrupted or error-free, that the league will always be available, or that progress stored on your device will
          always be kept.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="11. Limitation of liability">
        <p>
          To the extent allowed by law, {SITE.developer} is not liable for indirect, incidental, special or consequential damages,
          or for loss of data, progress, ranks or rewards, arising from your use of or inability to use the Service.
        </p>
      </LegalSection>

      <LegalSection id="termination" title="12. Changes and termination">
        <p>
          You can stop using the Service at any time by uninstalling the app. We may change, suspend or end the Service or any part
          of it. We may update these Terms; the new version will be posted here with a new date, and continuing to use the Service
          means you accept it.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="13. Contact">
        <p>
          Questions about these Terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p>
          {SITE.developer}, {ADDRESS_LINE}. Phone <a href={PHONE_HREF}>{SITE.phone}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
