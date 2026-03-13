<script lang="ts">
  import { navigateFn } from '$lib/stores/canvas';

  export type Work = {
    category: CATEGORY;
    title: string;
    img: string;
    description: string;
    link: string;
  };
  type CATEGORY = 'Professional Experience' | 'Project';

  let { works }: { works: Work[] } = $props();
</script>

<div class="portfolio">
  <div class="header-row">
    <h2 class="heading">Work</h2>
    <button class="back-btn" onclick={() => $navigateFn?.('about')}>← Back to about</button>
  </div>
  <div class="container">
    {#each works as work}
      <div class="project">
        <a target="_blank" rel="noopener noreferrer" href={work.link}>
          <img src={work.img} alt={work.title} />
          <div class="overlay">
            <div class="text-content">
              <h3 class="title">{work.title}</h3>
              <p class="description">{work.description}</p>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .portfolio {
    padding: 2rem 2rem 2.5rem;
    font-family: Montserrat, sans-serif;
  }

  .header-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .heading {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .back-btn {
    background: none;
    border: none;
    padding: 0;
    font-family: Montserrat, sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #888;
    cursor: pointer;
    transition: color 0.15s ease;
    letter-spacing: 0.01em;
  }

  .back-btn:hover {
    color: #1a1a1a;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    width: 100%;
  }

  .project {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .project:hover {
    transform: scale(1.02);
  }

  .project img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
  }

  .project:hover img {
    filter: brightness(0.4) grayscale(0.3);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: rgba(0, 0, 0, 0.1);
  }

  .project:hover .overlay {
    opacity: 1;
  }

  .text-content {
    text-align: center;
    color: rgb(209, 209, 209);
    padding: 1rem;
    max-width: 90%;
  }

  .title {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
  }

  .description {
    font-size: 0.85rem;
    margin: 0;
    line-height: 1.4;
  }
</style>
