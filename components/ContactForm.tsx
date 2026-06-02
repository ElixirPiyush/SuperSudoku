"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Static-export friendly contact form. With no backend available, it composes
 * a pre-filled email via the user's mail client (mailto). Swap the handler for
 * a real endpoint (Formspree/Firebase Function) later if desired.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Super Sudoku — message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 p-6 sm:p-8">
      {sent && (
        <div className="flex items-center gap-2 rounded-lg bg-brand/15 px-4 py-3 text-sm text-brand-200">
          <CheckCircle2 size={18} /> Opening your email app… if nothing happens,
          email us at {SITE.email}.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" />
        <Field label="Email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-50/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white placeholder:text-brand-50/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          placeholder="How can we help?"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        <Send size={16} /> Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-50/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white placeholder:text-brand-50/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      />
    </div>
  );
}
