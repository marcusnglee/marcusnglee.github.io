<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Digital Garden - Marcus Lee</title>
	<meta
		name="description"
		content="A collection of essays, notes, and projects exploring technology, design, and creative work."
	/>
</svelte:head>

<Container size="lg">
	<div class="garden-hero">
		<h1 class="title">Digital Garden</h1>
		<p class="description">
			A collection of essays, notes, and projects - thoughts in various stages of growth.
		</p>
	</div>

	<div class="garden-categories">
		<section class="category-section">
			<div class="category-header">
				<h2 class="category-title">Essays</h2>
				<p class="category-description">
					Long-form writing on technology, design, and thoughtful practices.
				</p>
			</div>
			<div class="category-stats">
				<span class="stat">{data.essays.length} essays</span>
			</div>
			<Button href="/garden/essays" variant="secondary" size="md">Browse Essays</Button>
		</section>

		<section class="category-section">
			<div class="category-header">
				<h2 class="category-title">Notes</h2>
				<p class="category-description">
					Quick thoughts, references, and works-in-progress - ideas still taking shape.
				</p>
			</div>
			<div class="category-stats">
				<span class="stat">{data.notes.length} notes</span>
			</div>
			<Button href="/garden/notes" variant="secondary" size="md">Browse Notes</Button>
		</section>

		<section class="category-section">
			<div class="category-header">
				<h2 class="category-title">Projects</h2>
				<p class="category-description">
					Technical projects, experiments, and building in public.
				</p>
			</div>
			<div class="category-stats">
				<span class="stat">{data.projects.length} projects</span>
			</div>
			<Button href="/garden/projects" variant="secondary" size="md">Browse Projects</Button>
		</section>
	</div>

	{#if data.allNotes.length === 0}
		<div class="empty-state">
			<p>The garden is being planted. Check back soon for growing thoughts and ideas.</p>
		</div>
	{/if}
</Container>

<style>
	.garden-hero {
		text-align: center;
		max-width: var(--container-md);
		margin: var(--space-16) auto var(--space-12);
	}

	.title {
		font-family: var(--font-serif);
		font-size: var(--text-4xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: var(--tracking-tight);
	}

	.description {
		font-size: var(--text-xl);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	.garden-categories {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
		margin-bottom: var(--space-16);
	}

	@media (min-width: 768px) {
		.garden-categories {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.category-section {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-8);
		transition: var(--transition-all);
	}

	.category-section:hover {
		border-color: var(--color-accent-crimson);
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}

	.category-header {
		margin-bottom: var(--space-4);
	}

	.category-title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.category-description {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	.category-stats {
		margin-bottom: var(--space-6);
	}

	.stat {
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		color: var(--color-text-tertiary);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16);
		color: var(--color-text-secondary);
		font-size: var(--text-lg);
	}
</style>
