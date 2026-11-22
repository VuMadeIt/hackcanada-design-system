"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { flatNav } from "@/lib/nav";
import { isActive } from "./Sidebar";

export function PrevNext() {
  const pathname = usePathname();
  const i = flatNav.findIndex((n) => isActive(pathname, n.href));
  if (i <= 0) return null;
  const prev = flatNav[i - 1];
  const next = flatNav[i + 1];
  return (
    <nav aria-label="Pages" className="mt-12 flex items-center justify-between gap-2 border-t border-border pt-3">
      {prev ? (
        <Link href={prev.href} className="group flex flex-col gap-half">
          <span className="flex items-center gap-1 text-caption text-text-muted">
            <ArrowLeftIcon className="size-2 transition-transform duration-200 group-hover:-translate-x-half" /> Previous
          </span>
          <span className="text-sm font-medium text-text transition-colors group-hover:text-primary">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="group flex flex-col items-end gap-half text-right">
          <span className="flex items-center justify-end gap-1 text-caption text-text-muted">
            Next <ArrowRightIcon className="size-2 transition-transform duration-200 group-hover:translate-x-half" />
          </span>
          <span className="text-sm font-medium text-text transition-colors group-hover:text-primary">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
