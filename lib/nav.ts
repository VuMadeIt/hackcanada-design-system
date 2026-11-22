export type NavItem = { title: string; href: string; badge?: string };
export type NavGroup = { title: string; items: NavItem[] };

export const componentNav: NavItem[] = [
  { title: "Button", href: "/components/button" },
  { title: "Icon button", href: "/components/icon-button" },
  { title: "Badge", href: "/components/badge" },
  { title: "Points pill", href: "/components/points-pill" },
  { title: "Avatar", href: "/components/avatar" },
  { title: "Card", href: "/components/card" },
  { title: "Input", href: "/components/input" },
  { title: "Textarea", href: "/components/textarea" },
  { title: "Select", href: "/components/select" },
  { title: "Checkbox", href: "/components/checkbox" },
  { title: "Radio group", href: "/components/radio" },
  { title: "Switch", href: "/components/switch" },
  { title: "Segmented control", href: "/components/segmented-control" },
  { title: "Tabs", href: "/components/tabs" },
  { title: "Accordion", href: "/components/accordion" },
  { title: "Dialog", href: "/components/dialog" },
  { title: "Tooltip", href: "/components/tooltip" },
  { title: "Toast", href: "/components/toast" },
  { title: "Alert", href: "/components/alert" },
  { title: "Progress", href: "/components/progress" },
  { title: "Timeline", href: "/components/timeline" },
  { title: "Skeleton", href: "/components/skeleton" },
  { title: "Table", href: "/components/table" },
  { title: "Empty state", href: "/components/empty-state" },
  { title: "Breadcrumb", href: "/components/breadcrumb" },
  { title: "Pagination", href: "/components/pagination" },
  { title: "Nav item", href: "/components/nav-item" },
  { title: "Stat card", href: "/components/stat-card" },
  { title: "Countdown", href: "/components/countdown" },
  { title: "Shop item card", href: "/components/shop-item-card" },
  { title: "Challenge card", href: "/components/challenge-card" },
  { title: "Market card", href: "/components/market-card" },
  { title: "Bet slip", href: "/components/bet-slip" },
  { title: "Leaderboard", href: "/components/leaderboard" },
  { title: "Mini game card", href: "/components/mini-game-card" },
];

export const nav: NavGroup[] = [
  {
    title: "Start here",
    items: [
      { title: "Overview", href: "/" },
      { title: "Getting started", href: "/getting-started" },
      { title: "Rules at a glance", href: "/rules" },
    ],
  },
  {
    title: "Principles",
    items: [
      { title: "Design principles", href: "/principles" },
      { title: "UX laws", href: "/principles/ux-laws" },
      { title: "Gestalt", href: "/principles/gestalt" },
      { title: "Contrast and hierarchy", href: "/principles/contrast" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Color", href: "/foundations/color" },
      { title: "Typography", href: "/foundations/typography" },
      { title: "Spacing: rule of 8", href: "/foundations/spacing" },
      { title: "Grid and layout", href: "/foundations/grid" },
      { title: "Radius and elevation", href: "/foundations/radius-elevation" },
      { title: "Iconography", href: "/foundations/iconography" },
      { title: "Imagery", href: "/foundations/imagery" },
      { title: "Motion", href: "/foundations/motion" },
      { title: "Dark mode", href: "/foundations/dark-mode" },
      { title: "Accessibility", href: "/foundations/accessibility" },
      { title: "Voice and content", href: "/foundations/voice" },
    ],
  },
  { title: "Components", items: componentNav },
  {
    title: "Patterns",
    items: [
      { title: "Page layout", href: "/patterns/page-layout" },
      { title: "Forms", href: "/patterns/forms" },
      { title: "Empty, loading, error", href: "/patterns/states" },
      { title: "Redeeming a prize", href: "/patterns/redeem" },
      { title: "Challenge flow", href: "/patterns/challenge-flow" },
    ],
  },
  {
    title: "Motion",
    items: [{ title: "Micro-interactions", href: "/micro-interactions" }],
  },
  {
    title: "Blueprints",
    items: [
      { title: "Store screen", href: "/blueprints/store" },
      { title: "Bet Points screen", href: "/blueprints/bets" },
      { title: "Figma audit", href: "/blueprints/figma-audit" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Tokens", href: "/resources/tokens" },
      { title: "Images", href: "/resources/images" },
      { title: "Changelog", href: "/resources/changelog" },
    ],
  },
];

export const flatNav: NavItem[] = nav.flatMap((g) => g.items);
