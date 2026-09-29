"use client";

import { useRef, useState } from "react";
import type { FieldErrors, ValidationResult } from "@/lib/leads/schema";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Shared submit logic: validates in the browser with the same rules as the
 * server, posts to /api/leads, maps field errors and moves focus to the
 * first problem (or the status message) for keyboard and screen reader users.
 */
export function useLeadForm<T>(type: "site-assessment" | "contact", validate: (raw: Record<string, unknown>) => ValidationResult<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState<string | null>(null);

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      if (el) el.focus();
      else statusRef.current?.focus();
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = { ...Object.fromEntries(new FormData(event.currentTarget)), type };

    const local = validate(raw);
    if (!local.ok) {
      setErrors(local.errors);
      setStatus("idle");
      focusFirstError(local.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const json = (await res.json()) as { ok: boolean; reference?: string | null; errors?: FieldErrors; message?: string };
      if (json.ok) {
        setReference(json.reference ?? null);
        setStatus("success");
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        focusFirstError(json.errors);
      }
      setMessage(json.message ?? "Please review the highlighted fields.");
      setStatus("error");
    } catch {
      setMessage("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  return { formRef, statusRef, status, errors, message, reference, onSubmit };
}
