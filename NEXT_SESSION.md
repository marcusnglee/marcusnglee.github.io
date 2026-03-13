# Instructions for Next Claude Session

## What we're building
Infinity canvas redesign for Marcus's personal site. Full plan is in the session transcript:
`/Users/cous/.claude/projects/-Users-cous-Desktop-marcusnglee/30d3edd4-5a09-4ea1-b3a6-43ffd3eedfd8.jsonl`

## Current branch: `3d`

## What's already done ✅
These new files are committed and pushed:
- `src/lib/stores/canvas.ts` — Svelte writable store (`navigateFn`) that holds the canvas navigate function
- `src/lib/components/Canvas.svelte` — Full canvas engine: pan (drag + scroll), zoom (ctrl+scroll, pinch), dot grid background, smooth CSS transition navigation
- `src/lib/components/Frame.svelte` — Positioned card wrapper (absolute div with white bg, border, shadow, optional label)
- `src/lib/components/Header.svelte` — Frosted glass top nav with "marcus lee · About · Work · Garden · Links" buttons that call `$navigateFn`

## What still needs doing ❌

### 1. Modify `src/routes/+page.svelte`
Replace current content entirely. Read the file first, then write:

```svelte
<script lang="ts">
  import Canvas from '$lib/components/Canvas.svelte';
  import Frame from '$lib/components/Frame.svelte';
  import Header from '$lib/components/Header.svelte';
  import Bio from '$lib/components/Bio.svelte';
  import Portfolio from '$lib/components/Portfolio.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  // height is an estimate used only for centering on navigate
  const framePositions = {
    about:     { x: -300, y: -200, width: 600, height: 400 },
    portfolio: { x: 1100, y: -250, width: 740, height: 650 },
    garden:    { x: -300, y: -1400, width: 600, height: 400 },
    links:     { x: -1700, y: -200, width: 480, height: 380 },
  };
</script>

<Header />
<Canvas {framePositions}>
  <Frame id="about"     x={framePositions.about.x}     y={framePositions.about.y}     width={framePositions.about.width}     label="About">
    <Bio />
  </Frame>
  <Frame id="portfolio" x={framePositions.portfolio.x} y={framePositions.portfolio.y} width={framePositions.portfolio.width} label="Work">
    <Portfolio works={data.works} />
  </Frame>
  <Frame id="garden"    x={framePositions.garden.x}    y={framePositions.garden.y}    width={framePositions.garden.width}    label="Garden">
    <div class="placeholder">
      <h2>Garden</h2>
      <p>Writing and notes — coming soon.</p>
    </div>
  </Frame>
  <Frame id="links"     x={framePositions.links.x}     y={framePositions.links.y}     width={framePositions.links.width}     label="Links">
    <div class="placeholder">
      <h2>Links</h2>
      <ul>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/marcusnglee">LinkedIn</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.github.com/marcusnglee">GitHub</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://medium.com/design-bootcamp/we-love-automation-but-hate-ai-what-ux-teaches-us-about-control-and-trust-c2f41c29906b">Medium</a></li>
      </ul>
    </div>
  </Frame>
</Canvas>

<style>
  .placeholder { padding: 2.5rem; font-family: Montserrat, sans-serif; }
  .placeholder h2 { font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin: 0 0 1rem; letter-spacing: -0.02em; }
  .placeholder p { font-size: 0.9rem; color: #888; margin: 0; line-height: 1.7; }
  .placeholder ul { list-style: none; padding: 0; margin: 0; }
  .placeholder ul li { margin: 0.75rem 0; }
  .placeholder ul li a { font-size: 0.9rem; color: #555; text-decoration: none; border-bottom: 1px solid #e0dbd3; padding-bottom: 1px; transition: color 0.15s ease, border-color 0.15s ease; }
  .placeholder ul li a:hover { color: #1a1a1a; border-color: #1a1a1a; }
</style>
```

### 2. Rewrite `src/lib/components/Bio.svelte`
Replace with canvas-frame version:
- Big name heading (`Marcus Lee`)
- Short bio paragraph (keep existing text, slightly condensed)
- Action buttons: `→ See my work` (navigate portfolio), `→ Read my writing` (navigate garden), `→ Links` (navigate links)
- Social links row at bottom (linkedin, github)
- Import `navigateFn` from `$lib/stores/canvas` and use `$navigateFn?.(id)` to navigate
- Styled with Montserrat, padding 2.5rem, no border/shadow (Frame provides those)

### 3. Rewrite `src/lib/components/Portfolio.svelte`
Adapt existing component for canvas frame:
- Keep all existing work data logic and props (`works: Work[]`)
- Add a header row with "Work" h2 + "← Back to about" button that calls `$navigateFn?.('about')`
- Keep the 2-col grid with hover overlay — just update spacing/sizing for the 740px frame width
- Import `navigateFn` from `$lib/stores/canvas`

### 4. Write `src/app.css`
```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 0; overflow: hidden; -webkit-font-smoothing: antialiased; }
button { -webkit-tap-highlight-color: transparent; }
```

### 5. Create `src/routes/+layout.svelte`
To import app.css globally:
```svelte
<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>
{@render children()}
```

## After implementing

1. Run `npm run dev` and verify:
   - Canvas loads, dot grid visible, background is `#F8F6F1`
   - About/Bio frame is centered in viewport on load
   - Drag to pan, scroll to pan, Ctrl+scroll to zoom
   - Header nav links animate to each frame
   - In-frame buttons on Bio also navigate
2. Run `npm run build` — no TypeScript errors
3. Commit all changes with a descriptive message
4. Push to `origin 3d`

## Key implementation notes
- **Svelte 5 syntax**: use `$state()`, `$props()`, `$effect()`, `{@render children()}`, event handlers as `onclick={}` not `on:click={}`
- **Store usage in .svelte**: `$navigateFn` auto-subscribes; call as `$navigateFn?.(id)`
- **Store usage in .ts**: use `.set()` directly (no `$` prefix)
- **Canvas coordinate system**: frame at `(x, y)` is positioned with `position: absolute; left: {x}px; top: {y}px` inside `.canvas-inner` which has `position: absolute; top: 0; left: 0`. The `.canvas-inner` transform is `translate(tx, ty) scale(s)` with `transform-origin: 0 0`.
- **Initial centering**: About frame center = `(-300 + 300, -200 + 200) = (0, 0)`, so `tx = vw/2`, `ty = vh/2` — clean!
- **Montserrat** is already loaded in `app.html` via Google Fonts — no need to import again

## Repo
GitHub: `marcusnglee/marcusnglee.github.io`, branch `3d`
