# Hack Canada Design System

The rules, tokens and components behind the Hack Canada hacker dashboard: principles, UX laws, contrast, color, type, a strict rule-of-8 spacing scale, grid, motion, 35 documented components with live redlines, patterns, micro-interactions and full-screen blueprints.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # types, ESLint and the rule-of-8 spacing check
npm run build      # static export to out/
```

To build for GitHub Pages under a sub-path:

```bash
NEXT_PUBLIC_BASE_PATH=/hackcanada-design-system npm run build
```

`.github/workflows/pages.yml` does this on every push to `main`. Turn on Pages in the repo settings with "GitHub Actions" as the source.

## Rules in one breath

- Spacing, sizes and line heights are multiples of 8. 4 is the only half step, for tight spots inside a component. Tailwind's default spacing scale is turned off, so `p-1` is 8 px, `p-2` 16 px, `p-3` 24 px.
- Blue is for actions, gold only means points, red is only for errors.
- WCAG 2.2 AA in light and dark. Contrast is calculated from the real tokens on `/principles/contrast`.
- Motion is 100, 200, 300 or 500 ms, and respects reduced motion.

## Where things live

| Path | What |
|---|---|
| `app/globals.css` | All tokens (`@theme` and the light/dark `--hc-*` values) |
| `lib/tokens.ts` | Hex mirror of the color tokens, used for contrast math |
| `components/hc` | Hack Canada components |
| `components/site` | The docs shell: sidebar, search, grid overlay, `Spec` redlines |
| `components/docs` | Live demos for docs pages |
| `lib/registry-*.ts` | Docs content for every component page |
| `scripts/lint-spacing.mjs` | Fails on off-grid arbitrary values like `p-[10px]` |

## Shortcuts

`Ctrl K` or `/` opens search. `G` toggles the column grid on any page.
