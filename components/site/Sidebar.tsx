"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { nav } from "@/lib/nav";
import { navItemClasses } from "@/components/hc/Display";
import { IconButton } from "@/components/hc/IconButton";
import { Img } from "./Images";
import { cn } from "@/lib/utils";

export function isActive(pathname: string, href: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? clean === "/" : clean === href;
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        aria-label="Site"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-32 flex-col border-r border-border bg-surface transition-transform duration-300 ease-standard",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-8 shrink-0 items-center gap-1 border-b border-border px-2">
          <Link href="/" className="flex items-center gap-1 rounded-sm">
            <Img id="brand.logo" alt="" className="size-4" />
            <span className="text-sm leading-tight font-bold">
              Hack Canada
              <span className="block font-mono text-mono font-normal text-text-muted">Design system · r1.0</span>
            </span>
          </Link>
          <IconButton label="Close menu" onClick={onClose} className="ml-auto lg:hidden">
            <XMarkIcon />
          </IconButton>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pt-2 pb-4">
          {nav.map((group, gi) => (
            <div key={group.title} className="pb-3">
              <p className="flex items-baseline gap-1 px-1 pb-1 text-caption font-bold text-text">
                <span className="font-mono text-mono font-normal text-text-muted tabular">{String(gi).padStart(2, "0")}</span>
                {group.title}
              </p>
              <ul className="flex flex-col">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={active ? "page" : undefined} className={cn(navItemClasses(active), "h-4 pl-4")}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
