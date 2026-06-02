import type { Metadata } from "next";
import Link from "next/link";
import { Mail, HelpCircle, Shield, FileText } from "lucide-react";
import { SITE } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Get in touch with the Super Sudoku team. Find support, FAQs, our privacy policy and terms & conditions.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Contact"
            title="We'd love to hear from you"
            subtitle="Questions, feedback or bug reports — reach out and we'll get back to you."
          />
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_340px]">
          <ContactForm />

          <aside className="space-y-4">
            <a
              href={`mailto:${SITE.email}`}
              className="glass flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-300">
                <Mail size={20} />
              </span>
              <div>
                <div className="font-semibold text-white">Email support</div>
                <div className="text-sm text-brand-50/60">{SITE.email}</div>
              </div>
            </a>

            <LinkCard href="/#faq" icon={<HelpCircle size={20} />} title="FAQ" desc="Common questions answered" external={false} />
            <LinkCard href="/privacy-policy/" icon={<Shield size={20} />} title="Privacy Policy" desc="How we handle your data" external={false} />
            <LinkCard href="/terms/" icon={<FileText size={20} />} title="Terms & Conditions" desc="The rules of the road" external={false} />
          </aside>
        </div>
      </section>
    </>
  );
}

function LinkCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  external: boolean;
}) {
  return (
    <Link
      href={href}
      className="glass flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-300">
        {icon}
      </span>
      <div>
        <div className="font-semibold text-white">{title}</div>
        <div className="text-sm text-brand-50/60">{desc}</div>
      </div>
    </Link>
  );
}
