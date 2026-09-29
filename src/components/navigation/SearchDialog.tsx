"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { searchIndex } from "@/data/search";

type Props = { open: boolean; onClose: () => void };

/** Site search over a static page index, built on the native <dialog> for focus handling. */
export function SearchDialog({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return searchIndex.slice(0, 8);
    return searchIndex
      .map((entry) => {
        const title = entry.title.toLowerCase();
        const haystack = `${title} ${entry.section.toLowerCase()} ${entry.text.toLowerCase()}`;
        if (!terms.every((t) => haystack.includes(t))) return null;
        const score = terms.reduce((s, t) => s + (title.includes(t) ? 3 : 1), 0);
        return { entry, score };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.entry);
  }, [query]);

  const close = () => {
    setQuery("");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onKeyDown={(e) => {
        // Search inputs swallow the first Escape to clear their text; close immediately instead.
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        }
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      aria-label="Search the site"
      className="m-0 mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl rounded-xl border border-line bg-white p-0 text-charcoal shadow-2xl backdrop:bg-deep/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-5">
        <Search aria-hidden className="size-5 text-slate" />
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <input
          id="site-search"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search solutions, equipment, services…"
          className="h-16 flex-1 bg-transparent text-base outline-none placeholder:text-slate-300 [&::-webkit-search-cancel-button]:appearance-none"
        />
        <button
          type="button"
          onClick={close}
          className="inline-flex size-9 items-center justify-center rounded-md text-slate hover:bg-mist hover:text-deep"
        >
          <X aria-hidden className="size-5" />
          <span className="sr-only">Close search</span>
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-2" aria-live="polite">
        {results.length ? (
          <ul>
            {results.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  onClick={close}
                  className="group flex items-center justify-between gap-4 rounded-lg px-4 py-3 hover:bg-mist focus-visible:bg-mist"
                >
                  <span>
                    <span className="block font-display text-[0.95rem] font-bold text-deep">{r.title}</span>
                    <span className="text-xs font-semibold tracking-wide text-slate uppercase">{r.section}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-grid-green-700" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-slate">
            No pages match &ldquo;{query}&rdquo;.{" "}
            <Link href="/contact" onClick={close} className="font-semibold text-grid-green-700 underline-offset-2 hover:underline">
              Ask our team
            </Link>
          </p>
        )}
      </div>
    </dialog>
  );
}
