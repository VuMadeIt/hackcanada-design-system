"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/hc/Button";
import { Input, Select, Textarea } from "@/components/hc/Field";
import { Checkbox } from "@/components/hc/Choice";
import { Alert } from "@/components/hc/Overlay";
import { EmptyState, Skeleton } from "@/components/hc/Display";
import { ShopItemCard, demoShop } from "@/components/hc/Domain";
import { PointsPill } from "@/components/hc/PointsPill";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function FormDemo() {
  const [team, setTeam] = useState("");
  const [size, setSize] = useState("4 hackers");
  const [about, setAbout] = useState("");
  const [rules, setRules] = useState(false);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);
  const errs = {
    team: team.trim().length < 3 ? "Team names need at least 3 characters" : "",
    rules: !rules ? "You need to agree to the rules to make a team" : "",
  };
  const bad = Object.values(errs).some(Boolean);
  if (done)
    return (
      <div className="flex flex-col items-start gap-2 rounded-md border border-border bg-surface p-4">
        <CheckCircleIcon className="size-4 text-success" />
        <p className="text-xl font-bold">{team} is ready</p>
        <p className="text-sm text-text-secondary">Share the invite code with your teammates.</p>
        <Button variant="secondary" onClick={() => { setDone(false); setTried(false); }}>Make another</Button>
      </div>
    );
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTried(true);
        if (!bad) setDone(true);
      }}
      className="flex max-w-prose flex-col gap-3 rounded-md border border-border bg-surface p-4"
    >
      <div>
        <p className="text-xl font-semibold">Start a team</p>
        <p className="text-sm text-text-muted">Up to 4 hackers. You can change this later.</p>
      </div>
      {tried && bad && (
        <Alert tone="danger" title="Two things to fix">
          Fix the fields marked below, then try again.
        </Alert>
      )}
      <Input label="Team name" required value={team} onChange={(e) => setTeam(e.target.value)} error={tried ? errs.team : undefined} hint="Shown on the leaderboard" placeholder="Byte Beavers" />
      <Select label="Team size" value={size} onChange={(e) => setSize(e.target.value)} options={["2 hackers", "3 hackers", "4 hackers"]} />
      <Textarea label="What are you building?" value={about} onChange={(e) => setAbout(e.target.value)} maxLength={140} hint="Optional. Helps others find you." />
      <div>
        <Checkbox label="I agree to the Hack Canada rules" checked={rules} onChange={setRules} />
        {tried && errs.rules && <p className="pt-half pl-4 text-caption text-danger">{errs.rules}</p>}
      </div>
      <div className="flex justify-end gap-1 border-t border-border pt-3">
        <Button type="button" variant="ghost">Cancel</Button>
        <Button type="submit">Create team</Button>
      </div>
    </form>
  );
}

export function StatesDemo() {
  const [s, setS] = useState<"loading" | "empty" | "error" | "ready">("loading");
  return (
    <div className="flex flex-col gap-2">
      <div role="radiogroup" aria-label="State" className="flex gap-half self-start rounded-sm bg-bg-muted p-half">
        {(["loading", "empty", "error", "ready"] as const).map((k) => (
          <button key={k} role="radio" aria-checked={s === k} onClick={() => setS(k)} className={cn("h-4 rounded-xs px-2 text-sm font-bold capitalize", s === k ? "bg-surface shadow-card" : "text-text-muted")}>{k}</button>
        ))}
      </div>
      <div className="grid min-h-48 place-items-center rounded-md border border-border bg-surface p-3">
        <AnimatePresence mode="wait">
          <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="w-full">
            {s === "loading" && (
              <div className="grid gap-2 sm:grid-cols-3" aria-busy="true" aria-label="Loading prizes">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-2 w-3/4" />
                    <Skeleton className="h-2 w-1/2" />
                  </div>
                ))}
              </div>
            )}
            {s === "empty" && (
              <div className="grid place-items-center">
                <EmptyState image={asset("/img/beaver-idea.png")} title="No bets yet" body="Pick a market and put some points on it. You can bet from 5 pts." action={<Button>Browse markets</Button>} />
              </div>
            )}
            {s === "error" && (
              <Alert tone="danger" title="The store didn't load" action={<Button size="sm" variant="secondary" onClick={() => setS("ready")}>Try again</Button>}>
                Check your connection. Your points are safe.
              </Alert>
            )}
            {s === "ready" && (
              <div className="grid gap-2 sm:grid-cols-3">
                {demoShop.slice(0, 3).map((it) => <ShopItemCard key={it.name} item={it} />)}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function RedeemFlow() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [bal, setBal] = useState(300);
  const item = demoShop[1];
  return (
    <div className="grid gap-3 md:grid-cols-[288px_1fr]">
      <ShopItemCard item={item} balance={bal} onRedeem={() => setStep(1)} />
      <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-3">
        <ol className="flex gap-1 font-mono text-mono">
          {["Choose", "Confirm", "Pick up"].map((t, i) => (
            <li key={t} className={cn("flex h-3 items-center rounded-pill px-1", i <= step ? "bg-primary-soft text-primary-ink" : "bg-bg-muted text-text-muted")}>{i + 1} · {t}</li>
          ))}
        </ol>
        {step === 0 && <p className="text-sm text-text-secondary">Press Redeem on the card to start.</p>}
        {step === 1 && (
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Redeem {item.name}?</p>
            <dl className="grid grid-cols-2 gap-y-1 text-sm">
              <dt className="text-text-muted">Balance now</dt><dd className="text-right font-bold tabular">{bal} pts</dd>
              <dt className="text-text-muted">Cost</dt><dd className="text-right font-bold tabular">−{item.price} pts</dd>
              <dt className="border-t border-border pt-1 text-text-muted">After</dt><dd className="border-t border-border pt-1 text-right font-bold tabular">{bal - item.price} pts</dd>
            </dl>
            <div className="flex justify-end gap-1">
              <Button variant="ghost" onClick={() => setStep(0)}>Cancel</Button>
              <Button onClick={() => { setBal((b) => b - item.price); setStep(2); }}>Redeem for {item.price} pts</Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-start gap-2">
            <CheckCircleIcon className="size-4 text-success" />
            <p className="text-xl font-semibold">It&apos;s yours</p>
            <p className="text-sm text-text-secondary">Show this code at the prize desk on floor 2.</p>
            <span className="rounded-sm bg-bg-muted px-2 py-1 font-mono text-lg font-bold tracking-wide">HC7 · Q2K · 9MX4</span>
            <div className="flex items-center gap-1 text-sm">New balance <PointsPill value={bal} size="sm" /></div>
            <Button variant="secondary" onClick={() => { setStep(0); setBal(300); }}>Reset demo</Button>
          </div>
        )}
      </div>
    </div>
  );
}
