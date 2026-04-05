<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Timeline from '$lib/components/portfolio/Timeline.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Work - Marcus Lee</title>
	<meta name="description" content="Professional experience and roles." />
</svelte:head>

<a href="/" class="back-link">home</a>

<div class="page">
	<Container size="md">
		<div class="page-header">
			<h1 class="title">Work</h1>
		</div>
		<Timeline items={data.items} />
	</Container>
</div>

<style>
	.back-link {
		position: fixed;
		left: var(--space-8);
		top: var(--space-8);
		z-index: 10;
		font-size: var(--text-base);
		color: rgba(245, 240, 232, 0.55);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: rgba(245, 240, 232, 0.9);
	}

	.page {
		min-height: 100dvh;
		padding-top: 5rem;
		padding-bottom: var(--space-16);
	}

	.page-header {
		margin-bottom: var(--space-10);
	}

	.title {
		font-size: var(--text-3xl);
		color: #f5f0e8;
		margin-bottom: 0;
	}

	@media (max-width: 640px) {
		.back-link {
			position: relative;
			left: auto;
			top: auto;
			display: block;
			padding: var(--space-4) var(--space-4) 0;
		}

		.page {
			padding-top: var(--space-6);
		}
	}
</style>
