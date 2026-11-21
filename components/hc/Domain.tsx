"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowsPointingOutIcon, ClockIcon, LockClosedIcon, QrCodeIcon, TrophyIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export type ShopItem = { name: string; detail: string; price: number; stock: number; image?: string };

export function ShopItemCard({ item, balance = 300, onRedeem }: { item: ShopItem; balance?: number; onRedeem?: () => void }) {
  const soldOut = item.stock === 0;
  const low = !soldOut && item.stock <= 5;
  const short = item.price > balance;
  return (
    <article className="flex w-full max-w-36 flex-col gap-2 rounded-md border border-border bg-surface p-2 shadow-card">
      <div data-spec="image tile" className="group relative aspect-square overflow-hidden rounded-sm bg-bg-muted">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} className={cn("absolute inset-0 size-full object-contain p-2 mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04] dark:mix-blend-normal", soldOut && "opacity-40 grayscale")} />
        ) : null}
        <span className="absolute top-1 left-1">
          {soldOut ? <span className="inline-flex h-3 items-center rounded-pill bg-ink px-1 text-caption font-bold text-white">Sold out</span> : low ? <Badge tone="danger">Only {item.stock} left</Badge> : null}
        </span>
        {item.image && (
          <span className="absolute right-1 bottom-1 grid size-4 place-items-center rounded-sm bg-surface/90 text-text-secondary opacity-0 shadow-card transition-opacity group-hover:opacity-100">
            <ArrowsPointingOutIcon className="size-2" />
          </span>
        )}
      </div>
      <div className="flex items-start gap-1 px-half">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold">{item.name}</p>
          <p className="text-sm text-text-muted">{item.detail}</p>
        </div>
        <div className="text-right">
          <p className="text-base font-bold tabular">{item.price} pts</p>
          {!soldOut && <p className="text-caption text-text-muted tabular">{item.stock} left</p>}
        </div>
      </div>
      <Button size="md" variant={short || soldOut ? "secondary" : "primary"} disabled={soldOut} onClick={onRedeem} className="w-full">
        {soldOut ? "Sold out" : short ? `Need ${item.price - balance} more pts` : "Redeem"}
      </Button>
    </article>
  );
}

const catTone: Record<string, string> = {
  Social: "bg-primary-soft text-primary",
  Sponsor: "bg-gold-soft text-gold-ink",
  Build: "bg-success-soft text-success",
};

export function ChallengeCard({
  title,
  category,
  points,
  difficulty,
  status,
  qr,
}: {
  title: string;
  category: keyof typeof catTone;
  points: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "not_started" | "in_progress" | "completed";
  qr?: boolean;
}) {
  return (
    <article className="flex w-full max-w-40 flex-col gap-2 rounded-md border border-border bg-surface p-3 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-half hover:shadow-float">
      <div className="flex items-center gap-1">
        <span className={cn("rounded-pill px-1 text-caption font-bold leading-[24px]", catTone[category])}>{category}</span>
        <span className="text-caption text-text-muted">{difficulty}</span>
        <span className="ml-auto rounded-pill bg-gold-soft px-1 text-caption leading-[24px] font-bold text-gold-ink tabular">+{points} pts</span>
      </div>
      <p className="text-lg font-bold">{title}</p>
      <div className="flex items-center gap-1 text-sm text-text-muted">
        {qr ? <QrCodeIcon className="size-2" /> : <UserGroupIcon className="size-2" />}
        {qr ? "Scan with a volunteer" : "Checked by an organizer"}
      </div>
      <div className="flex items-center gap-1 border-t border-border pt-2">
        {status === "completed" ? (
          <Badge tone="success" dot>Completed</Badge>
        ) : status === "in_progress" ? (
          <Badge tone="primary" dot>In progress</Badge>
        ) : (
          <Badge tone="neutral">
            <LockClosedIcon className="size-[12px]" /> QR locked
          </Badge>
        )}
        <Button size="sm" variant={status === "not_started" ? "primary" : "secondary"} className="ml-auto">
          {status === "not_started" ? "Start challenge" : "View"}
        </Button>
      </div>
    </article>
  );
}

export function MarketCard({ question, yes, pool, closes, onPick }: { question: string; yes: number; pool: number; closes: string; onPick?: (side: "YES" | "NO") => void }) {
  return (
    <article className="flex w-full max-w-48 flex-col gap-2 rounded-md border border-border bg-surface p-3 shadow-card">
      <div className="flex items-center gap-1 text-caption text-text-muted">
        <ClockIcon className="size-2" /> Closes {closes}
        <span className="ml-auto tabular">{pool.toLocaleString()} pts in pool</span>
      </div>
      <p className="text-lg font-bold">{question}</p>
      <div className="flex h-1 overflow-hidden rounded-pill bg-bg-muted" aria-label={`${yes}% yes`}>
        <motion.span className="bg-primary" initial={{ width: 0 }} animate={{ width: `${yes}%` }} transition={{ duration: 0.5 }} />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Button onClick={() => onPick?.("YES")}>Yes · {yes}%</Button>
        <Button variant="secondary" onClick={() => onPick?.("NO")}>No · {100 - yes}%</Button>
      </div>
    </article>
  );
}

export function BetSlip({ side = "YES", balance = 240 }: { side?: "YES" | "NO"; balance?: number }) {
  const [stake, setStake] = useState(25);
  const payout = Math.round(stake * (side === "YES" ? 1.6 : 2.4));
  return (
    <div className="flex w-full max-w-40 flex-col gap-2 rounded-md border border-border bg-surface p-3 shadow-float">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Your bet</p>
        <Badge tone={side === "YES" ? "primary" : "neutral"}>{side}</Badge>
      </div>
      <label className="flex flex-col gap-1">
        <span className="flex justify-between text-sm">
          <span className="font-medium">Stake</span>
          <span className="font-bold tabular">{stake} pts</span>
        </span>
        <input type="range" min={5} max={100} step={5} value={stake} onChange={(e) => setStake(+e.target.value)} className="h-3 w-full accent-[var(--hc-primary)]" />
        <span className="flex justify-between text-caption text-text-muted tabular">
          <span>5</span>
          <span>100</span>
        </span>
      </label>
      <div className="flex justify-between rounded-sm bg-bg-muted p-2 text-sm">
        <span className="text-text-muted">If you win</span>
        <span className="font-bold text-success tabular">+{payout} pts</span>
      </div>
      <Button size="lg" disabled={stake > balance}>Place bet</Button>
      <p className="text-center text-caption text-text-muted">Balance {balance} pts · bets lock when the market closes</p>
    </div>
  );
}

export function Leaderboard({ rows }: { rows: { name: string; points: number; you?: boolean }[] }) {
  return (
    <ol className="w-full max-w-48 divide-y divide-border overflow-hidden rounded-md border border-border bg-surface">
      {rows.map((r, i) => (
        <li key={r.name} className={cn("flex h-7 items-center gap-2 px-2", r.you && "bg-primary-soft")}>
          <span className={cn("grid size-3 place-items-center rounded-pill text-caption font-bold tabular", i === 0 ? "bg-gold text-ink" : i < 3 ? "bg-bg-muted text-text" : "text-text-muted")}>
            {i + 1}
          </span>
          <Avatar name={r.name} size="sm" />
          <span className="flex-1 truncate text-sm font-bold">
            {r.name}
            {r.you && <span className="pl-1 font-medium text-primary">You</span>}
          </span>
          {i === 0 && <TrophyIcon className="size-2 text-gold" />}
          <span className="text-sm font-bold tabular">{r.points.toLocaleString()}</span>
        </li>
      ))}
    </ol>
  );
}

export function MiniGameCard({ title, body, image, plays }: { title: string; body: string; image: string; plays: string }) {
  return (
    <article className="group flex w-full max-w-40 flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-standard hover:-translate-y-half hover:shadow-float">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="size-full object-cover transition-transform duration-500 ease-standard group-hover:scale-105" />
        <span className="absolute top-2 left-2"><Badge tone="gold">{plays}</Badge></span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-sm text-text-muted">{body}</p>
        <Button className="mt-1 self-start">Play</Button>
      </div>
    </article>
  );
}

export const demoShop: ShopItem[] = [
  { name: "Sour Patch Kids", detail: "370 g bag", price: 20, stock: 50, image: asset("/img/shop/sour-patch-kids.jpg") },
  { name: "LED Strips", detail: "10 ft", price: 60, stock: 4, image: asset("/img/shop/led-strips.jpg") },
  { name: "Tamagotchi", detail: "Original", price: 120, stock: 0, image: asset("/img/shop/tamagotchi.jpg") },
  { name: "Charger", detail: "Anker MagGo", price: 250, stock: 30, image: asset("/img/shop/charger.jpg") },
  { name: "Microcontroller", detail: "Raspberry Pi Pico", price: 150, stock: 30, image: asset("/img/shop/microcontroller.jpg") },
  { name: "Screwdrivers", detail: "11 piece set", price: 90, stock: 30, image: asset("/img/shop/screwdrivers.jpg") },
];
