<script lang="ts">
	import type { PortfolioItem } from '$lib/types/portfolio';
	import Tag from '$lib/components/ui/Tag.svelte';

	interface Props {
		item: PortfolioItem;
	}

	let { item }: Props = $props();

	const categoryLabels = {
		experience: 'Experience',
		project: 'Project',
		creative: 'Creative'
	};
</script>

<article class="portfolio-card">
	{#if item.link}
		<a href={item.link} class="card-link" target="_blank" rel="noopener noreferrer">
			<span class="sr-only">View {item.title}</span>
		</a>
	{/if}

	{#if item.image}
		<div class="card-image-wrapper">
			<img src={item.image} alt={item.title} class="card-image" />
		</div>
	{/if}

	<div class="card-content">
		<div class="card-header">
			<span class="category-badge">{categoryLabels[item.category]}</span>
			{#if item.year}
				<span class="year">{item.year}</span>
			{/if}
		</div>

		<h3 class="card-title">{item.title}</h3>

		{#if item.subtitle}
			<p class="card-subtitle">{item.subtitle}</p>
		{/if}

		<p class="card-description">{item.description}</p>

		{#if item.tags.length > 0}
			<div class="card-tags">
				{#each item.tags as tag}
					<Tag label={tag} size="sm" />
				{/each}
			</div>
		{/if}
	</div>
</article>

<style>
	.portfolio-card {
		position: relative;
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: var(--transition-all);
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.portfolio-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
		border-color: var(--color-accent-crimson);
	}

	.card-link {
		position: absolute;
		inset: 0;
		z-index: 10;
	}

	.card-image-wrapper {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-color: var(--color-bg-secondary);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: var(--transition-transform);
	}

	.portfolio-card:hover .card-image {
		transform: scale(1.05);
	}

	.card-content {
		padding: var(--space-6);
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}

	.category-badge {
		font-size: var(--text-xs);
		font-weight: var(--font-semibold);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--color-accent-crimson);
	}

	.year {
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		font-weight: var(--font-medium);
	}

	.card-title {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
		line-height: var(--leading-snug);
	}

	.card-subtitle {
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-3);
	}

	.card-description {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-4);
		flex: 1;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		position: relative;
		z-index: 20;
	}
</style>
