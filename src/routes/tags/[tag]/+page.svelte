<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import NoteCard from '$lib/components/garden/NoteCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>#{data.tag} - Marcus Lee</title>
	<meta name="description" content="Notes tagged with {data.tag}" />
</svelte:head>

<Container size="lg">
	<div class="page-header">
		<nav class="breadcrumb">
			<a href="/garden" class="breadcrumb-link">Garden</a>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">#{data.tag}</span>
		</nav>

		<h1 class="page-title">#{data.tag}</h1>
		<p class="page-description">
			{data.notes.length} note{data.notes.length === 1 ? '' : 's'} tagged with <strong
				>{data.tag}</strong
			>
		</p>
	</div>

	{#if data.notes.length > 0}
		<div class="notes-grid">
			{#each data.notes as note}
				<NoteCard {note} />
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p>No notes found with this tag.</p>
		</div>
	{/if}
</Container>

<style>
	.page-header {
		margin: var(--space-12) 0 var(--space-8);
		text-align: center;
	}

	.page-title {
		font-family: var(--font-serif);
		font-size: var(--text-3xl);
		font-weight: var(--font-semibold);
		color: var(--color-accent-crimson);
		margin-bottom: var(--space-3);
	}

	.page-description {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	.notes-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
		margin-bottom: var(--space-16);
	}

	@media (min-width: 768px) {
		.notes-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.notes-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16);
		color: var(--color-text-secondary);
		font-size: var(--text-lg);
	}
</style>
