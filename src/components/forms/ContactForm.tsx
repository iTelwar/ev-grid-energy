"use client";

import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { contactTopics, validateContact } from "@/lib/leads/schema";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { useLeadForm } from "./useLeadForm";

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const { formRef, statusRef, status, errors, message, reference, onSubmit } = useLeadForm("contact", validateContact);

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)] outline-none sm:p-10">
        <CircleCheck aria-hidden className="size-10 text-grid-green-700" strokeWidth={1.5} />
        <h2 className="mt-5 text-2xl font-extrabold text-deep">Thanks for reaching out.</h2>
        <p className="mt-3 text-slate">We&rsquo;ve received your message and will get back to you.</p>
        {reference && <p className="mt-5 text-sm text-slate">Reference: <span className="font-mono font-semibold text-deep">{reference}</span></p>}
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const topic = contactTopics.find((t) => t === defaultTopic) ?? "";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
      <Honeypot />
      <div ref={statusRef} tabIndex={-1} role={status === "error" || errorCount ? "alert" : undefined} className="outline-none">
        {(status === "error" || errorCount > 0) && (
          <div className="mb-6 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
            <p>{message || "Please review the highlighted fields."}</p>
          </div>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Name" required autoComplete="name" error={errors.name} />
        <TextField name="company" label="Company" autoComplete="organization" error={errors.company} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
        <SelectField name="topic" label="Topic" required options={contactTopics} defaultValue={topic} error={errors.topic} className="sm:col-span-2" />
        <TextAreaField name="message" label="Message" required error={errors.message} className="sm:col-span-2" />
      </div>
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(buttonClasses("dark", "lg"), "w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto")}
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
}
