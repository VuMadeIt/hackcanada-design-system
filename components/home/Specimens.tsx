"use client";

import Link from "next/link";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/hc/Button";
import { Badge } from "@/components/hc/Badge";
import { PointsPill } from "@/components/hc/PointsPill";
import { Switch } from "@/components/hc/Choice";
import { SegmentedControl, Tabs } from "@/components/hc/Segmented";
import { Input } from "@/components/hc/Field";
import { Countdown, Progress } from "@/components/hc/Display";
import { AvatarGroup } from "@/components/hc/Avatar";
import { ChallengeCard, MarketCard, ShopItemCard, demoShop } from "@/components/hc/Domain";
import { cn } from "@/lib/utils";

function Tile({ href, name, kind, className, children }: { href: string; name: string; kind: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("group flex flex-col gap-1", className)}>
      <div className="flex min-h-30 flex-1 items-center justify-center rounded-lg bg-bg-muted p-4 transition-colors duration-200">
        {children}
      </div>
      <Link href={href} className="flex items-baseline justify-between gap-1 rounded-xs text-sm">
        <span className="font-medium text-text group-hover:text-primary">{name}</span>
        <span className="text-text-muted">{kind}</span>
      </Link>
    </div>
  );
}

export function Specimens() {
  const [on, setOn] = useState(true);
  const [tab, setTab] = useState("Open");
  const [view, setView] = useState("all");
  const [target] = useState(() => Date.now() + (19 * 60 + 42) * 60 * 1000);
  return (
    <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      <Tile href="/components/button" name="Button" kind="Actions">
        <div className="flex flex-wrap items-center justify-center gap-1">
          <Button>Start challenge</Button>
          <Button variant="secondary">Details</Button>
        </div>
      </Tile>
      <Tile href="/components/points-pill" name="Points pill" kind="Hack Canada">
        <PointsPill value={1240} />
      </Tile>
      <Tile href="/components/badge" name="Badge" kind="Display">
        <div className="flex flex-wrap items-center justify-center gap-1">
          <Badge tone="primary">Social</Badge>
          <Badge tone="gold">+40 pts</Badge>
          <Badge tone="success" dot>Done</Badge>
        </div>
      </Tile>
      <Tile href="/components/challenge-card" name="Challenge card" kind="Hack Canada" className="lg:row-span-2">
        <div className="w-full max-w-40">
          <ChallengeCard title="Meet a sponsor" category="Sponsor" points={25} difficulty="Easy" status="in_progress" qr />
        </div>
      </Tile>
      <Tile href="/components/segmented-control" name="Segmented control" kind="Inputs">
        <SegmentedControl label="Filter" options={["Open", "Closed", "Mine"]} value={tab} onChange={setTab} />
      </Tile>
      <Tile href="/components/shop-item-card" name="Shop item card" kind="Hack Canada" className="lg:row-span-2">
        <div className="w-full max-w-36">
          <ShopItemCard item={demoShop[4]} balance={240} />
        </div>
      </Tile>
      <Tile href="/components/switch" name="Switch" kind="Inputs">
        <Switch label="Sounds" checked={on} onChange={setOn} />
      </Tile>
      <Tile href="/components/input" name="Input" kind="Inputs">
        <div className="w-full max-w-30">
          <Input label="Find a team" placeholder="Name or skill" leading={<MagnifyingGlassIcon />} />
        </div>
      </Tile>
      <Tile href="/components/progress" name="Progress" kind="Feedback">
        <div className="w-full max-w-30">
          <Progress label="Toward Charger" value={180} max={250} tone="gold" />
        </div>
      </Tile>
      <Tile href="/components/countdown" name="Countdown" kind="Display">
        <Countdown target={target} />
      </Tile>
      <Tile href="/components/market-card" name="Market card" kind="Hack Canada">
        <div className="w-full max-w-40">
          <MarketCard question="Will a team demo working hardware?" yes={62} pool={4200} closes="in 2h" />
        </div>
      </Tile>
      <Tile href="/components/tabs" name="Tabs" kind="Navigation">
        <Tabs label="Challenges" value={view} onChange={setView} tabs={[{ id: "all", label: "All", count: 8 }, { id: "open", label: "Open" }, { id: "done", label: "Done" }]} />
      </Tile>
      <Tile href="/components/avatar" name="Avatar group" kind="Display">
        <AvatarGroup names={["Ada Park", "Mia Chen", "Sam Okafor", "Priya N", "Lucas Vu", "Jo Kim"]} size="md" />
      </Tile>
    </div>
  );
}
