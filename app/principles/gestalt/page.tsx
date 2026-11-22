import type { Metadata } from "next";
import { PageHeader } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Gestalt" };

function Dots({ kind }: { kind: string }) {
  const base = "size-2 rounded-pill";
  if (kind === "proximity")
    return (
      <div className="flex gap-4">
        {[0, 1].map((g) => (
          <div key={g} className="grid grid-cols-3 gap-1">{Array.from({ length: 9 }).map((_, i) => <span key={i} className={`${base} bg-primary`} />)}</div>
        ))}
      </div>
    );
  if (kind === "similarity")
    return <div className="grid grid-cols-6 gap-2">{Array.from({ length: 18 }).map((_, i) => <span key={i} className={`${base} ${i % 6 < 2 ? "bg-gold" : "bg-primary"}`} />)}</div>;
  if (kind === "region")
    return (
      <div className="flex gap-2">
        {[0, 1].map((g) => (
          <div key={g} className="grid grid-cols-3 gap-1 rounded-sm bg-primary-soft p-2">{Array.from({ length: 6 }).map((_, i) => <span key={i} className={`${base} bg-primary`} />)}</div>
        ))}
      </div>
    );
  if (kind === "continuity")
    return (
      <div className="flex items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="size-3 rounded-pill border-2 border-primary" />
            {i < 3 && <span className="mx-half h-[2px] w-6 bg-primary" />}
          </span>
        ))}
      </div>
    );
  if (kind === "closure")
    return <div className="size-12 rounded-md border-4 border-dashed border-primary" />;
  return (
    <div className="relative h-12 w-30 rounded-md bg-bg-muted">
      <span className="absolute top-2 left-2 h-8 w-16 rounded-sm bg-surface shadow-float" />
    </div>
  );
}

const items = [
  ["proximity", "Proximity", "Things close together look like they belong together.", "Space inside a group is always smaller than space between groups: 8 inside a field, 24 between fields, 48 between sections."],
  ["similarity", "Similarity", "Things that look alike seem related.", "Every chip that means points is gold. Every primary action is blue. Never reuse a look for something unrelated."],
  ["region", "Common region", "Things inside a shared boundary feel grouped.", "Cards and tiles group content. One boundary per group, never a card inside a card."],
  ["continuity", "Continuity", "The eye follows lines and curves.", "Timelines connect steps with a line that stops at the edge of each circle, so the path reads without crossing the nodes."],
  ["closure", "Closure", "People fill in gaps to see whole shapes.", "Skeletons only need rough blocks for people to read the layout that's coming."],
  ["figure", "Figure and ground", "People separate what's in front from what's behind.", "Dialogs dim the page and lift on a shadow. Elevation only means “on top”, never decoration."],
];

export default function Gestalt() {
  return (
    <article>
      <PageHeader eyebrow="Principles" title="Gestalt" lead="How people group what they see. These six ideas explain why spacing, color and borders do so much of the work in a layout." />
      <ul className="grid gap-x-3 gap-y-6 sm:grid-cols-2">
        {items.map(([k, t, rule, here]) => (
          <li key={k} className="flex flex-col gap-1">
            <div className="blueprint grid h-24 place-items-center rounded-md border border-border p-3">
              <Dots kind={k} />
            </div>
            <h2 id={k} data-toc={t} className="scroll-mt-12 pt-1 text-base font-bold">
              {t}
            </h2>
            <p className="text-sm text-text">{rule}</p>
            <p className="text-sm text-text-muted">{here}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
