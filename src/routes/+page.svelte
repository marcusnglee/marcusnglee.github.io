<script lang="ts">
	import Bio from '$lib/components/Bio.svelte';
	import Container from '$lib/components/layout/Container.svelte';
	import Timeline from '$lib/components/portfolio/Timeline.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Marcus Lee</title>
	<meta
		name="description"
		content="Marcus Lee is a software engineer exploring distributed systems, cloud infrastructure, and thoughtful design."
	/>
</svelte:head>

<!-- Bio Section -->
<section class="bio-section">
	<Container size="md">
		<Bio />
	</Container>
</section>

<!-- Timeline -->
<section class="section">
	<Container size="lg">
		<Timeline items={data.allWork} />

		<div class="section-cta">
			<Button href="/garden" variant="secondary" size="md">
				Explore the Digital Garden
			</Button>
		</div>
	</Container>
</section>

<style>
	.bio-section {
		padding: var(--space-16) 0 var(--space-8);
	}

	.section {
		padding: var(--space-8) 0 var(--space-16);
	}

	.section-cta {
		margin-top: var(--space-12);
		text-align: center;
	}

	@media (max-width: 768px) {
		.bio-section {
			padding: var(--space-10) 0 var(--space-6);
		}

		.section {
			padding: var(--space-6) 0 var(--space-12);
		}
	}
</style>
