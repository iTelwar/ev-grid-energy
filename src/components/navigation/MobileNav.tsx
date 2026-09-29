"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { primaryCta } from "@/data/site";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

type Props = { open: boolean; onClose: () => void; id: string };

/** Full-height mobile / tablet navigation panel with accordion groups. */
export function MobileNav({ open, onClose, id }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id={id}
      ref={panelRef}
      hidden={!open}
      className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto overscroll-contain bg-white xl:hidden"
    >
      <nav aria-label="Mobile" className="mx-auto flex min-h-full max-w-2xl flex-col px-5 pt-2 pb-8 sm:px-8">
        <ul className="divide-y divide-line">
          {mainNav.map((item, i) => {
            if (!item.children) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-14 items-center font-display text-lg font-bold text-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = expanded === i;
            const groupId = `${id}-group-${i}`;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={groupId}
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="flex min-h-14 w-full items-center justify-between text-left font-display text-lg font-bold text-deep"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className={cn("size-5 text-slate transition-transform duration-200", isOpen && "rotate-180")}
                  />
                </button>
                <ul id={groupId} hidden={!isOpen} className="pb-4">
                  {item.children.map((child) => (
                    <li key={child.href + child.label}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="flex min-h-11 items-center border-l-2 border-line pl-4 text-[0.95rem] font-medium text-charcoal transition-colors hover:border-grid-green hover:text-deep"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                  {item.overview && (
                    <li>
                      <Link
                        href={item.overview.href}
                        onClick={onClose}
                        className="flex min-h-11 items-center border-l-2 border-line pl-4 text-[0.95rem] font-semibold text-grid-green-700"
                      >
                        {item.overview.label}
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
          <Link href={primaryCta.href} onClick={onClose} className={buttonClasses("primary", "lg")}>
            {primaryCta.label}
          </Link>
          <Link href="/contact" onClick={onClose} className={buttonClasses("outline", "lg")}>
            Contact Us
          </Link>
        </div>
      </nav>
    </div>
  );
}
