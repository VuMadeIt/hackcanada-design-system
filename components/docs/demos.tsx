"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import {
  ArrowRightIcon, BoltIcon, CalendarDaysIcon, GiftIcon, HomeIcon, MagnifyingGlassIcon, MoonIcon, QrCodeIcon, SparklesIcon, TrophyIcon, UserGroupIcon, XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/hc/Button";
import { IconButton } from "@/components/hc/IconButton";
import { Badge, type BadgeTone } from "@/components/hc/Badge";
import { PointsPill } from "@/components/hc/PointsPill";
import { Avatar, AvatarGroup } from "@/components/hc/Avatar";
import { Card, Tile } from "@/components/hc/Card";
import { Input, Select, Textarea } from "@/components/hc/Field";
import { Checkbox, RadioGroup, Switch } from "@/components/hc/Choice";
import { SegmentedControl, Tabs } from "@/components/hc/Segmented";
import { Accordion, Alert, Dialog, ToastStack, Tooltip, useToasts } from "@/components/hc/Overlay";
import { Breadcrumb, Countdown, EmptyState, NavItem, Pagination, Progress, Skeleton, StatCard, Stepper, Timeline, type Step } from "@/components/hc/Display";
import { BetSlip, ChallengeCard, Leaderboard, MarketCard, MiniGameCard, ShopItemCard, demoShop } from "@/components/hc/Domain";
import { Spec } from "@/components/site/Spec";
import { DoDont } from "@/components/site/Doc";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { Choose, ControlBar, Stage, TextControl, Toggle } from "./Controls";

const frame = "overflow-hidden rounded-md border border-border";
const steps: Step[] = [
  { title: "Start the challenge", body: "Your QR code unlocks.", state: "done" },
  { title: "Find a volunteer", body: "They're in the main hall.", state: "current" },
  { title: "Get scanned", body: "Points land right away.", state: "todo" },
];
const board = [
  { name: "Ada Park", points: 1240 },
  { name: "Sam Okafor", points: 1105 },
  { name: "Lucas Vu", points: 980, you: true },
  { name: "Mia Chen", points: 760 },
];

function Shell({ children, controls }: { children: React.ReactNode; controls?: React.ReactNode }) {
  return (
    <div className={frame}>
      <div className="blueprint flex min-h-30 flex-wrap items-center justify-center gap-2 p-4 md:p-6">{children}</div>
      {controls && <ControlBar>{controls}</ControlBar>}
    </div>
  );
}

function Matrix({ items, cols = 4 }: { items: [string, React.ReactNode][]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={cn("grid gap-1 rounded-md border border-border bg-surface p-1 sm:grid-cols-2", cols === 3 && "lg:grid-cols-3", cols === 4 && "lg:grid-cols-4")}>
      {items.map(([l, n]) => (
        <Stage key={l} label={l}>{n}</Stage>
      ))}
    </div>
  );
}

/* ---------- Playgrounds ---------- */

function ButtonPlay() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ButtonSize>("md");
  const [icon, setIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Redeem");
  return (
    <Shell
      controls={
        <>
          <Choose label="variant" value={variant} options={["primary", "secondary", "ghost", "gold", "danger"] as const} onChange={setVariant} />
          <Choose label="size" value={size} options={["sm", "md", "lg", "xl"] as const} onChange={setSize} />
          <TextControl label="label" value={label} onChange={setLabel} />
          <Toggle label="icon" value={icon} onChange={setIcon} />
          <Toggle label="loading" value={loading} onChange={setLoading} />
          <Toggle label="disabled" value={disabled} onChange={setDisabled} />
        </>
      }
    >
      <Button variant={variant} size={size} loading={loading} disabled={disabled} leading={icon ? <GiftIcon /> : undefined}>{label}</Button>
    </Shell>
  );
}

function BadgePlay() {
  const [tone, setTone] = useState<BadgeTone>("success");
  const [dot, setDot] = useState(true);
  const [label, setLabel] = useState("Completed");
  return (
    <Shell controls={<><Choose label="tone" value={tone} options={["neutral", "primary", "gold", "success", "warning", "danger"] as const} onChange={setTone} /><TextControl label="label" value={label} onChange={setLabel} /><Toggle label="dot" value={dot} onChange={setDot} /></>}>
      <Badge tone={tone} dot={dot}>{label}</Badge>
    </Shell>
  );
}

function PointsPlay() {
  const [v, setV] = useState(120);
  return (
    <Shell controls={<div className="flex gap-1"><Button size="sm" onClick={() => setV((x) => x + 25)}>+25 pts</Button><Button size="sm" variant="secondary" onClick={() => setV((x) => Math.max(0, x - 60))}>Redeem 60</Button></div>}>
      <PointsPill value={v} />
      <PointsPill value={v} size="sm" />
    </Shell>
  );
}

function InputPlay() {
  const [err, setErr] = useState(false);
  const [icon, setIcon] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <Shell controls={<><Toggle label="error" value={err} onChange={setErr} /><Toggle label="leading icon" value={icon} onChange={setIcon} /><Toggle label="disabled" value={disabled} onChange={setDisabled} /></>}>
      <div className="w-full max-w-40">
        <Input label="School email" placeholder="name@uwaterloo.ca" hint="We send your QR pass here" required error={err ? "Use your school email, like name@uwaterloo.ca" : undefined} leading={icon ? <MagnifyingGlassIcon /> : undefined} disabled={disabled} />
      </div>
    </Shell>
  );
}

function TextareaPlay() {
  const [v, setV] = useState("A hardware hack that tells you when the coffee runs out.");
  return <Shell><div className="w-full max-w-48"><Textarea label="What will you build?" hint="One or two sentences" maxLength={280} value={v} onChange={(e) => setV(e.target.value)} /></div></Shell>;
}

function ChoicesPlay({ kind }: { kind: "checkbox" | "radio" | "switch" }) {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [track, setTrack] = useState("hardware");
  if (kind === "checkbox")
    return <Shell><div className="flex flex-col"><Checkbox label="Vegetarian" checked={a} onChange={setA} /><Checkbox label="Gluten free" description="We'll label your meal" checked={b} onChange={setB} /><Checkbox label="All dietary needs" checked={a && b} indeterminate={a !== b} onChange={(v) => { setA(v); setB(v); }} /></div></Shell>;
  if (kind === "switch")
    return <Shell><div className="flex flex-col gap-1"><Switch label="Sound effects" checked={a} onChange={setA} /><Switch label="Reduce motion" checked={b} onChange={setB} size="sm" /></div></Shell>;
  return (
    <Shell>
      <div className="w-full max-w-40">
        <RadioGroup label="Track" value={track} onChange={setTrack} options={[{ value: "hardware", label: "Hardware", description: "Pick up kits at the hardware desk." }, { value: "ai", label: "AI and data" }, { value: "social", label: "Social good" }]} />
      </div>
    </Shell>
  );
}

function SegPlay() {
  const [v, setV] = useState("Open");
  return <Shell><SegmentedControl label="Filter markets" options={["Open", "Closed", "Mine"]} value={v} onChange={setV} /></Shell>;
}
function TabsPlay() {
  const [v, setV] = useState("all");
  return <Shell><div className="w-full max-w-48 rounded-md bg-surface px-3"><Tabs label="Challenges" value={v} onChange={setV} tabs={[{ id: "all", label: "All", count: 8 }, { id: "progress", label: "In progress", count: 2 }, { id: "done", label: "Done", count: 3 }]} /></div></Shell>;
}

function DialogPlay() {
  const [open, setOpen] = useState(false);
  return (
    <Shell>
      <Button leading={<GiftIcon />} onClick={() => setOpen(true)}>Redeem LED Strips</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Redeem LED Strips for 60 pts?" description="Pick it up at the prize desk. You'll have 60 pts left." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Redeem</Button></>}>
        <div className="flex items-center gap-2 rounded-sm bg-bg-muted p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/shop/led-strips.jpg")} alt="" className="size-8 rounded-xs object-contain mix-blend-multiply dark:mix-blend-normal" />
          <div className="flex-1"><p className="font-bold">LED Strips</p><p className="text-sm text-text-muted">10 ft · 4 left</p></div>
          <p className="font-bold tabular">60 pts</p>
        </div>
      </Dialog>
    </Shell>
  );
}

function ToastPlay() {
  const t = useToasts();
  return (
    <Shell>
      <Button onClick={() => t.push({ tone: "success", title: "+25 pts", body: "Meet a sponsor" })}>Earn points</Button>
      <Button variant="secondary" onClick={() => t.push({ tone: "info", title: "Bet placed", body: "25 pts on YES" })}>Place bet</Button>
      <Button variant="ghost" onClick={() => t.push({ tone: "danger", title: "Couldn't redeem", body: "That prize just sold out" })}>Fail</Button>
      <ToastStack toasts={t.toasts} onDismiss={t.dismiss} />
    </Shell>
  );
}

function ProgressPlay() {
  const [v, setV] = useState(180);
  return (
    <Shell controls={<label className="flex items-center gap-1 font-mono text-mono">value<input type="range" min={0} max={250} value={v} onChange={(e) => setV(+e.target.value)} /></label>}>
      <div className="w-full max-w-40"><Progress label="Toward Charger" value={v} max={250} tone="gold" /></div>
    </Shell>
  );
}

function PaginationPlay() {
  const [p, setP] = useState(4);
  return <Shell><Pagination page={p} pages={12} onChange={setP} /></Shell>;
}

function SkeletonPlay() {
  const [loading, setLoading] = useState(true);
  return (
    <Shell controls={<Toggle label="loading" value={loading} onChange={setLoading} />}>
      <div aria-busy={loading} className="flex w-full max-w-40 items-center gap-2 rounded-md border border-border bg-surface p-3">
        {loading ? <><Skeleton className="size-5 rounded-pill" /><div className="flex flex-1 flex-col gap-1"><Skeleton className="h-2 w-3/4" /><Skeleton className="h-2 w-1/2" /></div></> : <><Avatar name="Ada Park" /><div><p className="font-bold">Ada Park</p><p className="text-sm text-text-muted">Team Maple · 1,240 pts</p></div></>}
      </div>
    </Shell>
  );
}

function TableDemo() {
  const rows = [["Sat 10:12", "Meet a sponsor", "+25"], ["Sat 11:40", "Bet won · First demo", "+48"], ["Sat 13:05", "Redeemed LED Strips", "−60"]];
  return (
    <div className="w-full max-w-60 overflow-hidden rounded-md border border-border bg-surface">
      <table className="w-full text-sm">
        <thead className="bg-bg-muted text-left text-caption font-bold text-text-muted uppercase">
          <tr><th scope="col" className="h-5 px-2">Time</th><th scope="col" className="px-2">Reason</th><th scope="col" className="px-2 text-right">Points</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r[0]} className="h-6 hover:bg-bg-muted/60">
              <td className="px-2 text-text-muted tabular">{r[0]}</td><td className="px-2 font-medium">{r[1]}</td>
              <td className={cn("px-2 text-right font-bold tabular", r[2].startsWith("+") ? "text-success" : "text-text")}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const hour = 3.6e6;
const plays: Record<string, () => React.ReactNode> = {
  button: () => <ButtonPlay />,
  "icon-button": () => <Shell><IconButton label="Close"><XMarkIcon /></IconButton><IconButton label="Dark mode" variant="outline"><MoonIcon /></IconButton><IconButton label="Search" variant="solid"><MagnifyingGlassIcon /></IconButton></Shell>,
  badge: () => <BadgePlay />,
  "points-pill": () => <PointsPlay />,
  avatar: () => <Shell><Avatar name="Ada Park" size="lg" status="online" /><AvatarGroup names={["Ada Park", "Sam Okafor", "Lucas Vu", "Mia Chen", "Noor Ali", "Jon Bell"]} max={4} size="md" /></Shell>,
  card: () => <Shell><Card interactive className="w-full max-w-40"><p className="text-lg font-bold">Meet a sponsor</p><p className="text-sm text-text-muted">Talk to any sponsor booth and get scanned.</p><Tile><p className="text-sm font-medium">Reward · 25 pts</p></Tile></Card></Shell>,
  input: () => <InputPlay />,
  textarea: () => <TextareaPlay />,
  select: () => <Shell><div className="w-full max-w-30"><Select label="T-shirt size" options={["XS", "S", "M", "L", "XL"]} defaultValue="M" /></div></Shell>,
  checkbox: () => <ChoicesPlay kind="checkbox" />,
  radio: () => <ChoicesPlay kind="radio" />,
  switch: () => <ChoicesPlay kind="switch" />,
  "segmented-control": () => <SegPlay />,
  tabs: () => <TabsPlay />,
  accordion: () => <Shell><div className="w-full max-w-60"><Accordion defaultOpen={0} items={[{ q: "Can I trade points with friends?", a: "No. Points stay on your account, so the store stays fair." }, { q: "When does the store close?", a: "Sunday at 10 am, two hours before judging." }, { q: "What happens to points I don't spend?", a: "They stay on the leaderboard but can't be cashed out." }]} /></div></Shell>,
  dialog: () => <DialogPlay />,
  tooltip: () => <Shell><Tooltip label="Switch to dark mode"><IconButton label="Switch to dark mode" variant="outline"><MoonIcon /></IconButton></Tooltip><Tooltip label="Sat, Feb 14 · 9:00 am" side="bottom"><span tabIndex={0} className="rounded-xs text-sm font-bold underline decoration-dotted underline-offset-4">Starts in 2 days</span></Tooltip></Shell>,
  toast: () => <ToastPlay />,
  alert: () => <Shell><div className="flex w-full max-w-60 flex-col gap-1"><Alert tone="warning" title="Applications close Friday">Finish yours before 11:59 pm ET.</Alert><Alert tone="success" title="You're in" action={<Button size="sm">RSVP now</Button>}>See you in Waterloo.</Alert></div></Shell>,
  progress: () => <ProgressPlay />,
  timeline: () => <Shell><div className="flex w-full max-w-60 flex-col gap-4 rounded-md bg-surface p-3"><Timeline steps={steps} /><Stepper steps={[{ title: "Team", state: "done" }, { title: "Idea", state: "current" }, { title: "Submit", state: "todo" }]} /></div></Shell>,
  skeleton: () => <SkeletonPlay />,
  table: () => <Shell><TableDemo /></Shell>,
  "empty-state": () => <Shell><EmptyState image={asset("/img/beaver-idea.png")} title="No bets yet" body="Pick a market and back the side you believe in." action={<Button trailing={<ArrowRightIcon />}>Browse markets</Button>} /></Shell>,
  breadcrumb: () => <Shell><Breadcrumb items={["Bet Points", "Markets", "First team to demo"]} /></Shell>,
  pagination: () => <PaginationPlay />,
  "nav-item": () => <Shell><nav className="flex w-30 flex-col gap-half rounded-md bg-surface p-1"><NavItem icon={<HomeIcon />} label="Home" active /><NavItem icon={<BoltIcon />} label="Challenges" badge="3" /><NavItem icon={<TrophyIcon />} label="Bet Points" /><NavItem icon={<QrCodeIcon />} label="QR pass" /></nav></Shell>,
  "stat-card": () => <Shell><StatCard label="Points earned" value="320" delta="+40 today" icon={<SparklesIcon />} /><StatCard label="Challenges done" value="5 / 8" icon={<BoltIcon />} /></Shell>,
  countdown: () => <Shell><div className="flex flex-col items-center gap-1"><p className="text-sm font-bold">Hacking ends in</p><Countdown target={Date.now() + 5 * hour + 1234567} /></div></Shell>,
  "shop-item-card": () => <Shell><ShopItemCard item={demoShop[1]} balance={240} /><ShopItemCard item={demoShop[3]} balance={240} /><ShopItemCard item={demoShop[2]} /></Shell>,
  "challenge-card": () => <Shell><ChallengeCard title="Meet a sponsor" category="Sponsor" points={25} difficulty="Easy" status="not_started" qr /><ChallengeCard title="Ship a demo video" category="Build" points={60} difficulty="Hard" status="in_progress" /></Shell>,
  "market-card": () => <Shell><MarketCard question="Will a team demo working hardware?" yes={62} pool={4200} closes="in 2h" /></Shell>,
  "bet-slip": () => <Shell><BetSlip /></Shell>,
  leaderboard: () => <Shell><Leaderboard rows={board} /></Shell>,
  "mini-game-card": () => <Shell><MiniGameCard title="Timber Tycoon" body="Chop, upgrade your axe, beat the leaderboard." image={asset("/img/games/timber-preview.jpg")} plays="Unlimited" /><MiniGameCard title="Cup Shuffle" body="Keep your eye on the ball. It's harder than it looks." image={asset("/img/games/cup.svg")} plays="3 plays left" /></Shell>,
};

export function DemoPlayground({ slug }: { slug: string }) {
  return <>{plays[slug]?.() ?? null}</>;
}

/* ---------- Spec views ---------- */

const specs: Record<string, () => React.ReactNode> = {
  button: () => <Button leading={<GiftIcon />}>Redeem</Button>,
  "icon-button": () => <IconButton label="Close" variant="outline"><XMarkIcon /></IconButton>,
  badge: () => <Badge tone="success" dot>Completed</Badge>,
  "points-pill": () => <PointsPill value={240} />,
  avatar: () => <Avatar name="Ada Park" size="lg" />,
  card: () => <Card className="w-40"><p className="text-lg font-bold">Meet a sponsor</p><p className="text-sm text-text-muted">Talk to a sponsor booth.</p></Card>,
  input: () => <div className="w-40"><Input label="Team name" hint="You can change it later" /></div>,
  textarea: () => <div className="w-40"><Textarea label="Pitch" /></div>,
  select: () => <div className="w-30"><Select label="Size" options={["M"]} /></div>,
  checkbox: () => <Checkbox label="Vegetarian" checked onChange={() => {}} />,
  radio: () => <div className="w-40"><RadioGroup label="Track" value="a" onChange={() => {}} options={[{ value: "a", label: "Hardware" }, { value: "b", label: "AI and data" }]} /></div>,
  switch: () => <Switch label="Sound" checked onChange={() => {}} />,
  "segmented-control": () => <SegmentedControl label="f" options={["Open", "Closed", "Mine"]} value="Open" onChange={() => {}} />,
  tabs: () => <div className="w-48"><Tabs label="t" value="a" onChange={() => {}} tabs={[{ id: "a", label: "All", count: 8 }, { id: "b", label: "Done" }]} /></div>,
  accordion: () => <div className="w-48"><Accordion items={[{ q: "Can I trade points?", a: "No." }]} /></div>,
  dialog: () => <div className="w-60 rounded-lg bg-surface p-4 shadow-float"><p className="text-xl font-bold">Redeem LED Strips?</p><div className="flex justify-end gap-1 pt-4"><Button variant="secondary">Cancel</Button><Button>Redeem</Button></div></div>,
  tooltip: () => <span className="rounded-sm bg-ink px-1 py-half text-caption font-medium text-white">Switch to dark mode</span>,
  toast: () => <div className="flex w-40 items-start gap-1 rounded-md border border-border bg-surface-raised p-2 shadow-float"><SparklesIcon className="size-2 text-success" /><div><p className="text-sm font-bold">+25 pts</p><p className="text-sm text-text-muted">Meet a sponsor</p></div></div>,
  alert: () => <div className="w-48"><Alert tone="warning" title="Applications close Friday">Finish yours by 11:59 pm.</Alert></div>,
  progress: () => <div className="w-40"><Progress label="Toward Charger" value={180} max={250} /></div>,
  timeline: () => <div className="w-40"><Timeline steps={steps.slice(0, 2)} /></div>,
  skeleton: () => <div className="flex w-30 flex-col gap-1"><Skeleton className="h-2 w-full" /><Skeleton className="h-2 w-2/3" /></div>,
  table: () => <TableDemo />,
  "empty-state": () => <EmptyState image={asset("/img/beaver-idea.png")} title="No bets yet" body="Pick a market to start." />,
  breadcrumb: () => <Breadcrumb items={["Bet Points", "Markets", "Demo"]} />,
  pagination: () => <Pagination page={2} pages={5} onChange={() => {}} />,
  "nav-item": () => <div className="w-30"><NavItem icon={<HomeIcon />} label="Home" active /></div>,
  "stat-card": () => <StatCard label="Points earned" value="320" icon={<SparklesIcon />} />,
  countdown: () => <Countdown target={Date.now() + 3 * hour} />,
  "shop-item-card": () => <ShopItemCard item={demoShop[0]} />,
  "challenge-card": () => <ChallengeCard title="Meet a sponsor" category="Sponsor" points={25} difficulty="Easy" status="not_started" qr />,
  "market-card": () => <MarketCard question="First team to demo?" yes={62} pool={4200} closes="in 2h" />,
  "bet-slip": () => <BetSlip />,
  leaderboard: () => <Leaderboard rows={board.slice(0, 3)} />,
  "mini-game-card": () => <MiniGameCard title="Cup Shuffle" body="Find the ball." image={asset("/img/games/cup.svg")} plays="3 left" />,
};

const specWidth: Record<string, number> = {
  "shop-item-card": 288,
  "challenge-card": 320,
  "market-card": 384,
  "bet-slip": 320,
  leaderboard: 384,
  "mini-game-card": 320,
};

export function DemoSpec({ slug }: { slug: string }) {
  const s = specs[slug];
  return s ? <Spec label={`${slug} · measured live`} width={specWidth[slug]}>{s()}</Spec> : null;
}

/* ---------- Variants ---------- */

const variants: Record<string, () => React.ReactNode> = {
  button: () => (
    <div className="flex flex-col gap-2">
      <Matrix items={(["primary", "secondary", "ghost", "gold", "danger"] as const).map((v) => [v, <Button key={v} variant={v}>Redeem</Button>])} cols={3} />
      <Matrix items={(["sm", "md", "lg", "xl"] as const).map((s) => [`${s} · ${{ sm: 32, md: 40, lg: 48, xl: 56 }[s]}px`, <Button key={s} size={s} leading={<GiftIcon />}>Redeem</Button>])} />
    </div>
  ),
  "icon-button": () => <Matrix items={(["ghost", "outline", "solid"] as const).map((v) => [v, <IconButton key={v} label="Search" variant={v}><MagnifyingGlassIcon /></IconButton>])} cols={3} />,
  badge: () => <Matrix items={(["neutral", "primary", "gold", "success", "warning", "danger"] as const).map((t) => [t, <Badge key={t} tone={t} dot>{t[0].toUpperCase() + t.slice(1)}</Badge>])} cols={3} />,
  avatar: () => <Matrix items={(["xs", "sm", "md", "lg", "xl"] as const).map((s) => [s, <Avatar key={s} name="Mia Chen" size={s} />])} cols={3} />,
  alert: () => <div className="grid gap-1 md:grid-cols-2">{(["info", "success", "warning", "danger"] as const).map((t) => <Alert key={t} tone={t} title={{ info: "Doors open at 9", success: "You're in", warning: "Store closes soon", danger: "Couldn't place bet" }[t]}>A short line that says what to do next.</Alert>)}</div>,
  progress: () => <div className="grid gap-3 rounded-md border border-border bg-surface p-3 md:grid-cols-3">{(["primary", "gold", "success"] as const).map((t) => <Progress key={t} tone={t} label={t} value={64} />)}</div>,
  switch: () => <Matrix items={[["md · 40×24", <Switch key="a" label="Sound" checked onChange={() => {}} />], ["sm · 32×16", <Switch key="b" label="Sound" size="sm" checked onChange={() => {}} />]]} cols={2} />,
  "shop-item-card": () => <Matrix items={[["Available", <ShopItemCard key="a" item={demoShop[4]} balance={500} />], ["Low stock", <ShopItemCard key="b" item={demoShop[1]} />], ["Can't afford", <ShopItemCard key="c" item={demoShop[3]} balance={100} />], ["Sold out", <ShopItemCard key="d" item={demoShop[2]} />]]} />,
  "challenge-card": () => <Matrix items={[["Not started", <ChallengeCard key="a" title="Meet a sponsor" category="Sponsor" points={25} difficulty="Easy" status="not_started" qr />], ["In progress", <ChallengeCard key="b" title="Post on socials" category="Social" points={40} difficulty="Medium" status="in_progress" />], ["Completed", <ChallengeCard key="c" title="Ship a demo" category="Build" points={60} difficulty="Hard" status="completed" />]]} cols={3} />,
};

export function DemoVariants({ slug }: { slug: string }) {
  const v = variants[slug];
  if (v) return <>{v()}</>;
  return <p className="text-base text-text-secondary">This component has one variant. Its look changes only by state, shown below.</p>;
}

/* ---------- States ---------- */

function forced(cls: string, node: React.ReactNode) {
  return <div className={cls}>{node}</div>;
}

const states: Record<string, () => React.ReactNode> = {
  button: () => (
    <Matrix
      items={[
        ["default", <Button key="1">Redeem</Button>],
        ["hover", <Button key="2" className="bg-primary-hover">Redeem</Button>],
        ["pressed", <Button key="3" className="scale-[0.98] bg-primary-hover">Redeem</Button>],
        ["focus-visible", <Button key="4" className="shadow-focus">Redeem</Button>],
        ["loading", <Button key="5" loading>Redeeming</Button>],
        ["disabled", <Button key="6" disabled>Redeem</Button>],
        ["can't afford", <Button key="7" variant="secondary">Need 40 more pts</Button>],
        ["secondary hover", <Button key="8" variant="secondary" className="border-border-strong bg-bg-muted">View</Button>],
      ]}
    />
  ),
  input: () => (
    <Matrix
      cols={3}
      items={[
        ["default", <div key="1" className="w-30"><Input label="Team name" /></div>],
        ["focus", <div key="2" className="w-30">{forced("[&_input]:border-primary [&_input]:shadow-focus", <Input label="Team name" defaultValue="Maple" />)}</div>],
        ["filled", <div key="3" className="w-30"><Input label="Team name" defaultValue="Maple Syrup" /></div>],
        ["error", <div key="4" className="w-30"><Input label="Email" defaultValue="lucas@" error="Add the rest of your email" /></div>],
        ["disabled", <div key="5" className="w-30"><Input label="Team name" defaultValue="Locked" disabled /></div>],
        ["with hint", <div key="6" className="w-30"><Input label="Team name" hint="2 to 24 characters" /></div>],
      ]}
    />
  ),
  checkbox: () => <Matrix items={[["off", <Checkbox key="1" label="Vegetarian" checked={false} onChange={() => {}} />], ["on", <Checkbox key="2" label="Vegetarian" checked onChange={() => {}} />], ["mixed", <Checkbox key="3" label="All" checked={false} indeterminate onChange={() => {}} />], ["disabled", <Checkbox key="4" label="Vegan" checked disabled onChange={() => {}} />]]} />,
  switch: () => <Matrix items={[["off", <Switch key="1" label="Sound" checked={false} onChange={() => {}} />], ["on", <Switch key="2" label="Sound" checked onChange={() => {}} />], ["disabled off", <Switch key="3" label="Sound" checked={false} disabled onChange={() => {}} />], ["disabled on", <Switch key="4" label="Sound" checked disabled onChange={() => {}} />]]} />,
  "nav-item": () => <Matrix items={[["default", <div key="1" className="w-24"><NavItem icon={<CalendarDaysIcon />} label="Schedule" /></div>], ["hover", <div key="2" className="w-24 [&_a]:bg-bg-muted [&_a]:text-text"><NavItem icon={<CalendarDaysIcon />} label="Schedule" /></div>], ["active", <div key="3" className="w-24"><NavItem icon={<CalendarDaysIcon />} label="Schedule" active /></div>], ["with badge", <div key="4" className="w-24"><NavItem icon={<UserGroupIcon />} label="Teams" badge="New" /></div>]]} />,
  "icon-button": () => <Matrix items={[["default", <IconButton key="1" label="Close" variant="outline"><XMarkIcon /></IconButton>], ["hover", <IconButton key="2" label="Close" variant="outline" className="bg-bg-muted"><XMarkIcon /></IconButton>], ["focus-visible", <IconButton key="3" label="Close" variant="outline" className="shadow-focus"><XMarkIcon /></IconButton>], ["disabled", <IconButton key="4" label="Close" variant="outline" disabled><XMarkIcon /></IconButton>]]} />,
  card: () => <Matrix cols={2} items={[["default", <Card key="1" className="w-30"><p className="font-bold">Default</p></Card>], ["hover", <Card key="2" className="w-30 -translate-y-half border-border-strong shadow-float"><p className="font-bold">Hover lift</p></Card>]]} />,
};

export function DemoStates({ slug }: { slug: string }) {
  const s = states[slug];
  if (s) return <>{s()}</>;
  return <div className={frame}><div className="blueprint flex flex-wrap items-center justify-center gap-2 p-4">{specs[slug]?.()}</div><p className="border-t border-border bg-surface p-2 text-sm text-text-muted">Default state shown. Hover and focus use the shared tokens: border-strong on hover, a 2 px primary focus ring, and 40% opacity when disabled.</p></div>;
}

/* ---------- Do / Don't ---------- */

const dd: Record<string, [React.ReactNode, React.ReactNode]> = {
  button: [<div key="d" className="flex gap-1"><Button variant="secondary">Cancel</Button><Button>Redeem</Button></div>, <div key="n" className="flex gap-1"><Button>Cancel</Button><Button>Redeem</Button></div>],
  card: [<Card key="d" className="w-30"><p className="font-bold">Card</p><Tile>Flat tile inside</Tile></Card>, <Card key="n" className="w-30"><p className="font-bold">Card</p><Card className="p-2 shadow-float">Card inside a card</Card></Card>],
  input: [<div key="d" className="w-30"><Input label="Email" placeholder="name@school.ca" /></div>, <div key="n" className="w-30"><input aria-label="Email" placeholder="Email" className="h-6 w-full rounded-sm border border-border bg-surface px-2" /></div>],
  timeline: [<div key="d" className="w-30"><Timeline steps={steps.slice(0, 2)} /></div>, <div key="n" className="relative flex w-30 flex-col gap-3 pl-1"><span className="absolute top-1 bottom-1 left-[19px] w-[2px] bg-primary" /><span className="relative z-0 flex items-center gap-2"><span className="size-3 rounded-pill border-2 border-primary bg-transparent" />Start</span><span className="relative flex items-center gap-2"><span className="size-3 rounded-pill border-2 border-primary bg-transparent" />Scan</span></div>],
  "market-card": [<div key="d" className="grid w-30 grid-cols-2 gap-1"><Button>Yes</Button><Button variant="secondary">No</Button></div>, <div key="n" className="grid w-30 grid-cols-2 gap-1"><Button>Yes</Button><button className="h-5 rounded-sm text-sm font-bold text-text-muted/50">No</button></div>],
  "shop-item-card": [<div key="d" className="grid size-16 place-items-center rounded-sm bg-surface p-2"><img src={asset("/img/shop/charger.jpg")} alt="" className="size-full object-contain mix-blend-multiply dark:mix-blend-normal" /></div>, <div key="n" className="size-16 overflow-hidden rounded-sm"><img src={asset("/img/shop/charger.jpg")} alt="" className="size-full scale-150 object-cover" /></div>],
  badge: [<Badge key="d" tone="success" dot>Completed</Badge>, <div key="n" className="flex gap-half"><Badge tone="success">Done</Badge><Badge tone="gold">Hot</Badge><Badge tone="danger">New</Badge></div>],
};

export function DemoDoDont({ slug, doText, dontText }: { slug: string; doText: string; dontText: string }) {
  const pair = dd[slug] ?? [specs[slug]?.(), null];
  return <DoDont doExample={pair[0]} dontExample={pair[1] ?? <span className="text-sm text-text-muted">See the rule on the left.</span>} doText={doText} dontText={dontText} />;
}
