"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Toc } from "./Toc";
import { PrevNext } from "./PrevNext";
import { Footer } from "./Footer";
import { GridOverlay } from "./GridOverlay";
import { CommandMenu } from "./CommandMenu";
import { ImageProvider } from "./Images";
import { cn } from "@/lib/utils";

export function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [grid, setGrid] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (grid) document.documentElement.dataset.grid = "";
    else delete document.documentElement.dataset.grid;
  }, [grid]);
  const home = pathname.replace(/\/$/, "") === "";
  const wide = /^\/(blueprints\/(store|bets)|components)\/?$/.test(pathname);
  const detail = /^\/components\/[^/]+\/?$/.test(pathname);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.closest("input, textarea, select, [contenteditable=true]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (!typing && e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (!typing && !e.metaKey && !e.ctrlKey && e.key.toLowerCase() === "g") {
        setGrid((g) => !g);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ImageProvider>
      <ScrollProgress className="fixed top-0 z-50 h-px bg-primary" />
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-primary px-2 py-1 text-on-primary focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <TopBar onMenu={() => setMenuOpen(true)} onSearch={() => setSearchOpen(true)} />
      <div className="flex w-full gap-6 px-2 md:px-3 xl:gap-8">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main id="main" className={cn("min-w-0 flex-1 pt-6 pb-16 md:pt-8", !home && (wide ? "max-w-page" : detail ? "max-w-content" : "max-w-doc"))}>
          {children}
          <PrevNext />
          <Footer />
        </main>
        {!home && !wide && <Toc />}
      </div>
      {grid && <GridOverlay />}
      <CommandMenu open={searchOpen} onClose={() => setSearchOpen(false)} />
      </ImageProvider>
    </MotionConfig>
  );
}
