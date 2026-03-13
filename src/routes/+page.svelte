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
