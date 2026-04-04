<script lang="ts">
</script>

<div class="bio">
  <div class="bio-header">
    <h1 class="name">Marcus Lee</h1>
    <p class="tagline">Computer Science · Williams College</p>
  </div>

  <div class="bio-body">
    <p class="body">
      <strong>Marcus Lee</strong> is a student pursuing his BA in Computer Science at Williams College. His work spans distributed
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
  </div>

  <div class="interests">
    <div class="interest-col">
      <p class="interest-label">I'm currently thinking about...</p>
      <ul>
        <li>Federated / Decentralized Learning</li>
        <li>Personal Knowledge Bases</li>
        <li>Shibori</li>
        <li>Chinese teas!</li>
      </ul>
    </div>
    <div class="interest-col">
      <p class="interest-label">Aspiring to learn about...</p>
      <ul>
        <li>JEPA</li>
        <li>Zero Knowledge Proofs</li>
        <li>Audio Synthesis</li>
        <li>Sewing</li>
      </ul>
    </div>
  </div>

  <div class="bio-footer">
    <div class="social">
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/marcusnglee">LinkedIn</a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/marcusnglee">GitHub</a>
    </div>
  </div>
</div>

<style>
  .bio {
    font-family: Montserrat, sans-serif;
    width: min(820px, calc(100% - 8rem));
    border: 1px solid #d8d2c8;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
  }

  /* ── Header ── */
  .bio-header {
    padding: 1.5rem 1.75rem 1.25rem;
    border-bottom: 1px solid #d8d2c8;
  }

  .name {
    font-size: clamp(1.6rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.3rem;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .tagline {
    font-size: 0.75rem;
    color: #aaa;
    margin: 0;
    letter-spacing: 0.05em;
  }

  /* ── Body ── */
  .bio-body {
    padding: 1.25rem 1.75rem;
    border-bottom: 1px solid #d8d2c8;
  }

  .body {
    font-size: 0.85rem;
    color: #555;
    line-height: 1.85;
    margin: 0;
  }

  .body strong {
    font-weight: 600;
    color: #333;
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

  /* ── Interests ── */
  .interests {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #d8d2c8;
  }

  .interest-col {
    padding: 1.25rem 1.75rem;
  }

  .interest-col:first-child {
    border-right: 1px solid #d8d2c8;
  }

  .interest-label {
    font-size: 0.65rem;
    font-weight: 600;
    color: #bbb;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    margin: 0 0 0.9rem;
  }

  .interest-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .interest-col ul li {
    font-size: 0.82rem;
    color: #666;
    padding: 0.35rem 0;
    border-bottom: 1px solid #ede8e0;
  }

  .interest-col ul li:last-child {
    border-bottom: none;
  }

  /* ── Footer ── */
  .bio-footer {
    padding: 1rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .social {
    display: flex;
    gap: 1.25rem;
  }

  .social a {
    font-size: 0.75rem;
    color: #999;
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
