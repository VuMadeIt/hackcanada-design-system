# Hack Canada design system: guide for AI agents (Claude, Devin, Codex, Gemini)

This repo documents and implements the Hack Canada hacker dashboard design system. Read this before generating any Hack Canada screen or component.

## Source of truth
| What | Where |
|---|---|
| Tokens (color, type, spacing, radius, motion) | `app/globals.css` (`@theme` + light/dark `--hc-*`), hex mirror in `lib/tokens.ts` |
| Components | `components/hc/*.tsx` |
| Component docs (usage, anatomy, specs, do/don't, a11y, props) | `lib/registry-*.ts`, typed by `lib/registry-types.ts` |
| Images (mascot, brand, teams, games, store) | `lib/images.ts` |
| Astryx theme (site chrome) | `themes/hackcanada/hackcanada.theme.ts`, built copy in `src/themes/hackcanada` |

## Hard rules
- Spacing, sizes and line heights are multiples of 8. 4 px is the only half step (inside components). 1 px is for borders only. Tailwind spacing is remapped: `p-1` = 8 px, `p-2` = 16 px, `gap-0.5` = 4 px. `npm run check` fails on anything else.
- Blue `#1a6dbd` (dark `#4a9eef`) is for actions and links. Gold `#e0a45e` only means points. Red only means errors or destructive actions.
- One primary button per view. Labels are verbs in sentence case ("Redeem", "Place bet").
- Type: Satoshi for UI, JetBrains Mono for numbers in code and specs. Body 16/24, captions 14/24.
- WCAG 2.2 AA in both themes: 4.5:1 text, 3:1 UI. Visible 2 px focus ring. Hit targets 40 px (44 on touch).
- Motion: 100, 200, 300 or 500 ms with `ease-out`; respect `prefers-reduced-motion`.
- Light is the default theme. Dark uses `#0b1520` surfaces, never pure black or white glare.
- Use the real art in `lib/images.ts` (beavers, product photos); don't draw replacements.

## Site chrome
The docs shell uses Meta's Astryx (`@astryxdesign/core`, MIT) themed as `hackcanada`: TopNav, SideNav, TextInput, Button, Badge. Read a component's API with `npx astryx component <Name>` before using it. Theme changes go through `npx astryx experimental theme editor set hackcanada ...`, then `npx astryx theme add hackcanada`; never edit generated files in `src/themes`.

CSS layer order lives in `app/layers.css`. Tailwind preflight is intentionally not imported (Astryx's reset replaces it), and `@theme` is `inline reference` so Tailwind variables don't collide with Astryx tokens of the same name.

## Workflow
- `npm run dev -- -p 4100`, then `npm run check` (types, ESLint, rule-of-8 lint) before every commit.
- New component: add it to `components/hc`, a docs entry to `lib/registry-*.ts`, live demos to `components/docs/demos.tsx`.
- Check light, dark, 375 px and 1440 px before shipping.
