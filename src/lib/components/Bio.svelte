<script lang="ts">
  import { navigateFn } from '$lib/stores/canvas';
</script>

<div class="bio">
  <h1 class="name">Marcus Lee</h1>
  <p class="body">
    A student pursuing his BA in Computer Science at Williams College. His work spans distributed systems, automated cloud infrastructure, and frontend design. Currently exploring thoughtful AI tooling for students and decentralized economies—
    <a target="_blank" rel="noopener noreferrer" href="https://medium.com/design-bootcamp/we-love-automation-but-hate-ai-what-ux-teaches-us-about-control-and-trust-c2f41c29906b">building software for people that makes them feel empowered and in control.</a>
    Between Kubernetes and Svelte, he'll always welcome a conversation over a lightly-brewed cup of tea.
  </p>
  <div class="actions">
    <button onclick={() => $navigateFn?.('portfolio')}>→ See my work</button>
    <button onclick={() => $navigateFn?.('garden')}>→ Read my writing</button>
    <button onclick={() => $navigateFn?.('links')}>→ Links</button>
  </div>
  <div class="social">
    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/marcusnglee">LinkedIn</a>
    <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/marcusnglee">GitHub</a>
  </div>
</div>

<style>
  .bio {
    padding: 2.5rem;
    font-family: Montserrat, sans-serif;
  }

  .name {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 1.25rem;
    letter-spacing: -0.03em;
  }

  .body {
    font-size: 0.9rem;
    color: #555;
    line-height: 1.8;
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
    flex-direction: column;
    gap: 0.5rem;
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
    cursor: pointer;
    text-align: left;
    transition: color 0.15s ease;
    letter-spacing: 0.01em;
  }

  .actions button:hover {
    color: #1a1a1a;
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
</style>
