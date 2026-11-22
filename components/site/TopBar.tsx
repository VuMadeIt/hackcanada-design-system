"use client";

import { usePathname } from "next/navigation";
import { Bars3Icon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Button } from "@astryxdesign/core/Button";
import { Img } from "./Images";
import { useTheme } from "./theme";

const links = [
  { title: "Docs", href: "/getting-started", match: /^\/(getting-started|rules|principles|foundations)/ },
  { title: "Components", href: "/components", match: /^\/components/ },
  { title: "Motion", href: "/micro-interactions", match: /^\/micro-interactions/ },
  { title: "Patterns", href: "/patterns/page-layout", match: /^\/(patterns|blueprints)/ },
  { title: "Images", href: "/resources/images", match: /^\/resources/ },
];

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="size-2">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function TopBar({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-sm">
      <TopNav
        label="Site"
        heading={
          <div className="flex items-center gap-1">
            <span className="lg:hidden">
              <IconButton variant="ghost" label="Open menu" icon={<Bars3Icon className="size-2" />} onClick={onMenu} />
            </span>
            <TopNavHeading logo={<Img id="brand.logo" alt="" className="size-4" />} heading="Hack Canada" headingHref="/" />
          </div>
        }
        centerContent={
          <div className="hidden items-center gap-half md:flex">
            {links.map((l) => (
              <TopNavItem key={l.href} label={l.title} href={l.href} isSelected={l.match.test(pathname)} />
            ))}
          </div>
        }
        endContent={
          <div className="flex items-center gap-half">
            <IconButton variant="ghost" label="Search" tooltip="Search  ⌘K" icon={<MagnifyingGlassIcon className="size-2" />} onClick={onSearch} />
            <IconButton
              variant="ghost"
              label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              icon={theme === "dark" ? <SunIcon className="size-2" /> : <MoonIcon className="size-2" />}
              onClick={toggle}
            />
            <span className="hidden sm:inline-flex">
              <IconButton variant="ghost" label="GitHub" icon={<GitHubMark />} href="https://github.com/VuMadeIt/hackcanada-design-system" target="_blank" rel="noreferrer" />
            </span>
            <span className="hidden sm:inline-flex">
              <Button variant="primary" label="Get started" href="/getting-started" />
            </span>
          </div>
        }
      />
    </header>
  );
}
