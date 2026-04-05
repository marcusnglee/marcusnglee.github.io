<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Container from '$lib/components/layout/Container.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import { GARDEN_CATEGORIES, type GardenCategory } from '$lib/types/garden';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Get category from URL query param
	const selectedCategory = $derived.by<GardenCategory | 'all'>(() => {
		const param = $page.url.searchParams.get('category');
		if (param && param in GARDEN_CATEGORIES) {
			return param as GardenCategory;
		}
		return 'all';
	});

	const filteredNotes = $derived(
		selectedCategory === 'all'
			? data.notes
			: data.notes.filter((n) => n.category === selectedCategory)
	);

	const categories = Object.entries(GARDEN_CATEGORIES) as [GardenCategory, typeof GARDEN_CATEGORIES[GardenCategory]][];

	function selectCategory(category: GardenCategory | 'all') {
		if (category === 'all') {
			goto('/garden');
		} else {
			goto(`/garden?category=${category}`);
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function getCategoryColor(category: GardenCategory): 'crimson' | 'ochre' | 'sage' | 'default' {
		return GARDEN_CATEGORIES[category]?.color || 'default';
	}
</script>

<svelte:head>
	<title>Garden - Marcus Lee</title>
	<meta
		name="description"
		content="A digital garden of ideas, essays, and explorations in various stages of growth."
	/>
</svelte:head>

<a href="/" class="back-link">home</a>

<Container size="lg">
	<div class="page-header">
		<h1 class="title">Marcus' Garden</h1>
		<p class="description">
			Welcome to my garden! Here, you will find a collection of my thoughts in various stages of growth. I'll be rolling out a way for others to contribute soon. I hope you enjoy your visit!
		</p>
	</div>

	<!-- Category Filter Pills -->
	<div class="filter-section">
		<div class="filter-pills">
			<button
				class="filter-pill"
				class:active={selectedCategory === 'all'}
				onclick={() => selectCategory('all')}
			>
				All
			</button>
			{#each categories as [key, info]}
				<button
					class="filter-pill"
					class:active={selectedCategory === key}
					onclick={() => selectCategory(key)}
				>
					{info.label}
				</button>
			{/each}
		</div>

		<span class="results-count">
			{filteredNotes.length} {filteredNotes.length === 1 ? 'entry' : 'entries'}
		</span>
	</div>

	<!-- Notes List -->
	{#if filteredNotes.length > 0}
		<div class="notes-list">
			{#each filteredNotes as note (note.slug)}
				<a href="/garden/{note.slug}" class="note-item">
					<div class="note-header">
						<Tag
							label={GARDEN_CATEGORIES[note.category]?.label || note.category}
							color={getCategoryColor(note.category)}
							size="sm"
						/>
						<time datetime={note.created} class="note-date">{formatDate(note.created)}</time>
					</div>

					<h2 class="note-title">{note.title}</h2>

					{#if note.description}
						<p class="note-description">{note.description}</p>
					{/if}

					{#if note.tags.length > 0}
						<div class="note-tags">
							{#each note.tags.slice(0, 4) as tag}
								<span class="tag-label">{tag}</span>
							{/each}
						</div>
					{/if}
				</a>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p>No entries yet in this category. The garden is still growing.</p>
		</div>
	{/if}
</Container>

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

	.page-header {
		text-align: center;
		max-width: var(--container-md);
		margin: var(--space-16) auto var(--space-8);
	}

	@media (max-width: 640px) {
		.back-link {
			position: relative;
			left: auto;
			top: auto;
			display: block;
			padding: var(--space-4) var(--space-4) 0;
		}

		.page-header {
			margin-top: var(--space-6);
		}
	}

	.title {
		font-family: var(--font-serif);
		font-size: var(--text-3xl);
		font-weight: var(--font-semibold);
		color: #f5f0e8;
		margin-bottom: var(--space-3);
	}

	.description {
		font-size: var(--text-lg);
		color: rgba(245, 240, 232, 0.75);
		line-height: var(--leading-relaxed);
	}

	.filter-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		max-width: var(--container-md);
		margin-left: auto;
		margin-right: auto;
		flex-wrap: wrap;
	}

	.filter-pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.filter-pill {
		padding: var(--space-2) var(--space-4);
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		font-family: var(--font-sans);
		color: var(--color-text-secondary);
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		cursor: pointer;
		transition: var(--transition-all);
	}

	.filter-pill:hover {
		background-color: var(--color-bg-tertiary);
		border-color: var(--color-text-secondary);
	}

	.filter-pill.active {
		background-color: var(--color-accent-crimson);
		color: var(--color-bg-primary);
		border-color: var(--color-accent-crimson);
	}

	.results-count {
		font-size: var(--text-sm);
		color: rgba(245, 240, 232, 0.6);
	}

	.notes-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		max-width: var(--container-md);
		margin: 0 auto var(--space-16);
	}

	.note-item {
		display: block;
		padding: var(--space-6);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: var(--transition-all);
	}

	.note-item:hover {
		border-color: var(--color-accent-crimson);
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}

	.note-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
	}

	.note-date {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.note-title {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
		line-height: var(--leading-snug);
	}

	.note-description {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-3);
	}

	.note-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tag-label {
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		background-color: var(--color-bg-secondary);
		padding: 0.125rem 0.5rem;
		border-radius: var(--radius-sm);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16);
		color: var(--color-text-secondary);
		font-size: var(--text-lg);
		max-width: var(--container-md);
		margin: 0 auto;
	}
</style>
