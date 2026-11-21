"use client";

import { useMemo, useState } from "react";
import * as Outline from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const picks = [
  "HomeIcon", "UserCircleIcon", "UserGroupIcon", "CalendarDaysIcon", "TrophyIcon", "ShoppingBagIcon", "QrCodeIcon", "ChartBarIcon",
  "SparklesIcon", "BoltIcon", "FireIcon", "GiftIcon", "TicketIcon", "PuzzlePieceIcon", "RocketLaunchIcon", "CodeBracketIcon",
  "CommandLineIcon", "CpuChipIcon", "LightBulbIcon", "MapPinIcon", "ClockIcon", "BellIcon", "Cog6ToothIcon", "ArrowRightIcon",
  "ArrowLeftIcon", "ChevronDownIcon", "ChevronRightIcon", "XMarkIcon", "CheckIcon", "PlusIcon", "MinusIcon", "MagnifyingGlassIcon",
  "PencilSquareIcon", "TrashIcon", "ArrowPathIcon", "ShareIcon", "LinkIcon", "DocumentTextIcon", "PhotoIcon", "EyeIcon",
  "EyeSlashIcon", "LockClosedIcon", "InformationCircleIcon", "ExclamationTriangleIcon", "CheckCircleIcon", "XCircleIcon", "SunIcon", "MoonIcon",
] as const;

export function IconGallery() {
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState("");
  const list = useMemo(() => picks.filter((n) => n.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="flex flex-col gap-2">
      <label className="relative max-w-80">
        <span className="sr-only">Search icons</span>
        <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-2 size-2 -translate-y-1/2 text-text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search 48 icons" className="h-5 w-full rounded-sm border border-border-input bg-surface pr-2 pl-5 text-base focus:border-primary focus:shadow-focus focus:outline-none" />
      </label>
      <ul className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {list.map((n) => {
          const I = Outline[n];
          return (
            <li key={n}>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(n);
                  setCopied(n);
                  setTimeout(() => setCopied(""), 1200);
                }}
                className="flex h-12 w-full flex-col items-center justify-center gap-1 rounded-sm border border-border bg-surface text-text transition-colors hover:border-primary hover:text-primary focus-visible:shadow-focus focus-visible:outline-none"
              >
                <I className="size-3" aria-hidden />
                <span className="w-full truncate px-half font-mono text-mono text-text-muted">{copied === n ? "Copied" : n.replace("Icon", "")}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
