"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { quoteCta } from "@/data/site";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { SearchDialog } from "@/components/navigation/SearchDialog";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ctrl/Cmd + K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <header className="sticky top-0 z-50 [--header-h:4.5rem]">
      {/* Blur lives on a separate layer: backdrop-filter on the header itself would
          become the containing block for the fixed mobile menu. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b backdrop-blur-md transition-shadow duration-300",
          menuOpen ? "bg-white" : "bg-white/92",
          scrolled || menuOpen ? "border-line shadow-[0_8px_30px_-18px_rgb(16_23_25/0.35)]" : "border-line/60",
        )}
      />
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[90rem] items-center gap-6 px-5 sm:px-8 lg:px-10">
        <Logo priority className="w-[150px] sm:w-[172px]" />

        <div className="ml-auto flex items-center gap-2 xl:ml-6 xl:flex-1 xl:justify-between">
          <DesktopNav />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="inline-flex size-11 items-center justify-center rounded-md text-charcoal transition-colors hover:bg-mist hover:text-deep"
            >
              <Search aria-hidden className="size-5" strokeWidth={1.8} />
              <span className="sr-only">Search the site</span>
            </button>

            <div className="hidden sm:block">
              <Link href={quoteCta.href} className={buttonClasses("primary", "md", "whitespace-nowrap")}>
                {quoteCta.label}
              </Link>
            </div>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-md text-deep transition-colors hover:bg-mist xl:hidden"
            >
              {menuOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      <MobileNav id="mobile-nav" open={menuOpen} onClose={closeMenu} />
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
