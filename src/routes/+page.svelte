<script lang="ts">
  import { fade } from 'svelte/transition';
  import Canvas from '$lib/components/Canvas.svelte';
  import Frame from '$lib/components/Frame.svelte';
  import Header from '$lib/components/Header.svelte';
  import Bio from '$lib/components/Bio.svelte';
  import Portfolio from '$lib/components/Portfolio.svelte';
  import { locked, activeSection, navigateFn } from '$lib/stores/canvas';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  // height is an estimate used only for centering on navigate
  const framePositions = {
    about:     { x: -300, y: -200, width: 600, height: 400 },
    portfolio: { x: 1100, y: -250, width: 740, height: 650 },
    garden:    { x: -300, y:  350, width: 600, height: 400 },
    links:     { x: -1700, y: -200, width: 480, height: 380 },
  };

  // Convert vertical wheel to horizontal scroll on section panels
  function hscroll(node: HTMLElement) {
    function handler(e: WheelEvent) {
      e.preventDefault();
      node.scrollLeft += e.deltaY + e.deltaX;
    }
    node.addEventListener('wheel', handler, { passive: false });
    return { destroy() { node.removeEventListener('wheel', handler); } };
  }
</script>

<Header />

<!-- ── About overlay ─────────────────────────────────────────── -->
<!-- Rendered outside canvas so position:fixed isn't inside a transform context -->
<div class="about-overlay" class:hiding={$locked}>
  <Bio />
</div>

<!-- ── Section overlays ──────────────────────────────────────── -->

{#if $activeSection === 'portfolio'}
  <div class="section-overlay" style="background: #f0ede8;" transition:fade={{ duration: 280, delay: 60 }}>
    <div class="section-scroll" use:hscroll>
      <Portfolio works={data.works} />
    </div>
    <button class="home-btn" onclick={() => $navigateFn?.('about')}>← Home</button>
  </div>
{/if}

{#if $activeSection === 'garden'}
  <div class="section-overlay" style="background: #1a3a26;" transition:fade={{ duration: 280, delay: 60 }}>
    <div class="section-scroll" use:hscroll>
      <div class="section-panel dark">
        <h2>Garden</h2>
        <p>Writing and notes — coming soon.</p>
      </div>
    </div>
    <button class="home-btn dark" onclick={() => $navigateFn?.('about')}>← Home</button>
  </div>
{/if}

{#if $activeSection === 'links'}
  <div class="section-overlay" transition:fade={{ duration: 280, delay: 60 }}>
    <div class="section-scroll" use:hscroll>
      <div class="section-panel">
        <h2>Links</h2>
        <ul>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/marcusnglee">LinkedIn</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.github.com/marcusnglee">GitHub</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://medium.com/design-bootcamp/we-love-automation-but-hate-ai-what-ux-teaches-us-about-control-and-trust-c2f41c29906b">Medium</a></li>
        </ul>
      </div>
    </div>
    <button class="home-btn" onclick={() => $navigateFn?.('about')}>← Home</button>
  </div>
{/if}

<!-- ── Canvas: zoom animation + preview cards only ───────────── -->
<Canvas {framePositions}>
  <Frame id="portfolio" x={framePositions.portfolio.x} y={framePositions.portfolio.y} width={framePositions.portfolio.width} label="Work"   background="#f0ede8" />
  <Frame id="garden"    x={framePositions.garden.x}    y={framePositions.garden.y}    width={framePositions.garden.width}    label="Garden" background="#1a3a26" dark />
  <Frame id="links"     x={framePositions.links.x}     y={framePositions.links.y}     width={framePositions.links.width}     label="Links" />
</Canvas>

<style>
  /* ── About overlay ── */
  .about-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f6f1;
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.35s ease;
  }

  .about-overlay.hiding {
    opacity: 0;
    pointer-events: none;
  }

  /* ── Section overlays ── */
  .section-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: #fff;
    overflow: hidden;
  }

  .section-scroll {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-top: 44px; /* clear the header */
  }

  .section-scroll::-webkit-scrollbar {
    display: none;
  }

  /* Single-panel sections (garden, links) */
  .section-panel {
    flex-shrink: 0;
    width: 100vw;
    height: 100%;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 6rem;
    font-family: Montserrat, sans-serif;
  }

  .section-panel h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 1rem;
    letter-spacing: -0.03em;
  }

  .section-panel p {
    font-size: 0.9rem;
    color: #888;
    margin: 0;
    line-height: 1.8;
  }

  .section-panel ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .section-panel ul li {
    margin: 0.75rem 0;
  }

  .section-panel ul li a {
    font-size: 0.95rem;
    color: #555;
    text-decoration: none;
    border-bottom: 1px solid #e0dbd3;
    padding-bottom: 1px;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .section-panel ul li a:hover {
    color: #1a1a1a;
    border-color: #1a1a1a;
  }

  /* Dark variant (garden) */
  .section-panel.dark h2 {
    color: rgba(220, 255, 220, 0.9);
  }

  .section-panel.dark p {
    color: rgba(180, 220, 180, 0.6);
  }

  /* ── Home button (floating bottom-left) ── */
  .home-btn {
    position: absolute;
    bottom: 1.5rem;
    left: 1.75rem;
    background: none;
    border: none;
    padding: 0;
    font-family: Montserrat, sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #aaa;
    letter-spacing: 0.01em;
    transition: color 0.15s ease;
    z-index: 1;
  }

  .home-btn:hover {
    color: #1a1a1a;
  }

  .home-btn.dark {
    color: rgba(255, 255, 255, 0.35);
  }

  .home-btn.dark:hover {
    color: rgba(255, 255, 255, 0.88);
  }
</style>
