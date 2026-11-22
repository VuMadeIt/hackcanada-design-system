"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SideNav as AxSideNav, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { TextInput } from "@astryxdesign/core/TextInput";
import { IconButton } from "@astryxdesign/core/IconButton";
import { nav } from "@/lib/nav";
import { Img } from "./Images";
import { cn } from "@/lib/utils";

export function isActive(pathname: string, href: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? clean === "/" : clean === href;
}

export function SideNav() {
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const groups = nav
    .map((g) => ({ ...g, items: g.items.filter((i) => !query || i.title.toLowerCase().includes(query)) }))
    .filter((g) => g.items.length);
  return (
    <div className="flex flex-col gap-2">
      <TextInput label="Filter pages" isLabelHidden placeholder="Search pages…" startIcon="search" value={q} onChange={setQ} hasClear size="sm" />
      <AxSideNav>
        {groups.map((g) => (
          <SideNavSection key={g.title} title={g.title}>
            {g.items.map((item) => (
              <SideNavItem key={item.href} label={item.title} href={item.href} isSelected={isActive(pathname, item.href)} size="sm" />
            ))}
          </SideNavSection>
        ))}
      </AxSideNav>
      {!groups.length && <p className="px-1 text-sm text-text-muted">No pages match “{q}”.</p>}
    </div>
  );
}

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-1 rounded-sm">
      <Img id="brand.logo" alt="" className="size-4" />
      <span className="text-base font-bold tracking-tight whitespace-nowrap">Hack Canada</span>
    </Link>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <aside className="sticky top-8 hidden h-[calc(100dvh-64px)] w-30 shrink-0 overflow-y-auto pt-2 pb-8 lg:block" style={{ scrollbarWidth: "thin" }}>
        <SideNav />
      </aside>
      <div
        aria-hidden
        onClick={onClose}
        className={cn("fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}
      />
      <aside
        aria-label="Menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-36 max-w-[85vw] flex-col bg-bg transition-transform duration-300 ease-standard lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-8 shrink-0 items-center justify-between px-2">
          <Brand />
          <IconButton variant="ghost" label="Close menu" icon={<XMarkIcon className="size-2" />} onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto px-2 pt-1 pb-4">
          <SideNav />
        </div>
      </aside>
    </>
  );
}
