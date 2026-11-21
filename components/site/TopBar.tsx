"use client";

import { Bars3Icon, MagnifyingGlassIcon, MoonIcon, SunIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

export function TopBar({
  onMenu,
  onSearch,
  grid,
  onGrid,
}: {
  onMenu: () => void;
  onSearch: () => void;
  grid: boolean;
  onGrid: () => void;
}) {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-8 max-w-page items-center gap-1 px-2 md:px-4 xl:px-5">
        <button
          onClick={onMenu}
          className="grid size-5 place-items-center rounded-sm text-text-secondary hover:bg-bg-muted lg:hidden"
          aria-label="Open menu"
        >
          <Bars3Icon className="size-3" />
        </button>
        <button
          onClick={onSearch}
          className="flex h-5 w-full max-w-40 items-center gap-1 rounded-sm border border-border bg-surface px-2 text-sm text-text-muted transition-colors duration-200 hover:border-border-strong"
        >
          <MagnifyingGlassIcon className="size-2" />
          <span>Search the system</span>
          <kbd className="ml-auto hidden rounded-xs border border-border px-half font-mono text-mono sm:inline">
            Ctrl K
          </kbd>
        </button>
        <div className="ml-auto flex items-center gap-half">
          <button
            onClick={onGrid}
            aria-pressed={grid}
            title="Show the column grid (G)"
            className={cn(
              "hidden h-5 items-center gap-1 rounded-sm px-2 text-sm md:flex",
              grid ? "bg-spec-soft text-spec-ink" : "text-text-secondary hover:bg-bg-muted",
            )}
          >
            <Squares2X2Icon className="size-2" />
            Grid
          </button>
          <button
            onClick={toggle}
            className="grid size-5 place-items-center rounded-sm text-text-secondary hover:bg-bg-muted"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunIcon className="size-3" /> : <MoonIcon className="size-3" />}
          </button>
          <a
            href="https://github.com/VuMadeIt/hackcanada-design-system"
            className="hidden h-5 items-center rounded-sm px-2 text-sm text-text-secondary hover:bg-bg-muted sm:flex"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
