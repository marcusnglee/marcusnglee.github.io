<script lang="ts">
  import { navigateFn } from '$lib/stores/canvas';
</script>

<div class="bio">
  <div class="bio-top">
    <h1 class="name">Marcus Lee</h1>
    <p class="tagline">Computer Science · Williams College</p>
  </div>

  <hr class="divider" />

  <p class="body">
    A student pursuing his BA in Computer Science at Williams College. His work spans distributed
    systems, automated cloud infrastructure, and frontend design. Currently exploring thoughtful AI
    tooling for students and decentralized economies —
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://medium.com/design-bootcamp/we-love-automation-but-hate-ai-what-ux-teaches-us-about-control-and-trust-c2f41c29906b"
      >building software for people that makes them feel empowered and in control.</a
    >
    Between Kubernetes and Svelte, he'll always welcome a conversation over a lightly-brewed cup of
    tea.
  </p>

  <div class="actions">
    <button onclick={() => $navigateFn?.('portfolio')}>→ Work</button>
    <button onclick={() => $navigateFn?.('garden')}>→ Garden</button>
    <button onclick={() => $navigateFn?.('links')}>→ Links</button>
  </div>

  <div class="footer">
    <div class="social">
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/marcusnglee">LinkedIn</a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/marcusnglee">GitHub</a>
    </div>
    <p class="hint">feel free to browse around!</p>
  </div>
</div>

<style>
  .bio {
    font-family: Montserrat, sans-serif;
    width: min(580px, calc(100vw - 5rem));
    pointer-events: auto;
  }

  .bio-top {
    margin-bottom: 1.5rem;
  }

  .name {
    font-size: clamp(1.8rem, 4vw, 2.75rem);
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.4rem;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .tagline {
    font-size: 0.8rem;
    color: #aaa;
    margin: 0;
    letter-spacing: 0.04em;
  }

  .divider {
    border: none;
    border-top: 1px solid #e0dbd3;
    margin: 0 0 1.5rem;
  }

  .body {
    font-size: 0.9rem;
    color: #555;
    line-height: 1.85;
    margin: 0 0 1.75rem;
  }

  .body a {
    color: #555;
    text-decoration: none;
    border-bottom: 1px solid #c8c3b8;
    padding-bottom: 1px;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .body a:hover {
    color: #1a1a1a;
    border-color: #1a1a1a;
  }

  .actions {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.75rem;
  }

  .actions button {
    background: none;
    border: none;
    padding: 0;
    font-family: Montserrat, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #555;
    transition: color 0.15s ease;
    letter-spacing: 0.01em;
  }

  .actions button:hover {
    color: #1a1a1a;
  }

  .footer {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .social {
    display: flex;
    gap: 1.25rem;
  }

  .social a {
    font-size: 0.8rem;
    color: #888;
    text-decoration: none;
    border-bottom: 1px solid #e0dbd3;
    padding-bottom: 1px;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .social a:hover {
    color: #1a1a1a;
    border-color: #1a1a1a;
  }

  .hint {
    font-size: 0.75rem;
    color: #bbb;
    margin: 0;
    font-style: italic;
  }
</style>
