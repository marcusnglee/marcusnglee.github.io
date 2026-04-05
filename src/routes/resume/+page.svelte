<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Timeline from '$lib/components/portfolio/Timeline.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Resume - Marcus Lee</title>
	<meta name="description" content="Resume, work experience, and education." />
</svelte:head>

<div class="bg" aria-hidden="true"></div>
<div class="circle" aria-hidden="true"></div>

<a href="/" class="back-link">home</a>

<div class="page">
	<div class="hero-section">
		<div class="page-header">
			<h1 class="title">Resume</h1>
			<p class="subtitle">an overview of my professional work. feel free to scroll!</p>
			<span class="scroll-arrow" aria-hidden="true">↓</span>
		</div>
	</div>

	<div class="timeline-section">
		<Container size="md">
			<Timeline items={data.items} />
		</Container>
	</div>
</div>

<style>
	.bg {
		position: fixed;
		inset: 0;
		background-color: #c4622a;
		z-index: -1;
	}

	.circle {
		position: fixed;
		width: min(860px, 94vmin);
		height: min(860px, 94vmin);
		background-color: #122e2b;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 0;
		opacity: 0.9;
	}

	.back-link {
		position: fixed;
		left: var(--space-8);
		top: var(--space-8);
		z-index: 10;
		font-size: var(--text-base);
		color: rgba(253, 244, 236, 0.55);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: rgba(253, 244, 236, 0.85);
	}

	@media (max-width: 640px) {
		.back-link {
			position: relative;
			left: auto;
			top: auto;
			display: block;
			padding: var(--space-4) var(--space-4) 0;
			z-index: 10;
		}

		.hero-section {
			height: calc(100dvh - 3rem);
		}

		.timeline-section {
			padding-bottom: var(--space-16);
		}
	}

	.page {
		position: relative;
		z-index: 1;

		--color-text-primary: #fdf4ec;
		--color-text-secondary: rgba(253, 244, 236, 0.85);
		--color-text-tertiary: rgba(253, 244, 236, 0.55);
		--color-accent-crimson: #fdf4ec;
		--color-bg-primary: transparent;
		--color-bg-secondary: rgba(253, 244, 236, 0.1);
		--color-bg-tertiary: rgba(253, 244, 236, 0.17);
		--color-border: rgba(253, 244, 236, 0.22);
		--color-border-light: rgba(253, 244, 236, 0.12);
		--color-link: #fdf4ec;
		--color-link-hover: rgba(253, 244, 236, 0.75);
	}

	.hero-section {
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page-header {
		text-align: center;
	}

	.title {
		font-size: var(--text-3xl);
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}

	.subtitle {
		font-size: var(--text-base);
		color: rgba(253, 244, 236, 0.6);
		margin-bottom: var(--space-6);
	}

	.scroll-arrow {
		display: block;
		font-size: var(--text-xl);
		color: rgba(253, 244, 236, 0.4);
	}

	.timeline-section {
		padding-bottom: 18rem;
	}
</style>
