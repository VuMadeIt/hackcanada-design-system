export type ImageGroup = "Mascot" | "Brand" | "Store" | "Games" | "Teams";

export type ImageSlot = {
  id: string;
  file: string;
  label: string;
  group: ImageGroup;
  alt: string;
  usedOn: string[];
};

/**
 * Every image the site shows. To change one for good, drop a new file into
 * public/ with the same path, or point `file` somewhere else. To try a new
 * set without touching code, use Resources → Images.
 */
export const imageSlots: ImageSlot[] = [
  { id: "brand.logo", file: "/img/logo-circle.png", label: "Logo", group: "Brand", alt: "Hack Canada", usedOn: ["Sidebar", "Home"] },
  { id: "mascot.laptop", file: "/img/beaver-laptop.png", label: "Beaver at a laptop", group: "Mascot", alt: "Beaver typing on a laptop", usedOn: ["Home hero", "Start here pages"] },
  { id: "mascot.idea", file: "/img/beaver-idea.png", label: "Beaver with an idea", group: "Mascot", alt: "Beaver with a light bulb", usedOn: ["Principles pages", "Empty states"] },
  { id: "mascot.pencil", file: "/img/beaver-pencil.png", label: "Beaver with a pencil", group: "Mascot", alt: "Beaver holding a pencil", usedOn: ["Foundations pages", "Blueprints"] },
  { id: "mascot.business", file: "/img/beaver-business.png", label: "Beaver in a suit", group: "Mascot", alt: "Beaver in a suit and tie", usedOn: ["Components pages"] },
  { id: "mascot.star", file: "/img/beaver-star.png", label: "Beaver with a star", group: "Mascot", alt: "Beaver with a gold star", usedOn: ["Patterns pages", "Motion"] },
  { id: "mascot.money", file: "/img/beaver-money.png", label: "Beaver with points", group: "Mascot", alt: "Beaver holding a money bag", usedOn: ["Resources pages", "Home"] },
  { id: "teams.start", file: "/img/teams/start-team.png", label: "Start a team", group: "Teams", alt: "Beaver starting a team", usedOn: ["Home gallery"] },
  { id: "teams.join", file: "/img/teams/join-team.png", label: "Join a team", group: "Teams", alt: "Beaver joining a team", usedOn: ["Home gallery"] },
  { id: "games.timber", file: "/img/games/timber-title.jpg", label: "Timber Tycoon", group: "Games", alt: "Timber Tycoon title card", usedOn: ["Mini game card", "Imagery", "Home gallery"] },
  { id: "games.cup", file: "/img/games/cup.svg", label: "Cup Shuffle cup", group: "Games", alt: "Blue cup from Cup Shuffle", usedOn: ["Mini game card", "Micro-interactions", "Imagery"] },
  { id: "shop.candy", file: "/img/shop/sour-patch-kids.jpg", label: "Sour Patch Kids", group: "Store", alt: "Bag of Sour Patch Kids", usedOn: ["Shop item card", "Redeem pattern"] },
  { id: "shop.led", file: "/img/shop/led-strips.jpg", label: "LED strips", group: "Store", alt: "Roll of LED strips", usedOn: ["Shop item card", "Redeem pattern"] },
  { id: "shop.tamagotchi", file: "/img/shop/tamagotchi.jpg", label: "Tamagotchi", group: "Store", alt: "Tamagotchi", usedOn: ["Shop item card", "Redeem pattern"] },
  { id: "shop.charger", file: "/img/shop/charger.jpg", label: "Charger", group: "Store", alt: "Magnetic phone charger", usedOn: ["Shop item card", "Redeem pattern"] },
  { id: "shop.pico", file: "/img/shop/microcontroller.jpg", label: "Microcontroller", group: "Store", alt: "Raspberry Pi Pico", usedOn: ["Shop item card", "Redeem pattern"] },
  { id: "shop.screwdrivers", file: "/img/shop/screwdrivers.jpg", label: "Screwdrivers", group: "Store", alt: "Precision screwdriver set", usedOn: ["Shop item card", "Redeem pattern"] },
];

export const imageGroups: ImageGroup[] = ["Mascot", "Brand", "Teams", "Games", "Store"];

export const slotById = Object.fromEntries(imageSlots.map((s) => [s.id, s])) as Record<string, ImageSlot>;

/** Mascot shown in the page header for each part of the site. */
export function mascotFor(pathname: string) {
  const p = pathname.replace(/\/$/, "");
  if (p.startsWith("/principles")) return "mascot.idea";
  if (p.startsWith("/foundations")) return "mascot.pencil";
  if (p.startsWith("/components")) return "mascot.business";
  if (p.startsWith("/patterns") || p.startsWith("/micro-interactions")) return "mascot.star";
  if (p.startsWith("/resources")) return "mascot.money";
  return "mascot.laptop";
}
