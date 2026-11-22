"use client";

import { usePathname } from "next/navigation";
import { mascotFor, slotById } from "@/lib/images";
import { Img } from "./Images";

export function HeaderArt() {
  const id = mascotFor(usePathname());
  return (
    <figure aria-hidden className="hidden shrink-0 md:block">
      <div className="blueprint relative size-24 overflow-hidden rounded-md border border-border">
        <span className="absolute inset-x-2 top-1 flex items-center gap-half">
          <span className="h-1 w-px bg-spec" />
          <span className="h-px flex-1 bg-spec" />
          <span className="font-mono text-mono text-spec-ink">160</span>
          <span className="h-px flex-1 bg-spec" />
          <span className="h-1 w-px bg-spec" />
        </span>
        <Img id={id} alt="" className="absolute inset-x-2 top-4 bottom-2 m-auto h-20 w-40 object-contain" />
      </div>
      <figcaption className="pt-1 font-mono text-mono text-text-muted">{slotById[id]?.label}</figcaption>
    </figure>
  );
}
