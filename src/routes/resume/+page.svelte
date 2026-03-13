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

<div class="page">
	<Container size="md">
		<div class="page-header">
			<h1 class="title">Resume</h1>
		</div>
		<Timeline items={data.items} />
	</Container>
</div>

<style>
	.bg {
		position: fixed;
		inset: 0;
		background-color: #0c1220;
		z-index: -1;
	}

	.circle {
		position: fixed;
		width: min(700px, 80vmin);
		height: min(700px, 80vmin);
		background-color: #f97316;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 0;
	}

	.page {
		position: relative;
		z-index: 1;
		min-height: 100dvh;
		padding-top: 5rem;
		padding-bottom: var(--space-16);

		--color-text-primary: #ffffff;
		--color-text-secondary: rgba(255, 255, 255, 0.85);
		--color-text-tertiary: rgba(255, 255, 255, 0.55);
		--color-accent-crimson: #ffffff;
		--color-bg-primary: transparent;
		--color-bg-secondary: rgba(255, 255, 255, 0.08);
		--color-bg-tertiary: rgba(255, 255, 255, 0.14);
		--color-border: rgba(255, 255, 255, 0.18);
		--color-border-light: rgba(255, 255, 255, 0.1);
		--color-link: #ffffff;
		--color-link-hover: rgba(255, 255, 255, 0.75);
	}

	.page-header {
		margin-bottom: var(--space-10);
	}

	.title {
		font-size: var(--text-3xl);
		color: var(--color-text-primary);
		margin-bottom: 0;
	}
</style>
