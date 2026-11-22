import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Rules at a glance" };

const groups: { title: string; href: string; rules: [string, string][] }[] = [
  {
    title: "Spacing and size",
    href: "/foundations/spacing",
    rules: [
      ["S1", "Spacing is a multiple of 8. 4 is the only half step."],
      ["S2", "4 is only for tight spots inside a component: icon to badge text, chip padding."],
      ["S3", "Component heights are 24, 32, 40, 48 or 56."],
      ["S4", "Inner radius = outer radius − padding. A 16 radius card with 8 padding holds an 8 radius tile."],
      ["S5", "Space inside a group is smaller than space between groups."],
    ],
  },
  {
    title: "Layout",
    href: "/foundations/grid",
    rules: [
      ["L1", "12 columns on desktop, 8 on tablet, 4 on phones."],
      ["L2", "Gutters are 24 on desktop and tablet, 16 on phones."],
      ["L3", "Reading text is at most 640 wide (about 70 characters)."],
      ["L4", "The sidebar is 256 wide. Page padding is 32, or 16 on phones."],
    ],
  },
  {
    title: "Color",
    href: "/foundations/color",
    rules: [
      ["C1", "Blue is for actions and the current page."],
      ["C2", "Gold only means points or rewards."],
      ["C3", "Red is only for errors and destructive actions."],
      ["C4", "Titles are solid colors. No gradients, no green titles."],
      ["C5", "Never use color alone to show state. Add text or an icon."],
      ["C6", "No large pure white areas in dark mode."],
    ],
  },
  {
    title: "Type",
    href: "/foundations/typography",
    rules: [
      ["T1", "Satoshi for everything. JetBrains Mono only for code and specs."],
      ["T2", "Line heights are multiples of 4, and most are multiples of 8."],
      ["T3", "Body text is 16 on every screen size. Inputs are 16 so phones don't zoom."],
      ["T4", "Numbers that change use tabular figures."],
    ],
  },
  {
    title: "Interaction",
    href: "/foundations/motion",
    rules: [
      ["I1", "One primary button per view."],
      ["I2", "Every control has hover, pressed, focus-visible and disabled states."],
      ["I3", "Touch targets are at least 44 × 44."],
      ["I4", "Motion is 100, 200, 300 or 500 ms. Longer only for games and celebrations."],
      ["I5", "Reduced motion turns animation down to a fade or nothing."],
    ],
  },
];

export default function Rules() {
  return (
    <article>
      <PageHeader eyebrow="Start here" title="Rules at a glance" lead="Every rule in the system on one page, each with a code you can cite in a design review: “this breaks S4”." />
      <div className="flex flex-col gap-6">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={g.title}>
            <div className="flex items-baseline justify-between pb-2">
              <h2 id={g.title} data-toc={g.title} className="text-xl font-bold tracking-tight">{g.title}</h2>
              <Link href={g.href} className="text-sm font-medium text-text-muted hover:text-text">Details</Link>
            </div>
            <ul className="hairline-divide hairline-y">
              {g.rules.map(([code, text]) => (
                <li key={code} id={code.toLowerCase()} className="flex gap-3 py-2">
                  <span className="w-4 shrink-0 font-mono text-sm text-text-muted">{code}</span>
                  <span className="text-sm text-text">{text}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
