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

<div class="page">
	<Container size="md">
		<div class="page-header">
			<h1 class="title">Work</h1>
		</div>
		<Timeline items={data.items} />
	</Container>
</div>

<style>
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
</style>
