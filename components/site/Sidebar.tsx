"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { nav } from "@/lib/nav";
import { IconButton } from "@/components/hc/IconButton";
import { Img } from "./Images";
import { cn } from "@/lib/utils";

export function isActive(pathname: string, href: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? clean === "/" : clean === href;
}

export function SideNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Docs">
      <ul className="flex flex-col gap-4 pb-8">
        {nav.map((group) => (
          <li key={group.title}>
            <p className="pb-2 text-sm font-medium text-text">{group.title}</p>
            <ul className="flex flex-col gap-1 border-l border-border">
              {group.items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "-ml-px flex items-center border-l py-half pl-2 text-sm transition-colors duration-200",
                        active ? "border-primary font-medium text-text" : "border-transparent text-text-muted hover:text-text",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-1 rounded-sm">
      <Img id="brand.logo" alt="" className="size-4" />
      <span className="text-base font-bold tracking-tight">Hack Canada</span>
      <span className="rounded-pill border border-border px-1 text-caption font-medium text-text-muted">Design</span>
    </Link>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <aside className="sticky top-8 hidden h-[calc(100dvh-64px)] w-28 shrink-0 overflow-y-auto pt-6 lg:block" style={{ scrollbarWidth: "none" }}>
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
        <div className="flex h-8 shrink-0 items-center justify-between px-3">
          <Brand />
          <IconButton label="Close menu" onClick={onClose}>
            <XMarkIcon />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pt-2">
          <SideNav />
        </div>
      </aside>
    </>
  );
}
