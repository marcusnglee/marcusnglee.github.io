<script lang="ts">
	import type { PortfolioItem } from '$lib/types/portfolio';
	import PortfolioCard from './PortfolioCard.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';

	interface Props {
		items: PortfolioItem[];
		showFilters?: boolean;
	}

	let { items, showFilters = false }: Props = $props();

	let selectedCategory = $state<'all' | 'experience' | 'project' | 'creative'>('all');
	let selectedTag = $state<string | null>(null);

	const filteredItems = $derived(() => {
		let filtered = items;

		if (selectedCategory !== 'all') {
			filtered = filtered.filter((item) => item.category === selectedCategory);
		}

		if (selectedTag) {
			filtered = filtered.filter((item) => item.tags.includes(selectedTag));
		}

		return filtered;
	});

	const allTags = $derived(() => {
		const tags = new Set<string>();
		items.forEach((item) => {
			item.tags.forEach((tag) => tags.add(tag));
		});
		return Array.from(tags).sort();
	});

	function handleCategoryFilter(category: 'all' | 'experience' | 'project' | 'creative') {
		selectedCategory = category;
		selectedTag = null;
	}

	function handleTagFilter(tag: string) {
		if (selectedTag === tag) {
			selectedTag = null;
		} else {
			selectedTag = tag;
			selectedCategory = 'all';
		}
	}
</script>

{#if showFilters}
	<div class="filters">
		<div class="filter-group">
			<h3 class="filter-title">Category</h3>
			<div class="filter-buttons">
				<button
					class="filter-btn"
					class:active={selectedCategory === 'all'}
					onclick={() => handleCategoryFilter('all')}
				>
					All
				</button>
				<button
					class="filter-btn"
					class:active={selectedCategory === 'experience'}
					onclick={() => handleCategoryFilter('experience')}
				>
					Experience
				</button>
				<button
					class="filter-btn"
					class:active={selectedCategory === 'project'}
					onclick={() => handleCategoryFilter('project')}
				>
					Projects
				</button>
				<button
					class="filter-btn"
					class:active={selectedCategory === 'creative'}
					onclick={() => handleCategoryFilter('creative')}
				>
					Creative
				</button>
			</div>
		</div>

		{#if allTags().length > 0}
			<div class="filter-group">
				<h3 class="filter-title">Tags</h3>
				<div class="filter-tags">
					{#each allTags() as tag}
						<button class="tag-filter" class:active={selectedTag === tag} onclick={() => handleTagFilter(tag)}>
							{tag}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}

<div class="portfolio-grid">
	{#each filteredItems() as item (item.id)}
		<PortfolioCard {item} />
	{/each}
</div>

{#if filteredItems().length === 0}
	<div class="empty-state">
		<p>No items match your filters.</p>
	</div>
{/if}

<style>
	.filters {
		margin-bottom: var(--space-12);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.filter-title {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
	}

	.filter-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.filter-btn {
		padding: var(--space-2) var(--space-4);
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		font-family: var(--font-sans);
		color: var(--color-text-secondary);
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: var(--transition-all);
	}

	.filter-btn:hover {
		background-color: var(--color-bg-tertiary);
		border-color: var(--color-text-secondary);
	}

	.filter-btn.active {
		background-color: var(--color-accent-crimson);
		color: var(--color-bg-primary);
		border-color: var(--color-accent-crimson);
	}

	.filter-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tag-filter {
		padding: 0.25rem 0.75rem;
		font-size: var(--text-xs);
		font-weight: var(--font-medium);
		font-family: var(--font-sans);
		color: var(--color-text-secondary);
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		cursor: pointer;
		transition: var(--transition-all);
		white-space: nowrap;
	}

	.tag-filter:hover {
		transform: translateY(-1px);
		box-shadow: var(--shadow-sm);
		border-color: var(--color-text-secondary);
	}

	.tag-filter.active {
		background-color: color-mix(in srgb, var(--color-accent-crimson) 10%, transparent);
		color: var(--color-accent-crimson);
		border-color: var(--color-accent-crimson);
	}

	.portfolio-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
	}

	@media (min-width: 768px) {
		.portfolio-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.portfolio-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.empty-state {
		text-align: center;
		padding: var(--space-12);
		color: var(--color-text-secondary);
	}
</style>
