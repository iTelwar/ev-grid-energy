import { ChevronDown } from "lucide-react";
import { cn } from "@/components/ui/cn";

const control =
  "block w-full rounded-md border bg-white px-4 text-[0.95rem] text-deep shadow-[inset_0_1px_2px_rgb(16_23_25/0.04)] transition-colors placeholder:text-slate-300 focus:border-grid-green-700 focus:ring-2 focus:ring-grid-green/25 focus:outline-none";

type FieldProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
};

function describedBy(name: string, hint?: string, error?: string) {
  return [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(" ") || undefined;
}

function FieldShell({ name, label, required, hint, error, className, children }: FieldProps & { children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-charcoal">
        {label}
        {required ? (
          <span className="ml-0.5 text-grid-green-700" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-slate">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = FieldProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export function TextField({ name, label, required, hint, error, className, ...rest }: InputProps) {
  return (
    <FieldShell {...{ name, label, required, hint, error, className }}>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={cn(control, "h-12", error ? "border-red-600" : "border-slate-200")}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectProps = FieldProps & { options: readonly string[]; placeholder?: string; defaultValue?: string };

export function SelectField({ name, label, required, hint, error, className, options, placeholder = "Select…", defaultValue = "" }: SelectProps) {
  return (
    <FieldShell {...{ name, label, required, hint, error, className }}>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, hint, error)}
          className={cn(control, "h-12 appearance-none pr-10", error ? "border-red-600" : "border-slate-200")}
        >
          <option value="" disabled={required}>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-slate" />
      </div>
    </FieldShell>
  );
}

type TextAreaProps = FieldProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;

export function TextAreaField({ name, label, required, hint, error, className, ...rest }: TextAreaProps) {
  return (
    <FieldShell {...{ name, label, required, hint, error, className }}>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={cn(control, "py-3 leading-relaxed", error ? "border-red-600" : "border-slate-200")}
        {...rest}
      />
    </FieldShell>
  );
}

type ChoiceProps = { name: string; legend: string; options: readonly string[]; required?: boolean; error?: string };

/** Segmented radio group - large touch targets for short option lists. */
export function ChoiceField({ name, legend, options, required, error }: ChoiceProps) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2 block text-sm font-semibold text-charcoal">
        {legend}
        {required && (
          <span className="ml-0.5 text-grid-green-700" aria-hidden>
            *
          </span>
        )}
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((o) => (
          <label
            key={o}
            className={cn(
              "flex h-12 cursor-pointer items-center justify-center rounded-md border bg-white px-3 text-center text-sm font-semibold text-charcoal transition-colors",
              "hover:border-charcoal/40 has-[:checked]:border-grid-green-700 has-[:checked]:bg-grid-green-50 has-[:checked]:text-deep",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-grid-green/40",
              error ? "border-red-600" : "border-slate-200",
            )}
          >
            <input type="radio" name={name} value={o} required={required} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Hidden anti-spam field. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
