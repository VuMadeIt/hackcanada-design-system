"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Toc } from "./Toc";
import { PrevNext } from "./PrevNext";
import { GridOverlay } from "./GridOverlay";
import { CommandMenu } from "./CommandMenu";
import { ImageProvider } from "./Images";

export function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [grid, setGrid] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

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
      <ScrollProgress className="fixed z-50 h-half bg-primary" />
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-primary px-2 py-1 text-on-primary focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col lg:pl-32">
          <TopBar
            onMenu={() => setMenuOpen(true)}
            onSearch={() => setSearchOpen(true)}
            grid={grid}
            onGrid={() => setGrid((g) => !g)}
          />
          <div className="mx-auto flex w-full max-w-page gap-5 px-2 pb-16 md:px-4 xl:px-5">
            <main id="main" className="min-w-0 flex-1 pt-4 [counter-reset:sec] md:pt-6">
              {children}
              <PrevNext />
            </main>
            {pathname.replace(/\/$/, "") !== "" && !/^\/blueprints\/(store|bets)/.test(pathname) && <Toc />}
          </div>
        </div>
      </div>
      {grid && <GridOverlay />}
      <CommandMenu open={searchOpen} onClose={() => setSearchOpen(false)} />
      </ImageProvider>
    </MotionConfig>
  );
}
