<script lang="ts">
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

{#each works as work}
  <a
    class="panel"
    href={work.link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="panel-image">
      <img src={work.img} alt={work.title} />
    </div>
    <div class="panel-info">
      <p class="category">{work.category}</p>
      <h3 class="title">{work.title}</h3>
      <p class="desc">{work.description}</p>
      <span class="visit">visit →</span>
    </div>
  </a>
{/each}

<style>
  .panel {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: max(340px, 32vw);
    height: 100%;
    text-decoration: none;
    scroll-snap-align: start;
    border-right: 1px solid #e0dbd3;
    overflow: hidden;
    transition: background 0.2s ease;
  }

  .panel:hover {
    background: #ebe8e2;
  }

  .panel-image {
    flex: 0 0 55%;
    overflow: hidden;
  }

  .panel-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease, filter 0.3s ease;
  }

  .panel:hover .panel-image img {
    transform: scale(1.04);
    filter: brightness(0.92);
  }

  .panel-info {
    flex: 1;
    padding: 1.75rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: Montserrat, sans-serif;
  }

  .category {
    font-size: 0.7rem;
    color: #aaa;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0 0 0.5rem;
  }

  .title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.6rem;
    letter-spacing: -0.02em;
    line-height: 1.25;
  }

  .desc {
    font-size: 0.82rem;
    color: #777;
    margin: 0 0 1.25rem;
    line-height: 1.7;
  }

  .visit {
    font-size: 0.78rem;
    font-weight: 600;
    color: #aaa;
    letter-spacing: 0.04em;
    transition: color 0.15s ease;
  }

  .panel:hover .visit {
    color: #1a1a1a;
  }
</style>
