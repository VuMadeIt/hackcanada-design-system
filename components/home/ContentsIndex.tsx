"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { nav } from "@/lib/nav";
import { Img } from "@/components/site/Images";
import { cn } from "@/lib/utils";

const about: Record<string, { body: string; image: string }> = {
  "Start here": { body: "Setup, the one-page rule sheet, and how to read this site.", image: "mascot.laptop" },
  Principles: { body: "What we believe, the UX laws we lean on, Gestalt and contrast.", image: "mascot.idea" },
  Foundations: { body: "Color, type, the rule of 8, grid, radius, icons, imagery, motion.", image: "mascot.pencil" },
  Components: { body: "Every part of the dashboard, measured live, in every state.", image: "mascot.business" },
  Patterns: { body: "Forms, empty and error states, redeeming, the challenge flow.", image: "mascot.star" },
  Motion: { body: "Twenty-one micro-interactions you can replay and copy.", image: "games.cup" },
  Blueprints: { body: "Whole screens with their redlines, plus the Figma audit.", image: "shop.pico" },
  Resources: { body: "Tokens, the image library and the changelog.", image: "mascot.money" },
};

export function ContentsIndex() {
  const groups = nav.slice(1);
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="relative" onMouseLeave={() => setHover(null)}>
      <ol className="border-t border-text">
        {groups.map((g, i) => {
          const a = about[g.title];
          return (
            <li key={g.title} className="border-b border-border">
              <Link
                href={g.items[0].href}
                onMouseEnter={() => setHover(g.title)}
                onFocus={() => setHover(g.title)}
                className="group grid grid-cols-[32px_1fr_auto] items-baseline gap-x-2 py-3 md:grid-cols-[48px_1fr_1fr_80px_24px] md:gap-x-3"
              >
                <span className="font-mono text-mono text-text-muted tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-2xl font-bold tracking-tight transition-[color,transform] duration-200 ease-standard group-hover:translate-x-1 group-hover:text-primary md:text-4xl">
                  {g.title}
                </span>
                <span className="col-start-2 row-start-2 pt-half text-sm text-text-secondary md:col-start-3 md:row-start-1 md:pt-0 md:text-base">{a?.body}</span>
                <span className="hidden font-mono text-mono text-text-muted tabular md:block">
                  {g.items.length} {g.items.length === 1 ? "page" : "pages"}
                </span>
                <ArrowUpRightIcon className="size-3 self-center text-text-muted transition-[color,transform] duration-200 group-hover:translate-x-half group-hover:-translate-y-half group-hover:text-primary" />
              </Link>
            </li>
          );
        })}
      </ol>
      <AnimatePresence>
        {hover && about[hover] && (
          <motion.div
            key={hover}
            aria-hidden
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className={cn("pointer-events-none absolute -top-12 right-0 hidden size-30 rounded-md border border-border bg-surface p-2 shadow-float xl:block")}
          >
            <Img id={about[hover].image} alt="" className="size-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
