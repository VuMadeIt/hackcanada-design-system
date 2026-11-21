"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Spec } from "@/components/site/Spec";
import { ShopItemCard, demoShop, MarketCard, BetSlip, Leaderboard } from "@/components/hc/Domain";
import { PointsPill } from "@/components/hc/PointsPill";
import { SegmentedControl } from "@/components/hc/Segmented";
import { useState } from "react";

function Header({ title, sub, right }: { title: string; sub: string; right?: React.ReactNode }) {
  return (
    <div data-spec="page header" className="flex items-end justify-between gap-2">
      <div>
        <p className="text-3xl font-bold tracking-tight">{title}</p>
        <p className="text-sm text-text-muted">{sub}</p>
      </div>
      {right}
    </div>
  );
}

export function StoreBlueprint() {
  const [tab, setTab] = useState("All");
  return (
    <Spec label="Store · desktop main column" width={928} hugWidth={false}>
      <div className="flex flex-col gap-4 bg-bg p-4">
        <Header title="Store" sub="Spend the points you earn. Limited stock." right={<PointsPill value={300} />} />
        <div data-spec="filters" className="flex items-center gap-2">
          <SegmentedControl label="Category" options={["All", "Snacks", "Hardware", "Tools"]} value={tab} onChange={setTab} />
          <span className="ml-auto flex h-5 w-30 items-center gap-1 rounded-sm border border-border-input bg-surface px-2 text-sm text-text-muted"><MagnifyingGlassIcon className="size-2" />Search</span>
        </div>
        <div data-spec="grid" className="grid grid-cols-3 gap-3">
          {demoShop.map((it) => <ShopItemCard key={it.name} item={it} />)}
        </div>
      </div>
    </Spec>
  );
}

export function BetsBlueprint() {
  return (
    <Spec label="Bet Points · desktop" width={928} hugWidth={false}>
      <div className="flex flex-col gap-4 bg-bg p-4">
        <Header title="Bet Points" sub="Put points on what happens this weekend." right={<PointsPill value={240} />} />
        <div className="grid grid-cols-[1fr_320px] gap-3">
          <div data-spec="markets" className="flex flex-col gap-3">
            <MarketCard question="Will a team ship a hardware hack?" yes={72} pool={4820} closes="Sat 18:00" />
            <MarketCard question="Will the winning team use a beaver in their demo?" yes={38} pool={2210} closes="Sun 11:00" />
          </div>
          <div data-spec="aside" className="flex flex-col gap-3">
            <BetSlip />
            <Leaderboard rows={[{ name: "Ava Chen", points: 2140 }, { name: "Lucas Vu", points: 1780, you: true }, { name: "Omar Haddad", points: 1510 }]} />
          </div>
        </div>
      </div>
    </Spec>
  );
}
