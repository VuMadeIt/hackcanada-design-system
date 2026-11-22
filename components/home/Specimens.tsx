"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, MagnifyingGlassIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/hc/Button";
import { Badge } from "@/components/hc/Badge";
import { PointsPill } from "@/components/hc/PointsPill";
import { Switch } from "@/components/hc/Choice";
import { SegmentedControl } from "@/components/hc/Segmented";
import { Input } from "@/components/hc/Field";
import { Progress } from "@/components/hc/Display";
import { AvatarGroup } from "@/components/hc/Avatar";
import { ChallengeCard, ShopItemCard, demoShop } from "@/components/hc/Domain";
import { cn } from "@/lib/utils";

function Cell({ href, name, spec, className, children }: { href: string; name: string; spec: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("group relative flex flex-col bg-surface", className)}>
      <div className="flex flex-1 items-center justify-center p-4">{children}</div>
      <Link
        href={href}
        className="flex items-center justify-between gap-1 border-t border-border px-2 py-1 text-sm font-bold outline-none hover:text-primary-ink focus-visible:bg-primary-soft"
      >
        <span>{name}</span>
        <span className="flex items-center gap-1 font-mono text-mono font-normal text-text-muted">
          {spec}
          <ArrowRightIcon className="size-2 transition-transform duration-200 group-hover:translate-x-half" />
        </span>
      </Link>
    </div>
  );
}

export function Specimens() {
  const [on, setOn] = useState(true);
  const [tab, setTab] = useState("Open");
  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-6">
      <Cell href="/components/button" name="Button" spec="h 40 · r 8" className="md:col-span-2">
        <div className="flex flex-wrap justify-center gap-1">
          <Button>Start challenge</Button>
          <Button variant="secondary">Details</Button>
        </div>
      </Cell>
      <Cell href="/components/points-pill" name="Points pill" spec="h 32 · r pill" className="md:col-span-2">
        <PointsPill value={1240} />
      </Cell>
      <Cell href="/components/badge" name="Badge" spec="h 24 · pad 8" className="md:col-span-2">
        <div className="flex flex-wrap justify-center gap-1">
          <Badge tone="primary">Social</Badge>
          <Badge tone="gold">+40 pts</Badge>
          <Badge tone="success" dot>Done</Badge>
          <Badge tone="danger">Only 4 left</Badge>
        </div>
      </Cell>
      <Cell href="/components/challenge-card" name="Challenge card" spec="w 320 · pad 24" className="md:col-span-3 md:row-span-2">
        <div className="w-full max-w-40">
          <ChallengeCard title="Meet a sponsor" category="Sponsor" points={40} difficulty="Medium" status="in_progress" qr />
        </div>
      </Cell>
      <Cell href="/components/shop-item-card" name="Shop item card" spec="w 288 · r 16" className="md:col-span-3 md:row-span-2">
        <div className="w-full max-w-30">
          <ShopItemCard item={demoShop[4]} balance={300} />
        </div>
      </Cell>
      <Cell href="/components/segmented-control" name="Segmented control" spec="h 40 · pad 4" className="md:col-span-2">
        <SegmentedControl label="Market filter" options={["Open", "Closed", "Mine"]} value={tab} onChange={setTab} />
      </Cell>
      <Cell href="/components/switch" name="Switch" spec="w 40 · h 24" className="md:col-span-2">
        <Switch label="Sounds" checked={on} onChange={setOn} />
      </Cell>
      <Cell href="/components/avatar" name="Avatar group" spec="32 · overlap 8" className="md:col-span-2">
        <AvatarGroup names={["Lucas Vu", "Maya Chen", "Sam Okafor", "Priya Nair", "Leo Tran"]} />
      </Cell>
      <Cell href="/components/input" name="Input" spec="h 40 · pad 16" className="md:col-span-3">
        <div className="w-full max-w-36">
          <Input label="Find a team" placeholder="Name or skill" leading={<MagnifyingGlassIcon />} />
        </div>
      </Cell>
      <Cell href="/components/progress" name="Progress" spec="h 8 · r pill" className="md:col-span-3">
        <div className="flex w-full max-w-36 items-center gap-2">
          <TrophyIcon className="size-3 shrink-0 text-gold-ink" />
          <div className="flex-1">
            <Progress value={5} max={8} label="5 of 8 challenges" tone="gold" />
          </div>
        </div>
      </Cell>
    </div>
  );
}
