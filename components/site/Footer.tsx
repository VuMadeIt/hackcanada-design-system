import Link from "next/link";
import { Img } from "./Images";

const cols = [
  { title: "Docs", links: [["Getting started", "/getting-started"], ["Rules at a glance", "/rules"], ["Design principles", "/principles"], ["Color", "/foundations/color"]] },
  { title: "Library", links: [["Components", "/components"], ["Micro-interactions", "/micro-interactions"], ["Page layout", "/patterns/page-layout"], ["Store blueprint", "/blueprints/store"]] },
  { title: "Resources", links: [["Images", "/resources/images"], ["Tokens", "/resources/tokens"], ["Use with Claude", "/resources/claude"], ["Changelog", "/resources/changelog"]] },
];

export function Footer() {
  return (
    <footer className="mt-12 flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:justify-between">
      <div className="flex max-w-30 flex-col gap-1">
        <Link href="/" className="flex items-center gap-1 rounded-sm">
          <Img id="brand.logo" alt="" className="size-4" />
          <span className="text-base font-bold tracking-tight">Hack Canada</span>
        </Link>
        <p className="text-sm text-text-muted">The design system behind the Hack Canada hacker dashboard.</p>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text">{c.title}</p>
            {c.links.map(([l, h]) => (
              <Link key={h} href={h} className="text-sm text-text-muted transition-colors hover:text-text">
                {l}
              </Link>
            ))}
          </nav>
        ))}
      </div>
    </footer>
  );
}
