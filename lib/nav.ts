export type NavItem = { title: string; href: string; badge?: string; group?: string };
export type NavGroup = { title: string; items: NavItem[] };

export const componentNav: NavItem[] = [
  { title: "Button", href: "/components/button", group: "Actions" },
  { title: "Icon button", href: "/components/icon-button", group: "Actions" },
  { title: "Badge", href: "/components/badge", group: "Display" },
  { title: "Points pill", href: "/components/points-pill", group: "Hack Canada" },
  { title: "Avatar", href: "/components/avatar", group: "Display" },
  { title: "Card", href: "/components/card", group: "Display" },
  { title: "Input", href: "/components/input", group: "Inputs" },
  { title: "Textarea", href: "/components/textarea", group: "Inputs" },
  { title: "Select", href: "/components/select", group: "Inputs" },
  { title: "Checkbox", href: "/components/checkbox", group: "Inputs" },
  { title: "Radio group", href: "/components/radio", group: "Inputs" },
  { title: "Switch", href: "/components/switch", group: "Inputs" },
  { title: "Segmented control", href: "/components/segmented-control", group: "Navigation" },
  { title: "Tabs", href: "/components/tabs", group: "Navigation" },
  { title: "Accordion", href: "/components/accordion", group: "Display" },
  { title: "Dialog", href: "/components/dialog", group: "Overlays" },
  { title: "Tooltip", href: "/components/tooltip", group: "Overlays" },
  { title: "Toast", href: "/components/toast", group: "Feedback" },
  { title: "Alert", href: "/components/alert", group: "Feedback" },
  { title: "Progress", href: "/components/progress", group: "Feedback" },
  { title: "Timeline", href: "/components/timeline", group: "Display" },
  { title: "Skeleton", href: "/components/skeleton", group: "Feedback" },
  { title: "Table", href: "/components/table", group: "Display" },
  { title: "Empty state", href: "/components/empty-state", group: "Feedback" },
  { title: "Breadcrumb", href: "/components/breadcrumb", group: "Navigation" },
  { title: "Pagination", href: "/components/pagination", group: "Navigation" },
  { title: "Nav item", href: "/components/nav-item", group: "Navigation" },
  { title: "Stat card", href: "/components/stat-card", group: "Display" },
  { title: "Countdown", href: "/components/countdown", group: "Hack Canada" },
  { title: "Shop item card", href: "/components/shop-item-card", group: "Hack Canada" },
  { title: "Challenge card", href: "/components/challenge-card", group: "Hack Canada" },
  { title: "Market card", href: "/components/market-card", group: "Hack Canada" },
  { title: "Bet slip", href: "/components/bet-slip", group: "Hack Canada" },
  { title: "Leaderboard", href: "/components/leaderboard", group: "Hack Canada" },
  { title: "Mini game card", href: "/components/mini-game-card", group: "Hack Canada" },
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
      { title: "Use with Claude", href: "/resources/claude" },
      { title: "Changelog", href: "/resources/changelog" },
    ],
  },
];

export const flatNav: NavItem[] = nav.flatMap((g) => g.items);
