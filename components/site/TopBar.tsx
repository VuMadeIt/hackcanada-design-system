"use client";

import { usePathname } from "next/navigation";
import { Bars3Icon, MagnifyingGlassIcon, MoonIcon, SunIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/hc/IconButton";
import { buttonClasses } from "@/components/hc/Button";
import { nav } from "@/lib/nav";
import { isActive } from "./Sidebar";
import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

function Crumb() {
  const pathname = usePathname();
  const gi = nav.findIndex((g) => g.items.some((i) => isActive(pathname, i.href)));
  if (gi < 0) return null;
  const item = nav[gi].items.find((i) => isActive(pathname, i.href))!;
  return (
    <p className="hidden min-w-0 items-center gap-1 truncate text-sm md:flex">
      <span className="font-mono text-mono text-text-muted tabular">{String(gi).padStart(2, "0")}</span>
      <span className="text-text-muted">{nav[gi].title}</span>
      <span aria-hidden className="text-border-strong">/</span>
      <span className="truncate font-bold">{item.title}</span>
    </p>
  );
}

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
    <header className="sticky top-0 z-30 border-b border-border bg-bg">
      <div className="mx-auto flex h-8 max-w-page items-center gap-2 px-2 md:px-4 xl:px-5">
        <IconButton label="Open menu" onClick={onMenu} className="lg:hidden">
          <Bars3Icon />
        </IconButton>
        <Crumb />
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={onSearch}
            className="flex h-5 w-full items-center gap-1 rounded-sm border border-border-input bg-surface px-1 text-sm text-text-muted transition-colors duration-200 hover:border-primary sm:w-30"
          >
            <MagnifyingGlassIcon className="size-2 shrink-0" />
            <span className="truncate">Search</span>
            <kbd className="ml-auto hidden rounded-xs border border-border px-half font-mono text-mono sm:inline">Ctrl K</kbd>
          </button>
          <button
            onClick={onGrid}
            aria-pressed={grid}
            title="Show the column grid (G)"
            className={cn(buttonClasses("ghost", "md"), "hidden md:inline-flex", grid && "bg-spec-soft text-spec-ink hover:bg-spec-soft hover:text-spec-ink")}
          >
            <Squares2X2Icon className="size-2" />
            Grid
            <kbd className="rounded-xs border border-current/30 px-half font-mono text-mono font-normal">G</kbd>
          </button>
          <IconButton label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggle}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
          <a href="https://github.com/VuMadeIt/hackcanada-design-system" className={cn(buttonClasses("ghost", "md"), "hidden sm:inline-flex")}>
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
