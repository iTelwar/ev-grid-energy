"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck, FileText, Image as ImageIcon, LoaderCircle, Map as MapIcon } from "lucide-react";
import { chargingTypes, propertyTypes, timelines, validateSiteAssessment } from "@/lib/leads/schema";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { ChoiceField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { useLeadForm } from "./useLeadForm";

/** Document types the assessment will accept once uploads are enabled. */
const plannedUploads = [
  { label: "Utility bill", icon: FileText },
  { label: "Site plan", icon: MapIcon },
  { label: "Site photos", icon: ImageIcon },
];

function Section({ step, title, description, children }: { step: number; title: string; description?: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8 first-of-type:border-t-0 first-of-type:pt-0">
      <legend className="float-left mb-6 w-full">
        <span className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-full bg-deep font-display text-xs font-bold text-grid-green">
            {step}
          </span>
          <span className="font-display text-lg font-extrabold text-deep">{title}</span>
        </span>
        {description && <span className="mt-1.5 block pl-10 text-sm text-slate">{description}</span>}
      </legend>
      <div className="clear-left grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function SiteAssessmentForm() {
  const { formRef, statusRef, status, errors, message, reference, onSubmit } = useLeadForm("site-assessment", validateSiteAssessment);

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)] outline-none sm:p-12">
        <CircleCheck aria-hidden className="size-12 text-grid-green-700" strokeWidth={1.5} />
        <h2 className="mt-6 text-3xl font-extrabold text-deep">Thank you. We&rsquo;ve received your request.</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">
          Our team will review your site details and follow up to schedule your site assessment.
        </p>
        {reference && (
          <p className="mt-6 inline-flex rounded-md bg-mist px-4 py-2 text-sm text-charcoal">
            Reference: <span className="ml-2 font-mono font-semibold text-deep">{reference}</span>
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/resources#what-to-prepare" className={buttonClasses("dark")}>
            What to prepare
          </Link>
          <Link href="/" className={buttonClasses("outline")}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";
  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-required-note"
      className="relative rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-10"
    >
      <Honeypot />
      <p id="form-required-note" className="mb-8 text-sm text-slate">
        Fields marked <span className="font-semibold text-grid-green-700">*</span> are required.
      </p>

      <div
        ref={statusRef}
        tabIndex={-1}
        role={status === "error" || errorCount ? "alert" : undefined}
        className="outline-none"
      >
        {(status === "error" || errorCount > 0) && (
          <div className="mb-8 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
            <p>{message || `Please review ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}.`}</p>
          </div>
        )}
      </div>

      <div className="space-y-10">
        <Section step={1} title="Contact information">
          <TextField name="name" label="Name" required autoComplete="name" error={errors.name} />
          <TextField name="company" label="Company" required autoComplete="organization" error={errors.company} />
          <TextField name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
          <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
        </Section>

        <Section step={2} title="Project site" description="Tell us where the charging will be installed.">
          <TextField
            name="projectAddress"
            label="Project address"
            required
            autoComplete="street-address"
            hint="Street address, or city and state if the site is not yet confirmed."
            error={errors.projectAddress}
            className="sm:col-span-2"
          />
          <SelectField name="propertyType" label="Property type" required options={propertyTypes} error={errors.propertyType} />
          <TextField name="parkingSpaces" label="Number of parking spaces" type="number" inputMode="numeric" min={0} error={errors.parkingSpaces} />
        </Section>

        <Section step={3} title="Charging requirements" description="Best estimates are fine. We will refine these during the assessment.">
          <div className="sm:col-span-2">
            <ChoiceField name="chargingType" legend="Charging type" options={chargingTypes} required error={errors.chargingType} />
          </div>
          <TextField name="estimatedChargers" label="Estimated number of chargers" type="number" inputMode="numeric" min={0} error={errors.estimatedChargers} />
          <TextField
            name="fleetSize"
            label="Fleet size, if applicable"
            type="number"
            inputMode="numeric"
            min={0}
            error={errors.fleetSize}
          />
          <TextField
            name="electricalService"
            label="Existing electrical service, if known"
            placeholder="e.g. 800A, 480V three-phase"
            error={errors.electricalService}
            className="sm:col-span-2"
          />
        </Section>

        <Section step={4} title="Timeline & details">
          <SelectField name="timeline" label="Project timeline" options={timelines} placeholder="Select a timeline…" error={errors.timeline} className="sm:col-span-2" />
          <TextAreaField
            name="notes"
            label="Project description / notes"
            placeholder="Goals, who will use the chargers, known constraints, questions…"
            error={errors.notes}
            className="sm:col-span-2"
          />
        </Section>

        {/* Upload architecture placeholder: clearly marked as not yet available. */}
        <section aria-labelledby="documents-title" className="rounded-xl border border-dashed border-slate-200 bg-mist/60 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 id="documents-title" className="font-display text-base font-extrabold text-deep">
              Supporting documents
            </h3>
            <span className="rounded-full bg-slate/12 px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-slate uppercase">
              Online upload coming soon
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Online document upload is not yet available. After you submit, our team will let you know how to share
            these if they are available:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {plannedUploads.map(({ label, icon: Icon }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm text-charcoal">
                <Icon aria-hidden className="size-4 text-slate" />
                {label}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate sm:max-w-sm">
          We use the information you provide to respond to your request and prepare for your site assessment.
        </p>
        <button type="submit" disabled={submitting} className={cn(buttonClasses("primary", "lg"), "disabled:cursor-wait disabled:opacity-70")}>
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" /> Submitting…
            </>
          ) : (
            "Request Site Assessment"
          )}
        </button>
      </div>
    </form>
  );
}
