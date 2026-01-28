<script lang="ts">
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { NoteMetadata } from '$lib/types/garden';

	interface Props {
		note: NoteMetadata;
	}

	let { note }: Props = $props();

	const categoryLabels = {
		essay: 'Essay',
		note: 'Note',
		project: 'Project'
	};

	const categoryPaths = {
		essay: 'essays',
		note: 'notes',
		project: 'projects'
	};

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<article class="note-card">
	<a href="/garden/{categoryPaths[note.category]}/{note.slug}" class="card-link">
		<span class="sr-only">Read {note.title}</span>
	</a>

	<div class="card-header">
		<span class="category-badge">{categoryLabels[note.category]}</span>
		<span class="reading-time">{note.readingTime} min read</span>
	</div>

	<h3 class="card-title">{note.title}</h3>

	{#if note.description}
		<p class="card-description">{note.description}</p>
	{/if}

	<div class="card-footer">
		<div class="card-meta">
			<time datetime={note.created} class="date">{formatDate(note.created)}</time>
			{#if note.updated}
				<span class="updated-indicator" title="Last updated {formatDate(note.updated)}">
					Updated
				</span>
			{/if}
		</div>

		{#if note.tags.length > 0}
			<div class="card-tags">
				{#each note.tags.slice(0, 3) as tag}
					<Tag label={tag} size="sm" />
				{/each}
				{#if note.tags.length > 3}
					<span class="more-tags">+{note.tags.length - 3} more</span>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	.note-card {
		position: relative;
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		transition: var(--transition-all);
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.note-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-accent-crimson);
	}

	.card-link {
		position: absolute;
		inset: 0;
		z-index: 10;
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

	.reading-time {
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		font-weight: var(--font-medium);
	}

	.card-title {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
		line-height: var(--leading-snug);
	}

	.card-description {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-4);
		flex: 1;
	}

	.card-footer {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-top: auto;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.date {
		font-weight: var(--font-medium);
	}

	.updated-indicator {
		font-size: var(--text-xs);
		padding: 0.125rem 0.5rem;
		background-color: var(--color-bg-secondary);
		border-radius: var(--radius-sm);
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		align-items: center;
		position: relative;
		z-index: 20;
	}

	.more-tags {
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		font-weight: var(--font-medium);
	}
</style>
