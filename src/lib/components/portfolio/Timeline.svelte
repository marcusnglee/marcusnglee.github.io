<script lang="ts">
	import type { PortfolioItem } from '$lib/types/portfolio';
	import Tag from '$lib/components/ui/Tag.svelte';

	interface Props {
		items: PortfolioItem[];
	}

	let { items }: Props = $props();

	// Sort by year descending
	const sortedItems = $derived(
		[...items].sort((a, b) => {
			const yearA = parseInt(a.year || '0');
			const yearB = parseInt(b.year || '0');
			return yearB - yearA;
		})
	);
</script>

<div class="timeline">
	{#each sortedItems as item, index (item.id)}
		<div class="timeline-item">
			<div class="timeline-marker">
				<div class="marker-dot"></div>
				{#if index < sortedItems.length - 1}
					<div class="marker-line"></div>
				{/if}
			</div>

			<div class="timeline-content">
				<span class="timeline-year">{item.year}</span>

				<h3 class="timeline-title">
					{#if item.link}
						<a href={item.link} target="_blank" rel="noopener noreferrer">
							{item.title}
							<span class="link-arrow">↗</span>
						</a>
					{:else}
						{item.title}
					{/if}
				</h3>

				{#if item.subtitle}
					<p class="timeline-subtitle">{item.subtitle}</p>
				{/if}

				<p class="timeline-description">{item.description}</p>

				{#if item.tags.length > 0}
					<div class="timeline-tags">
						{#each item.tags as tag}
							<Tag label={tag} size="sm" />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline {
		position: relative;
		max-width: var(--container-md);
		margin: 0 auto;
	}

	.timeline-item {
		display: flex;
		gap: var(--space-6);
		padding-bottom: var(--space-8);
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 1.5rem;
	}

	.marker-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--color-accent-crimson);
		border: 2px solid var(--color-bg-primary);
		box-shadow: 0 0 0 2px var(--color-accent-crimson);
		flex-shrink: 0;
	}

	.marker-line {
		width: 2px;
		flex: 1;
		background-color: var(--color-border);
		margin-top: var(--space-2);
	}

	.timeline-content {
		flex: 1;
		padding-bottom: var(--space-2);
	}

	.timeline-year {
		font-size: var(--text-sm);
		font-weight: var(--font-semibold);
		color: var(--color-accent-crimson);
		margin-bottom: var(--space-2);
		display: block;
	}

	.timeline-title {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-1);
		line-height: var(--leading-snug);
	}

	.timeline-title a {
		color: inherit;
		text-decoration: none;
		transition: var(--transition-colors);
	}

	.timeline-title a:hover {
		color: var(--color-accent-crimson);
	}

	.link-arrow {
		font-size: 0.75em;
		opacity: 0.5;
		margin-left: 0.25em;
	}

	.timeline-subtitle {
		font-size: var(--text-base);
		font-weight: var(--font-medium);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2);
	}

	.timeline-description {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-3);
	}

	.timeline-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	@media (max-width: 640px) {
		.timeline-marker {
			width: 1rem;
		}

		.marker-dot {
			width: 10px;
			height: 10px;
		}

		.timeline-item {
			gap: var(--space-4);
		}
	}
</style>
