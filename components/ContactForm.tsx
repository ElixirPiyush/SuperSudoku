"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

const TOPICS = ["Monthly League or rewards", "Daily Challenge", "Ads", "Bug report", "Privacy request", "Other"];

/**
 * No backend: the form opens the visitor's email app with a pre-filled
 * message to support. Nothing is sent from this website.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const topic = String(data.get("topic") || "Other");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Super Sudoku: ${topic}`);
    const body = encodeURIComponent(`${message}\n\nPhone model:\nAndroid version:\nApp version (Settings → About):`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="topic" className="mb-1.5 block text-sm font-bold text-brand-900">Topic</label>
        <select id="topic" name="topic" className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-900">
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-brand-900">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-900 placeholder:text-slate/60"
          placeholder="What happened, and what did you expect?"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">Open in my email app</button>
      <p role="status" className="text-sm text-slate">
        {sent
          ? `Your email app should open now. If it doesn't, write to ${SITE.email}.`
          : "This opens your email app with the message filled in; nothing is sent from this website."}
      </p>
    </form>
  );
}
