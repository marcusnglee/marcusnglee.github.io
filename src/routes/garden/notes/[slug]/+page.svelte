<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import BackLinks from '$lib/components/garden/BackLinks.svelte';
	import NoteCard from '$lib/components/garden/NoteCard.svelte';
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
			<a href="/garden/notes" class="breadcrumb-link">Notes</a>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">{data.note.title}</span>
		</nav>

		<!-- Header -->
		<header class="note-header">
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
					<span class="meta-updated" title="Last updated {formatDate(data.note.updated)}">
						Updated {formatDate(data.note.updated)}
					</span>
				{/if}
			</div>

			{#if data.note.tags.length > 0}
				<div class="note-tags">
					{#each data.note.tags as tag}
						<Tag label={tag} href="/tags/{tag}" size="sm" />
					{/each}
				</div>
			{/if}
		</header>

		<!-- Content -->
		<div class="prose">
			{@html data.note.content}
		</div>

		<!-- Backlinks -->
		<BackLinks backlinks={data.note.backlinks} category={data.note.category} />
	</Container>

	<!-- Related Notes -->
	{#if data.relatedNotes.length > 0}
		<section class="related-section">
			<Container size="lg">
				<h2 class="related-title">Related Notes</h2>
				<div class="related-grid">
					{#each data.relatedNotes as relatedNote}
						<NoteCard note={relatedNote} />
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
		margin-bottom: var(--space-12);
		text-align: center;
	}

	.note-title {
		font-family: var(--font-serif);
		font-size: var(--text-4xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.note-description {
		font-size: var(--text-xl);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-4);
		max-width: 42rem;
		margin-left: auto;
		margin-right: auto;
	}

	.note-meta {
		display: flex;
		align-items: center;
		justify-content: center;
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
		justify-content: center;
	}

	.prose {
		margin-bottom: var(--space-12);
	}

	.related-section {
		margin-top: var(--space-20);
		padding-top: var(--space-12);
		border-top: 1px solid var(--color-border);
		background-color: var(--color-bg-secondary);
		padding-bottom: var(--space-12);
	}

	.related-title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		text-align: center;
		margin-bottom: var(--space-8);
	}

	.related-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 768px) {
		.related-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
