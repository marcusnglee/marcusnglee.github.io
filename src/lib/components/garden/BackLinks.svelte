<script lang="ts">
	import type { BackLink } from '$lib/types/garden';

	interface Props {
		backlinks: BackLink[];
		category: 'essay' | 'note' | 'project';
	}

	let { backlinks, category }: Props = $props();

	const categoryPaths = {
		essay: 'essays',
		note: 'notes',
		project: 'projects'
	};
</script>

{#if backlinks.length > 0}
	<aside class="backlinks">
		<h3 class="backlinks-title">Linked References</h3>
		<p class="backlinks-description">
			{backlinks.length} note{backlinks.length === 1 ? '' : 's'} link to this page
		</p>

		<ul class="backlinks-list">
			{#each backlinks as backlink}
				<li class="backlink-item">
					<a href="/garden/{categoryPaths[category]}/{backlink.slug}" class="backlink-link">
						{backlink.title}
					</a>
					{#if backlink.context}
						<p class="backlink-context">{backlink.context}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</aside>
{/if}

<style>
	.backlinks {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		margin-top: var(--space-8);
	}

	.backlinks-title {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.backlinks-description {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-4);
	}

	.backlinks-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.backlink-item {
		padding: var(--space-3);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-md);
		transition: var(--transition-all);
	}

	.backlink-item:hover {
		border-color: var(--color-border);
		box-shadow: var(--shadow-sm);
	}

	.backlink-link {
		font-size: var(--text-base);
		font-weight: var(--font-medium);
		color: var(--color-link);
		text-decoration: none;
		transition: var(--transition-colors);
		display: block;
		margin-bottom: var(--space-2);
	}

	.backlink-link:hover {
		color: var(--color-link-hover);
	}

	.backlink-context {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		font-style: italic;
	}
</style>
