"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { mainNav, type NavItem } from "@/data/navigation";
import { cn } from "@/components/ui/cn";

function isActive(pathname: string, item: NavItem) {
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click and Escape.
  useEffect(() => {
    if (open === null) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-nav-trigger="${open}"]`);
        setOpen(null);
        trigger?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <nav ref={navRef} aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-0.5">
        {mainNav.map((item, i) => {
          const active = isActive(pathname, item);
          const baseItem = cn(
            "relative inline-flex h-10 items-center gap-1 rounded-md px-3 text-[0.9rem] font-semibold transition-colors",
            active ? "text-deep" : "text-charcoal/80 hover:text-deep",
          );
          const indicator = (
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-[15px] h-0.5 rounded-full bg-grid-green transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          );

          if (!item.children) {
            return (
              <li key={item.label}>
                <Link href={item.href} className={baseItem} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                  {indicator}
                </Link>
              </li>
            );
          }

          const isOpen = open === i;
          const panelId = `nav-panel-${i}`;
          const wide = item.children.length > 4;
          return (
            <li
              key={item.label}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                cancelClose();
                setOpen(i);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") scheduleClose();
              }}
            >
              <button
                type="button"
                data-nav-trigger={i}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={baseItem}
              >
                {item.label}
                <ChevronDown
                  aria-hidden
                  className={cn("size-3.5 text-slate transition-transform duration-200", isOpen && "rotate-180")}
                />
                {indicator}
              </button>

              <div
                id={panelId}
                className={cn(
                  "absolute top-full z-50 pt-4 transition-all duration-200 ease-out",
                  // Keep edge panels inside the viewport.
                  i === 0 ? "left-0" : i === mainNav.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2",
                  isOpen ? "visible opacity-100" : "invisible translate-y-1 opacity-0",
                )}
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-20px_rgb(16_23_25/0.35)]",
                    wide ? "w-[40rem]" : "w-[22rem]",
                  )}
                >
                  <ul className={cn("grid gap-1 p-3", wide && "grid-cols-2")}>
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(null)}
                          className="group/link block rounded-lg px-4 py-3 transition-colors hover:bg-mist focus-visible:bg-mist"
                        >
                          <span className="flex items-center gap-1.5 font-display text-[0.92rem] font-bold text-deep">
                            {child.label}
                            <ArrowRight
                              aria-hidden
                              className="size-3.5 -translate-x-1 text-grid-green-700 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100"
                            />
                          </span>
                          {child.description && (
                            <span className="mt-0.5 block text-[0.82rem] leading-snug text-slate">{child.description}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {item.overview && (
                    <Link
                      href={item.overview.href}
                      onClick={() => setOpen(null)}
                      className="flex items-center justify-between border-t border-line bg-mist/70 px-7 py-3.5 font-display text-sm font-bold text-charcoal transition-colors hover:text-grid-green-700"
                    >
                      {item.overview.label}
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
