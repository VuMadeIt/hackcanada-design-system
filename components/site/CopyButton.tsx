"use client";

import { useState } from "react";
import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className="ml-auto flex h-4 items-center gap-half rounded-xs px-1 text-caption text-text-muted hover:bg-surface hover:text-text"
      aria-label={done ? "Copied" : label}
    >
      {done ? <CheckIcon className="size-2 text-success" /> : <Square2StackIcon className="size-2" />}
      {done ? "Copied" : label}
    </button>
  );
}
