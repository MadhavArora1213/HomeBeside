"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";

const fieldClass =
  "h-11 w-full rounded-xl border-brand-accent bg-brand-background px-4 text-base placeholder:text-brand-muted focus-visible:border-brand-secondary focus-visible:ring-brand-secondary/30";

const topics = [
  "Book a helper",
  "Pricing & payments",
  "Trust & safety",
  "Become a helper",
  "Something else",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    topic: topics[0],
    message: "",
  });

  function update<K extends keyof typeof values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-brand-accent/50 bg-brand-surface p-10 text-center shadow-lg shadow-brand-primary/5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-success/25 text-brand-primary">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-heading text-2xl font-bold text-brand-primary">
          Thank you, {values.name.split(" ")[0] || "friend"}.
        </h3>
        <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-brand-ink/70">
          Our care desk has received your message and will respond within one business day.
          For anything urgent, please call us directly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues({ name: "", email: "", phone: "", topic: topics[0], message: "" });
          }}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-primary/30 px-6 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-accent/30"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-brand-accent/50 bg-brand-surface p-6 shadow-lg shadow-brand-primary/5 sm:p-8"
    >
      <h3 className="font-heading text-2xl font-bold text-brand-ink">Send us a message</h3>
      <p className="mt-1.5 text-sm text-brand-ink/70">
        Tell us what you need and a member of our care desk will get back to you.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            className={fieldClass}
            placeholder="Amanpreet Kaur"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            className={fieldClass}
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="topic">Topic</Label>
          <select
            id="topic"
            value={values.topic}
            onChange={(e) => update("topic", e.target.value)}
            className={`${fieldClass} cursor-pointer appearance-none`}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="message">How can we help?</Label>
          <Textarea
            id="message"
            rows={5}
            className="w-full rounded-xl border-brand-accent bg-brand-background p-4 text-base placeholder:text-brand-muted focus-visible:border-brand-secondary focus-visible:ring-brand-secondary/30"
            placeholder="Share a few details about the care you are looking for…"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="mt-6 h-12 w-full rounded-full bg-brand-primary text-sm font-semibold text-brand-background hover:bg-brand-ink sm:w-auto sm:px-8"
      >
        <Send className="mr-2 h-4 w-4" />
        Send message
      </Button>

      <p className="mt-4 text-xs text-brand-muted">
        By submitting this form you agree to our Terms & Conditions and Privacy Policy.
      </p>
    </form>
  );
}
