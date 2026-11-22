"use client";

import { useEffect, useRef, useState } from "react";
import { Img, useImage } from "@/components/site/Images";
import { AnimatePresence, motion } from "motion/react";
import { ArrowPathIcon, CheckIcon, ClipboardDocumentIcon, PlayIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/hc/Button";
import { PointsPill } from "@/components/hc/PointsPill";
import { Checkbox, Switch } from "@/components/hc/Choice";
import { Tabs } from "@/components/hc/Segmented";
import { ToastStack, useToasts } from "@/components/hc/Overlay";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { Tilt } from "@/components/motion-primitives/tilt";
import { Spotlight } from "@/components/motion-primitives/spotlight";
import { GlowEffect } from "@/components/motion-primitives/glow-effect";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { TransitionPanel } from "@/components/motion-primitives/transition-panel";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { cn } from "@/lib/utils";

type Meta = { name: string; trigger: string; token: string; source: "Hack Canada" | "Motion Primitives"; children: React.ReactNode; onReplay?: () => void; wide?: boolean };

function Micro({ name, trigger, token, source, children, onReplay, wide }: Meta) {
  return (
    <li className={cn("group flex flex-col gap-1", wide && "md:col-span-2")}>
      <div className="blueprint relative grid min-h-30 flex-1 place-items-center overflow-hidden rounded-md hairline p-3">
        {children}
        {onReplay && (
          <button onClick={onReplay} aria-label={`Replay ${name}`} className="absolute top-1 right-1 grid size-4 place-items-center rounded-sm text-text-muted hover:bg-bg-muted hover:text-text focus-visible:shadow-focus focus-visible:outline-none">
            <ArrowPathIcon className="size-2" />
          </button>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-text-muted">{trigger}</p>
      </div>
      <p className="sr-only">
        {token} · {source}
      </p>
    </li>
  );
}

function PressDemo() {
  return (
    <div className="flex gap-1">
      <Button>Hold me</Button>
      <Button variant="secondary">Or me</Button>
    </div>
  );
}

function PointsDemo() {
  const [v, setV] = useState(1240);
  return (
    <div className="flex flex-col items-center gap-2">
      <PointsPill value={v} />
      <Button size="sm" variant="gold" onClick={() => setV((x) => x + 40)}>+40 pts</Button>
    </div>
  );
}

function RedeemDemo() {
  const [s, setS] = useState<"idle" | "busy" | "done">("idle");
  const go = () => {
    if (s !== "idle") return setS("idle");
    setS("busy");
    setTimeout(() => setS("done"), 900);
  };
  return (
    <motion.button
      layout
      onClick={go}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 36 }}
      className={cn("flex h-5 items-center gap-1 overflow-hidden rounded-sm px-2 text-sm font-bold", s === "done" ? "bg-success text-white dark:text-ink" : "bg-primary text-on-primary")}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {s === "idle" && <motion.span key="i" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>Redeem for 60 pts</motion.span>}
        {s === "busy" && <motion.span key="b" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}><TextShimmer className="[--base-color:rgba(255,255,255,0.6)] [--base-gradient-color:#fff]" duration={1}>Redeeming</TextShimmer></motion.span>}
        {s === "done" && (
          <motion.span key="d" className="flex items-center gap-1" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
            <CheckIcon className="size-2" />Redeemed
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ToggleDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Switch label="Notify me before bets close" checked={a} onChange={setA} />
      <Checkbox label="I'll bring my own laptop" checked={b} onChange={setB} />
    </div>
  );
}

function SegmentDemo() {
  return (
    <div className="flex rounded-sm bg-bg-muted p-half">
      <AnimatedBackground defaultValue="Open" className="rounded-xs bg-surface shadow-card" transition={{ type: "spring", stiffness: 400, damping: 32 }}>
        {["Open", "Closed", "Mine"].map((t) => (
          <button key={t} data-id={t} className="h-4 px-2 text-sm font-bold text-text-secondary data-[checked=true]:text-text">{t}</button>
        ))}
      </AnimatedBackground>
    </div>
  );
}

function HoverListDemo() {
  return (
    <div className="flex w-full max-w-40 flex-col">
      <AnimatedBackground className="rounded-sm bg-bg-muted" transition={{ type: "spring", stiffness: 500, damping: 40 }} enableHover>
        {["Home", "Challenges", "Store", "Bet Points"].map((t) => (
          <button key={t} data-id={t} className="h-5 w-full px-2 text-left text-sm font-medium">{t}</button>
        ))}
      </AnimatedBackground>
    </div>
  );
}

function TabsDemo() {
  const [v, setV] = useState("about");
  return (
    <div className="w-full max-w-48">
      <Tabs label="Challenge details" value={v} onChange={setV} tabs={[{ id: "about", label: "About" }, { id: "rules", label: "Rules" }, { id: "prizes", label: "Prizes", count: 3 }]} />
    </div>
  );
}

function ToastDemo() {
  const { toasts, push, dismiss } = useToasts();
  return (
    <>
      <Button variant="secondary" onClick={() => push({ title: "+40 pts", body: "Meet a sponsor is done", tone: "success" })}>Finish a challenge</Button>
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </>
  );
}

function CountdownDemo() {
  const [s, setS] = useState(5 * 60 + 12);
  useEffect(() => {
    const t = setInterval(() => setS((x) => (x <= 0 ? 5 * 60 + 12 : x - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-half font-mono text-4xl font-bold tabular" role="timer" aria-label="Bets close in">
      <SlidingNumber value={Math.floor(s / 60)} padStart />
      <span className="text-text-muted">:</span>
      <SlidingNumber value={s % 60} padStart />
    </div>
  );
}

function TrailDemo() {
  return (
    <div className="relative flex w-full max-w-40 flex-col gap-half overflow-hidden rounded-md hairline bg-surface p-2">
      <BorderTrail className="bg-primary" size={64} />
      <span className="font-mono text-mono text-primary">In progress</span>
      <p className="font-bold">Meet a sponsor</p>
      <p className="text-sm text-text-muted">Get scanned at any booth</p>
    </div>
  );
}

function MagneticDemo() {
  return (
    <Magnetic intensity={0.3} range={120}>
      <button className="flex h-7 items-center gap-1 rounded-pill bg-primary px-4 text-lg font-bold text-on-primary shadow-float">
        <PlayIcon className="size-3" />Play
      </button>
    </Magnetic>
  );
}

function TiltDemo() {
  return (
    <Tilt rotationFactor={8} isRevese className="w-full max-w-30">
      <div className="overflow-hidden rounded-md hairline bg-surface shadow-float">
        <Img id="games.timber" alt="" className="aspect-[3/2] w-full" />
        <p className="p-1 text-sm font-bold">Timber Tycoon</p>
      </div>
    </Tilt>
  );
}

function SpotlightDemo() {
  return (
    <div className="relative h-20 w-full max-w-40 overflow-hidden rounded-md bg-ink p-2 text-white">
      <Spotlight className="from-primary/80 via-primary/40 to-transparent" size={160} />
      <p className="relative font-mono text-mono text-white/70">Top prize</p>
      <p className="relative text-xl font-bold text-white">Anker MagGo charger</p>
    </div>
  );
}

function GlowDemo() {
  return (
    <div className="relative">
      <GlowEffect colors={["#e0a45e", "#f0b86c", "#1a6dbd", "#4a9eef"]} mode="colorShift" blur="soft" duration={4} scale={0.9} />
      <span className="relative flex h-6 items-center gap-1 rounded-sm bg-surface px-3 font-bold">You won 120 pts</span>
    </div>
  );
}

function TextEffectDemo({ k }: { k: number }) {
  return (
    <TextEffect key={k} per="word" preset="fade-in-blur" as="p" className="text-center text-3xl font-bold tracking-tight">
      Find your people.
    </TextEffect>
  );
}

function PanelDemo() {
  const [i, setI] = useState(0);
  const steps = ["Pick a prize", "Check your balance", "Show the QR at the desk"];
  return (
    <div className="flex w-full max-w-48 flex-col gap-2">
      <div className="flex gap-half">
        {steps.map((_, j) => (
          <button key={j} onClick={() => setI(j)} aria-label={`Step ${j + 1}`} className={cn("h-half flex-1 rounded-pill transition-colors duration-200", j <= i ? "bg-primary" : "bg-border")} />
        ))}
      </div>
      <div className="overflow-hidden">
        <TransitionPanel activeIndex={i} transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }} variants={{ enter: { opacity: 0, x: 24 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } }}>
          {steps.map((s, j) => (
            <div key={s} className="flex flex-col gap-half">
              <span className="font-mono text-mono text-text-muted">Step {j + 1} of 3</span>
              <p className="text-xl font-bold">{s}</p>
            </div>
          ))}
        </TransitionPanel>
      </div>
      <Button size="sm" className="self-start" onClick={() => setI((x) => (x + 1) % 3)}>{i === 2 ? "Start over" : "Next"}</Button>
    </div>
  );
}

function BlurDemo() {
  return (
    <div className="relative h-24 w-full max-w-40 overflow-hidden rounded-md border border-border bg-surface">
      <ul className="flex flex-col hairline-divide">
        {["1 · Team Maple", "2 · Byte Beavers", "3 · Moose Mode", "4 · Loonie Labs", "5 · Poutine Stack", "6 · Northern Bits"].map((n) => (
          <li key={n} className="h-4 px-2 text-sm leading-[32px]">{n}</li>
        ))}
      </ul>
      <ProgressiveBlur className="pointer-events-none absolute bottom-0 left-0 h-8 w-full" blurIntensity={1} />
    </div>
  );
}

function ShakeDemo() {
  const [v, setV] = useState("");
  const [err, setErr] = useState(false);
  const [n, setN] = useState(0);
  return (
    <form
      noValidate
      className="flex w-full max-w-40 flex-col gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        const bad = !/^\S+@\S+\.\S+$/.test(v);
        setErr(bad);
        if (bad) setN((x) => x + 1);
      }}
    >
      <label htmlFor="shake" className="text-sm font-bold">Email</label>
      <motion.input
        key={n}
        id="shake"
        value={v}
        onChange={(e) => setV(e.target.value)}
        aria-invalid={err}
        aria-describedby="shake-msg"
        animate={err ? { x: [0, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className={cn("h-5 rounded-sm border bg-surface px-2 text-base focus:shadow-focus focus:outline-none", err ? "border-danger" : "border-border-input")}
        placeholder="you@school.ca"
      />
      <p id="shake-msg" className="h-2 text-caption text-danger">{err ? "Enter an email like you@school.ca" : ""}</p>
      <Button size="sm" type="submit" className="self-start">Save</Button>
    </form>
  );
}

function CopyDemo() {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText("HC7-Q2K-9MX4");
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className="flex h-5 items-center gap-1 rounded-sm border border-border bg-surface px-2 font-mono text-sm hover:border-border-strong"
    >
      HC7-Q2K-9MX4
      <span className="relative size-2">
        <AnimatePresence initial={false}>
          {ok ? (
            <motion.span key="ok" className="absolute inset-0 text-success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><CheckIcon className="size-2" /></motion.span>
          ) : (
            <motion.span key="c" className="absolute inset-0 text-text-muted" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><ClipboardDocumentIcon className="size-2" /></motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">{ok ? "Copied" : ""}</span>
    </button>
  );
}

function ConfettiDemo({ k }: { k: number }) {
  const bits = Array.from({ length: 28 }, (_, i) => ({
    x: Math.cos((i / 28) * Math.PI * 2) * (64 + ((i * 37) % 48)),
    y: Math.sin((i / 28) * Math.PI * 2) * (48 + ((i * 53) % 40)) - 24,
    c: ["#1a6dbd", "#e0a45e", "#4a9eef", "#f0b86c"][i % 4],
    r: (i * 47) % 360,
  }));
  return (
    <div className="relative grid place-items-center">
      {k > 0 &&
        bits.map((b, i) => (
          <motion.span
            key={`${k}-${i}`}
            className="absolute size-1 rounded-xs"
            style={{ background: b.c }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: b.x, y: [0, b.y, b.y + 48], opacity: [1, 1, 0], rotate: b.r }}
            transition={{ duration: 1.2, ease: [0, 0, 0, 1] }}
          />
        ))}
      <motion.span key={k} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 12 }} className="relative grid size-8 place-items-center rounded-pill bg-gold text-2xl font-bold text-ink">
        ★
      </motion.span>
    </div>
  );
}

function CupsDemo() {
  const [order, setOrder] = useState([0, 1, 2]);
  const cupSrc = useImage("games.cup");
  const [ball] = useState(1);
  const [phase, setPhase] = useState<"show" | "shuffle" | "pick" | "reveal">("show");
  const [picked, setPicked] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const shuffle = () => {
    setPicked(null);
    setPhase("shuffle");
    let n = 0;
    const total = 8;
    const step = () => {
      setOrder((o) => {
        const a = Math.floor(Math.random() * 3);
        const b = (a + 1 + Math.floor(Math.random() * 2)) % 3;
        const c = [...o];
        [c[a], c[b]] = [c[b], c[a]];
        return c;
      });
      n++;
      if (n < total) timer.current = setTimeout(step, 360 - n * 24);
      else timer.current = setTimeout(() => setPhase("pick"), 360);
    };
    timer.current = setTimeout(step, 300);
  };
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex h-16 items-end gap-3">
        {order.map((cup) => {
          const up = phase === "show" || (phase === "reveal" && (cup === ball || cup === picked));
          return (
            <motion.button
              layout
              key={cup}
              disabled={phase !== "pick"}
              onClick={() => { setPicked(cup); setPhase("reveal"); }}
              transition={{ layout: { type: "spring", stiffness: 300, damping: 26 } }}
              className="relative flex w-10 flex-col items-center disabled:cursor-default"
              aria-label={`Cup ${order.indexOf(cup) + 1}`}
            >
              <motion.img src={cupSrc} alt="" className="relative z-10 h-12 w-auto" animate={{ y: up ? -24 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />
              {cup === ball && <span className="absolute bottom-0 size-2 rounded-pill bg-gold" />}
            </motion.button>
          );
        })}
      </div>
      <div className="flex h-5 items-center gap-1">
        {phase === "pick" ? <span className="text-sm font-bold">Where&apos;s the ball?</span> : <Button size="sm" onClick={shuffle} disabled={phase === "shuffle"}>{phase === "reveal" ? (picked === ball ? "Found it! Again" : "Missed. Again") : "Shuffle"}</Button>}
      </div>
    </div>
  );
}

export function MicroGallery() {
  const [r, setR] = useState({ text: 0, confetti: 0 });
  const bump = (k: keyof typeof r) => setR((s) => ({ ...s, [k]: s[k] + 1 }));
  return (
    <ul className="grid gap-x-3 gap-y-4 md:grid-cols-2">
      <Micro name="Press" trigger="Pointer down on any button" token="100 ms · scale 0.98" source="Hack Canada"><PressDemo /></Micro>
      <Micro name="Points count up" trigger="Balance changes" token="800 ms spring, bounce 0" source="Motion Primitives"><PointsDemo /></Micro>
      <Micro name="Redeem" trigger="Click, server responds" token="spring 500/36 · label slides 16" source="Hack Canada"><RedeemDemo /></Micro>
      <Micro name="Switch and checkbox" trigger="Toggle" token="spring 700/40 · check 100 ms" source="Hack Canada"><ToggleDemo /></Micro>
      <Micro name="Segmented highlight" trigger="Pick an option" token="spring 400/32" source="Motion Primitives"><SegmentDemo /></Micro>
      <Micro name="Hover highlight" trigger="Hover a list" token="spring 500/40" source="Motion Primitives"><HoverListDemo /></Micro>
      <Micro name="Tab underline" trigger="Change tab" token="200 ms · ease-standard" source="Hack Canada"><TabsDemo /></Micro>
      <Micro name="Toast" trigger="Something finished" token="300 ms spring · stays 4 s" source="Hack Canada"><ToastDemo /></Micro>
      <Micro name="Sliding number" trigger="Every second" token="spring 280/18" source="Motion Primitives"><CountdownDemo /></Micro>
      <Micro name="Border trail" trigger="Challenge in progress" token="loop 5 s, linear" source="Motion Primitives"><TrailDemo /></Micro>
      <Micro name="Magnetic" trigger="Pointer near the Play button" token="intensity 0.3 · range 120" source="Motion Primitives"><MagneticDemo /></Micro>
      <Micro name="Tilt" trigger="Hover a game card" token="rotation 8" source="Motion Primitives"><TiltDemo /></Micro>
      <Micro name="Spotlight" trigger="Hover the top prize" token="size 96 · spring" source="Motion Primitives"><SpotlightDemo /></Micro>
      <Micro name="Glow" trigger="You won" token="color shift 4 s" source="Motion Primitives"><GlowDemo /></Micro>
      <Micro name="Text reveal" trigger="Hero enters" token="per word · fade + blur" source="Motion Primitives" onReplay={() => bump("text")}><TextEffectDemo k={r.text} /></Micro>
      <Micro name="Step panel" trigger="Next step" token="300 ms · x 24" source="Motion Primitives"><PanelDemo /></Micro>
      <Micro name="Progressive blur" trigger="List keeps going" token="static" source="Motion Primitives"><BlurDemo /></Micro>
      <Micro name="Error shake" trigger="Submit with a bad value" token="300 ms · x ±8 then ±4" source="Hack Canada"><ShakeDemo /></Micro>
      <Micro name="Copy" trigger="Click to copy" token="spring pop · back after 1.4 s" source="Hack Canada"><CopyDemo /></Micro>
      <Micro name="Celebrate" trigger="Big win" token="1.2 s · 28 bits · brand colors" source="Hack Canada" onReplay={() => bump("confetti")}><ConfettiDemo k={r.confetti} /></Micro>
      <Micro name="Cup shuffle" trigger="Play Cup Shuffle" token="8 swaps · speeds up · spring 300/26" source="Hack Canada" wide><CupsDemo /></Micro>
    </ul>
  );
}
