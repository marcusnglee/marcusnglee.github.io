<script lang="ts">
	import Bio from '$lib/components/Bio.svelte';
	import Container from '$lib/components/layout/Container.svelte';
	import PortfolioGrid from '$lib/components/portfolio/PortfolioGrid.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Marcus Lee - Software Engineer & Designer</title>
	<meta
		name="description"
		content="Marcus Lee is a software engineer exploring distributed systems, cloud infrastructure, and thoughtful design."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<Container size="lg">
		<div class="hero-content">
			<h1 class="hero-title">Marcus Lee</h1>
			<p class="hero-tagline">
				Software engineer exploring distributed systems, cloud infrastructure, and thoughtful
				design.
			</p>
		</div>
	</Container>
</section>

<!-- Bio Section -->
<section class="section">
	<Container size="md">
		<Bio />
	</Container>
</section>

<!-- Featured Work Section -->
<section class="section">
	<Container size="lg">
		<div class="section-header">
			<h2 class="section-title">Featured Work</h2>
			<p class="section-description">
				A selection of professional experience, projects, and creative work.
			</p>
		</div>

		<PortfolioGrid items={data.featuredWork} />

		<div class="section-cta">
			<Button href="/garden" variant="primary" size="lg">
				Explore the Digital Garden
			</Button>
		</div>
	</Container>
</section>

<style>
	.hero {
		padding: var(--space-20) 0 var(--space-16);
		background: linear-gradient(
			180deg,
			var(--color-bg-secondary) 0%,
			var(--color-bg-primary) 100%
		);
	}

	.hero-content {
		text-align: center;
		max-width: var(--container-md);
		margin: 0 auto;
	}

	.hero-title {
		font-family: var(--font-serif);
		font-size: var(--text-4xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: var(--tracking-tight);
	}

	.hero-tagline {
		font-size: var(--text-xl);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	.section {
		padding: var(--space-16) 0;
	}

	.section-header {
		text-align: center;
		max-width: var(--container-md);
		margin: 0 auto var(--space-12);
	}

	.section-title {
		font-family: var(--font-serif);
		font-size: var(--text-3xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}

	.section-description {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	.section-cta {
		margin-top: var(--space-12);
		text-align: center;
	}

	@media (max-width: 768px) {
		.hero {
			padding: var(--space-12) 0 var(--space-8);
		}

		.section {
			padding: var(--space-12) 0;
		}
	}
</style>
