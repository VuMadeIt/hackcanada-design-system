"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/hc/Button";
import { Input, Select, Textarea } from "@/components/hc/Field";
import { Checkbox } from "@/components/hc/Choice";
import { Alert, Dialog, ToastStack, useToasts } from "@/components/hc/Overlay";
import { Badge } from "@/components/hc/Badge";
import { QRCodeSVG } from "qrcode.react";
import { EmptyState, Skeleton, Stepper, Timeline, type Step } from "@/components/hc/Display";
import { ChallengeCard, ShopItemCard, demoShop } from "@/components/hc/Domain";
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
      <div className="flex flex-col items-start gap-2 rounded-md hairline bg-surface p-4">
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
      className="flex max-w-prose flex-col gap-3 rounded-md hairline bg-surface p-4"
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
      <div className="flex gap-1 hairline-t pt-3">
        <Button type="submit">Create team</Button>
        <Button type="button" variant="ghost">Cancel</Button>
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
      <div className="grid min-h-48 place-items-center rounded-md hairline bg-surface p-3">
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
      <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
        <Stepper steps={["Choose", "Confirm", "Pick up"].map((title, i): Step => ({ title, state: i < step || step === 2 ? "done" : i === step ? "current" : "todo" }))} />
        {step === 0 && <p className="text-sm text-text-secondary">Press Redeem on the card to start.</p>}
        {step === 1 && (
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Redeem {item.name}?</p>
            <dl className="grid grid-cols-2 gap-y-1 text-sm">
              <dt className="text-text-muted">Balance now</dt><dd className="text-right font-bold tabular">{bal} pts</dd>
              <dt className="text-text-muted">Cost</dt><dd className="text-right font-bold tabular">−{item.price} pts</dd>
              <dt className="hairline-t pt-1 text-text-muted">After</dt><dd className="hairline-t pt-1 text-right font-bold tabular">{bal - item.price} pts</dd>
            </dl>
            <div className="flex gap-1">
              <Button onClick={() => { setBal((b) => b - item.price); setStep(2); }}>Redeem for {item.price} pts</Button>
              <Button variant="ghost" onClick={() => setStep(0)}>Cancel</Button>
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

type ChallengeStatus = "not_started" | "in_progress" | "completed";
const flowStart: ChallengeStatus[] = ["not_started", "in_progress", "completed"];
const flowNames = ["Not started", "In progress", "Completed"];

export function ChallengeFlowDemo() {
  const [states, setStates] = useState<ChallengeStatus[]>(flowStart);
  const [open, setOpen] = useState<number | null>(null);
  const [bal, setBal] = useState(240);
  const [scanning, setScanning] = useState(false);
  const t = useToasts();
  const set = (i: number, s: ChallengeStatus) => setStates((all) => all.map((x, j) => (j === i ? s : x)));
  const act = (i: number) => {
    if (states[i] === "not_started") {
      set(i, "in_progress");
      t.push({ tone: "info", title: "Challenge started", body: "Your QR code is unlocked." });
    }
    setOpen(i);
  };
  const scan = (i: number) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      set(i, "completed");
      setBal((b) => b + 40);
      t.push({ tone: "success", title: "+40 pts", body: "Meet a sponsor" });
    }, 600);
  };
  const s = open === null ? null : states[open];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-sm text-text-muted">Your balance <PointsPill value={bal} size="sm" /></span>
        <Button size="sm" variant="ghost" className="ml-auto" onClick={() => { setStates(flowStart); setBal(240); }}>Reset demo</Button>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-3">
        {states.map((st, i) => (
          <li key={i} className="flex min-w-0 flex-col gap-1">
            <span className="font-mono text-mono font-bold tracking-[0.08em] text-text-muted uppercase">{flowNames[flowStart.indexOf(states[i])]}</span>
            <ChallengeCard title="Meet a sponsor" category="Sponsor" points={40} difficulty="Medium" status={st} qr onAction={() => act(i)} className="max-w-none" />
          </li>
        ))}
      </ul>
      <Dialog
        open={open !== null}
        onClose={() => setOpen(null)}
        title={s === "completed" ? "You earned 40 pts" : "Meet a sponsor"}
        description={s === "completed" ? "A volunteer scanned your code at the Sponsor booth. Your points landed right away." : "Visit any sponsor booth and talk to them for a few minutes. Then a volunteer scans your code."}
        footer={
          open !== null && s === "in_progress" ? (
            <>
              <Button loading={scanning} onClick={() => scan(open)}>Simulate the scan</Button>
              <Button variant="secondary" onClick={() => setOpen(null)}>Close</Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setOpen(null)}>Close</Button>
          )
        }
      >
        {s === "completed" ? (
          <div className="flex flex-col gap-2 rounded-sm bg-bg-muted p-2">
            <div className="flex items-center gap-1">
              <Badge tone="success" dot>Completed</Badge>
              <PointsPill value={bal} size="sm" className="ml-auto" />
            </div>
            <Timeline steps={[
              { title: "Started", state: "done" },
              { title: "Scanned by a volunteer", state: "done" },
              { title: "+40 pts added", state: "done" },
            ]} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-sm bg-bg-muted p-3">
            <div className="rounded-sm bg-white p-2 shadow-card">
              <QRCodeSVG value={JSON.stringify({ userId: "demo-hacker", challengeId: "meet-a-sponsor" })} size={160} level="H" imageSettings={{ src: asset("/img/logo-circle.png"), height: 32, width: 32, excavate: true }} />
            </div>
            <p className="text-center text-sm text-text-muted">Show this to a volunteer. It holds your hacker ID and this challenge, nothing else.</p>
          </div>
        )}
      </Dialog>
      <ToastStack toasts={t.toasts} onDismiss={t.dismiss} />
    </div>
  );
}

function Region({ n, className, children }: { n: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-md outline-1 outline-offset-4 outline-primary/40 outline-dashed", className)}>
      <span aria-hidden className="absolute -top-2 -left-2 z-10 grid size-3 place-items-center rounded-pill bg-primary text-caption font-bold text-on-primary">{n}</span>
      {children}
    </div>
  );
}

export function PageLayoutDemo() {
  const [filter, setFilter] = useState("All");
  return (
    <div className="@container rounded-md hairline bg-bg-muted p-3">
      <div className="flex flex-col gap-4 rounded-md bg-bg p-3">
        <Region n={1} className="flex flex-col gap-2 @min-[560px]:flex-row @min-[560px]:items-end @min-[560px]:justify-between">
          <div>
            <p className="text-2xl font-bold tracking-tight">Store</p>
            <p className="text-sm text-text-muted">Spend your points on prizes. Pick them up at the prize desk.</p>
          </div>
          <Button className="w-full @min-[560px]:w-auto">Earn more points</Button>
        </Region>
        <Region n={2} className="grid grid-cols-1 gap-2 @min-[480px]:grid-cols-3">
          {[["Your points", "240"], ["Your rank", "#12"], ["Prizes left", "128"]].map(([l, v]) => (
            <div key={l} className="rounded-md hairline bg-surface p-2">
              <p className="text-sm text-text-muted">{l}</p>
              <p className="text-2xl font-bold tabular">{v}</p>
            </div>
          ))}
        </Region>
        <div className="grid gap-4 @min-[560px]:grid-cols-[1fr_224px]">
          <Region n={3} className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap gap-half">
              {["All", "Snacks", "Hardware"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={cn("h-4 rounded-pill px-2 text-sm font-bold", filter === f ? "bg-ink text-white dark:bg-text dark:text-bg" : "hairline bg-surface text-text-muted")}>{f}</button>
              ))}
            </div>
            <ul className="flex flex-col">
              {demoShop.filter((it, i) => filter === "All" || (filter === "Snacks" ? i === 0 : i > 0)).slice(0, 3).map((it) => (
                <li key={it.name} className="flex items-center gap-2 py-1 [&:not(:last-child)]:hairline-b">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(it.image ?? "")} alt="" className="size-6 shrink-0 rounded-sm bg-bg-muted object-contain p-half mix-blend-multiply dark:bg-[#b4c2d1]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{it.name}</p>
                    <p className="text-sm text-text-muted">{it.stock === 0 ? "Sold out" : `${it.stock} left`}</p>
                  </div>
                  <span className="font-bold text-gold-ink tabular">{it.price} pts</span>
                </li>
              ))}
            </ul>
          </Region>
          <Region n={4} className="flex flex-col gap-2 self-start rounded-md hairline bg-surface p-2">
            <p className="font-bold">Your next prize</p>
            <div className="flex items-center gap-1 text-sm text-text-muted">Charger, 250 pts</div>
            <span className="block h-1 overflow-hidden rounded-pill bg-bg-muted"><span className="block h-full w-[72%] rounded-pill bg-gold" /></span>
            <p className="text-sm text-text-muted">70 pts to go. Two challenges would do it.</p>
          </Region>
        </div>
      </div>
    </div>
  );
}
