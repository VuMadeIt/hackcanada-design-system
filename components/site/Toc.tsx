"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

export function Toc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("main h2[id]"));
    setHeadings(els.map((el) => ({ id: el.id, text: el.dataset.toc ?? el.textContent ?? "" })));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -64% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  if (headings.length < 2) return <div className="hidden w-30 shrink-0 xl:block" />;

  return (
    <aside className="hidden w-30 shrink-0 xl:block">
      <nav aria-label="On this page" className="sticky top-12 pt-5">
        <p className="pb-1 text-caption font-bold tracking-wide text-text-muted uppercase">On this page</p>
        <ul className="border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-half pl-2 text-sm transition-colors duration-200",
                  active === h.id
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-text-muted hover:text-text",
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
