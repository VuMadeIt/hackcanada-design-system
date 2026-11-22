"use client";

import { useRef, useState } from "react";
import { ArrowPathIcon, ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/hc/Button";
import { Badge } from "@/components/hc/Badge";
import { Alert } from "@/components/hc/Overlay";
import { imageGroups, imageSlots, type ImageSlot } from "@/lib/images";
import { Img, useImages } from "@/components/site/Images";
import { cn } from "@/lib/utils";

const stem = (name: string) => name.split("/").pop()!.replace(/\.[^.]+$/, "").toLowerCase();

function matchSlot(file: File) {
  const s = stem(file.name);
  return imageSlots.find((slot) => stem(slot.file) === s || slot.id.toLowerCase() === s);
}

function SlotCard({ slot }: { slot: ImageSlot }) {
  const { overrides, replace, reset } = useImages();
  const input = useRef<HTMLInputElement>(null);
  const [size, setSize] = useState<string | null>(null);
  const replaced = Boolean(overrides[slot.id]);
  return (
    <li className="flex flex-col overflow-hidden rounded-md border border-border bg-surface">
      <div className={cn("relative grid aspect-[4/3] place-items-center border-b border-border p-3", slot.group === "Store" ? "bg-bg-muted dark:bg-[#b4c2d1]" : "blueprint")}>
        <Img
          id={slot.id}
          ref={(el) => {
            if (el?.complete && el.naturalWidth) setSize(`${el.naturalWidth} × ${el.naturalHeight}`);
          }}
          onLoad={(e) => setSize(`${e.currentTarget.naturalWidth} × ${e.currentTarget.naturalHeight}`)}
          className={cn("max-h-full max-w-full object-contain", slot.group === "Store" && "rounded-sm mix-blend-multiply")}
        />
        <span className="absolute top-1 right-1">{replaced ? <Badge tone="gold">Replaced</Badge> : null}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2">
        <div className="flex items-baseline justify-between gap-1">
          <p className="font-bold">{slot.label}</p>
          <span className="font-mono text-mono text-text-muted tabular">{size ?? "…"}</span>
        </div>
        <p className="truncate font-mono text-mono text-text-muted" title={slot.file}>
          {slot.id} · {slot.file.split("/").pop()}
        </p>
        <p className="text-sm text-text-secondary">Used on: {slot.usedOn.join(", ")}</p>
        <div className="mt-auto flex gap-1 pt-1">
          <input
            ref={input}
            type="file"
            accept="image/*"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) replace(slot.id, f);
              e.target.value = "";
            }}
          />
          <Button size="sm" variant="secondary" leading={<ArrowUpTrayIcon />} onClick={() => input.current?.click()}>
            Replace
          </Button>
          {replaced && (
            <Button size="sm" variant="ghost" leading={<ArrowPathIcon />} onClick={() => reset(slot.id)}>
              Reset
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export function ImageLibrary() {
  const { overrides, replace, resetAll } = useImages();
  const [drag, setDrag] = useState(false);
  const [result, setResult] = useState<{ matched: string[]; missed: string[] } | null>(null);
  const many = useRef<HTMLInputElement>(null);
  const count = Object.keys(overrides).length;

  async function take(files: FileList | File[]) {
    const matched: string[] = [];
    const missed: string[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) continue;
      const slot = matchSlot(f);
      if (slot) {
        await replace(slot.id, f);
        matched.push(`${f.name} → ${slot.label}`);
      } else missed.push(f.name);
    }
    setResult({ matched, missed });
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          take(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center gap-2 rounded-md border-2 border-dashed px-4 py-6 text-center transition-colors duration-200",
          drag ? "border-primary bg-primary-soft" : "border-border-input bg-surface",
        )}
      >
        <PhotoIcon className="size-4 text-primary" />
        <div>
          <p className="text-lg font-bold">Drop a folder of images here</p>
          <p className="max-w-prose pt-half text-sm text-text-secondary">
            Files are matched by name. <code className="font-mono text-mono">charger.png</code> replaces the charger,{" "}
            <code className="font-mono text-mono">beaver-laptop.webp</code> replaces the hero beaver. The new set shows up on every page, in this browser
            only.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-1">
          <input
            ref={many}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(e) => {
              if (e.target.files) take(e.target.files);
              e.target.value = "";
            }}
          />
          <Button leading={<ArrowUpTrayIcon />} onClick={() => many.current?.click()}>
            Choose files
          </Button>
          <Button variant="secondary" leading={<ArrowPathIcon />} disabled={count === 0} onClick={() => resetAll().then(() => setResult(null))}>
            Reset all{count ? ` (${count})` : ""}
          </Button>
        </div>
      </div>

      {result && (
        <Alert tone={result.missed.length ? "warning" : "success"} title={`${result.matched.length} replaced${result.missed.length ? `, ${result.missed.length} not matched` : ""}`}>
          {result.missed.length ? `No slot is named ${result.missed.join(", ")}. Rename the file to match one of the names below.` : "Every file found its slot."}
        </Alert>
      )}

      {imageGroups.map((g) => {
        const slots = imageSlots.filter((s) => s.group === g);
        return (
          <section key={g} aria-labelledby={`img-${g}`}>
            <h2 id={`img-${g}`} data-toc={g} className="flex items-baseline gap-2 pb-2 text-xl font-bold">
              {g}
              <span className="font-mono text-mono font-normal text-text-muted">{slots.length}</span>
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {slots.map((s) => (
                <SlotCard key={s.id} slot={s} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
