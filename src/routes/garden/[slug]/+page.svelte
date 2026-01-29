<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import { GARDEN_CATEGORIES } from '$lib/types/garden';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	const categoryInfo = GARDEN_CATEGORIES[data.note.category];
</script>

<svelte:head>
	<title>{data.note.title} - Marcus Lee</title>
	{#if data.note.description}
		<meta name="description" content={data.note.description} />
	{/if}
</svelte:head>

<article>
	<Container size="md">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/garden" class="breadcrumb-link">Garden</a>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">{categoryInfo?.label || data.note.category}</span>
		</nav>

		<!-- Header -->
		<header class="note-header">
			<Tag
				label={categoryInfo?.label || data.note.category}
				color={categoryInfo?.color || 'default'}
				size="md"
			/>

			<h1 class="note-title">{data.note.title}</h1>

			{#if data.note.description}
				<p class="note-description">{data.note.description}</p>
			{/if}

			<div class="note-meta">
				<time datetime={data.note.created} class="meta-date">
					{formatDate(data.note.created)}
				</time>
				<span class="meta-separator">•</span>
				<span class="meta-reading-time">{data.note.readingTime} min read</span>
				{#if data.note.updated}
					<span class="meta-separator">•</span>
					<span class="meta-updated">
						Updated {formatDate(data.note.updated)}
					</span>
				{/if}
			</div>

			{#if data.note.tags.length > 0}
				<div class="note-tags">
					{#each data.note.tags as tag}
						<span class="tag-label">{tag}</span>
					{/each}
				</div>
			{/if}
		</header>

		<!-- Content -->
		<div class="prose">
			{@html data.note.content}
		</div>
	</Container>

	<!-- Related Notes -->
	{#if data.relatedNotes.length > 0}
		<section class="related-section">
			<Container size="md">
				<h2 class="related-title">Related</h2>
				<div class="related-list">
					{#each data.relatedNotes as related}
						<a href="/garden/{related.slug}" class="related-link">
							<span class="related-category">
								{GARDEN_CATEGORIES[related.category]?.label || related.category}
							</span>
							<span class="related-name">{related.title}</span>
						</a>
					{/each}
				</div>
			</Container>
		</section>
	{/if}
</article>

<style>
	.breadcrumb {
		margin: var(--space-8) 0;
	}

	.note-header {
		margin-bottom: var(--space-10);
	}

	.note-title {
		font-family: var(--font-serif);
		font-size: var(--text-3xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin: var(--space-4) 0 var(--space-3);
		line-height: var(--leading-tight);
	}

	.note-description {
		font-size: var(--text-xl);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-4);
	}

	.note-meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		margin-bottom: var(--space-4);
		flex-wrap: wrap;
	}

	.meta-date {
		font-weight: var(--font-medium);
	}

	.meta-separator {
		opacity: 0.5;
	}

	.meta-updated {
		font-style: italic;
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
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-full);
	}

	.prose {
		margin-bottom: var(--space-12);
	}

	.related-section {
		margin-top: var(--space-12);
		padding: var(--space-10) 0;
		border-top: 1px solid var(--color-border);
		background-color: var(--color-bg-secondary);
	}

	.related-title {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
	}

	.related-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.related-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: var(--transition-all);
	}

	.related-link:hover {
		border-color: var(--color-border);
		box-shadow: var(--shadow-sm);
	}

	.related-category {
		font-size: var(--text-xs);
		font-weight: var(--font-semibold);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--color-accent-crimson);
		min-width: 80px;
	}

	.related-name {
		font-size: var(--text-base);
		color: var(--color-text-primary);
	}
</style>
