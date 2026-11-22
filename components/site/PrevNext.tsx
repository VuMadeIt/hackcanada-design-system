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
    <nav aria-label="Pages" className="mt-12 grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="group rounded-md border border-border bg-surface p-2 transition-colors duration-200 hover:border-primary">
          <span className="flex items-center gap-1 text-caption text-text-muted">
            <ArrowLeftIcon className="size-2 transition-transform duration-200 group-hover:-translate-x-half" /> Previous
          </span>
          <span className="block pt-half font-bold">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="group rounded-md border border-border bg-surface p-2 text-right transition-colors duration-200 hover:border-primary">
          <span className="flex items-center justify-end gap-1 text-caption text-text-muted">
            Next <ArrowRightIcon className="size-2 transition-transform duration-200 group-hover:translate-x-half" />
          </span>
          <span className="block pt-half font-bold">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
