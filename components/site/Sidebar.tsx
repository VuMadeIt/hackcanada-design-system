"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { nav } from "@/lib/nav";
import { asset } from "@/lib/asset";
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
        <div className="flex h-8 shrink-0 items-center gap-1 px-3">
          <Link href="/" className="flex items-center gap-1 rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/logo-circle.png")} alt="" className="size-4" />
            <span className="text-sm leading-tight font-bold">
              Hack Canada
              <span className="block text-caption font-medium text-text-muted">Design System</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="ml-auto grid size-5 place-items-center rounded-sm text-text-muted hover:bg-bg-muted lg:hidden"
            aria-label="Close menu"
          >
            <XMarkIcon className="size-3" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pt-1 pb-4">
          {nav.map((group) => (
            <div key={group.title} className="mb-3">
              <p className="px-1 pb-1 text-caption font-bold tracking-wide text-text-muted uppercase">
                {group.title}
              </p>
              <ul className="flex flex-col">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex h-4 items-center rounded-sm px-1 text-sm transition-colors duration-200",
                          active
                            ? "bg-primary-soft font-bold text-primary-ink"
                            : "text-text-secondary hover:bg-bg-muted hover:text-text",
                        )}
                      >
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
