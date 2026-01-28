<script lang="ts">
	interface Props {
		label: string;
		href?: string;
		color?: 'crimson' | 'ochre' | 'sage' | 'default';
		size?: 'sm' | 'md';
		class?: string;
	}

	let { label, href, color = 'default', size = 'sm', class: className = '' }: Props = $props();
</script>

{#if href}
	<a {href} class="tag tag-{color} tag-{size} {className}">
		{label}
	</a>
{:else}
	<span class="tag tag-{color} tag-{size} {className}">
		{label}
	</span>
{/if}

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-sans);
		font-weight: var(--font-medium);
		border-radius: var(--radius-full);
		transition: var(--transition-all);
		white-space: nowrap;
		border: 1px solid transparent;
	}

	.tag-sm {
		padding: 0.25rem 0.75rem;
		font-size: var(--text-xs);
	}

	.tag-md {
		padding: 0.5rem 1rem;
		font-size: var(--text-sm);
	}

	.tag-default {
		background-color: var(--color-bg-secondary);
		color: var(--color-text-secondary);
		border-color: var(--color-border);
	}

	.tag-crimson {
		background-color: color-mix(in srgb, var(--color-accent-crimson) 10%, transparent);
		color: var(--color-accent-crimson);
		border-color: var(--color-accent-crimson);
	}

	.tag-ochre {
		background-color: color-mix(in srgb, var(--color-accent-ochre) 10%, transparent);
		color: var(--color-accent-ochre);
		border-color: var(--color-accent-ochre);
	}

	.tag-sage {
		background-color: color-mix(in srgb, var(--color-accent-sage) 10%, transparent);
		color: var(--color-accent-sage);
		border-color: var(--color-accent-sage);
	}

	a.tag:hover {
		transform: translateY(-1px);
		box-shadow: var(--shadow-sm);
	}

	a.tag-default:hover {
		background-color: var(--color-bg-tertiary);
		border-color: var(--color-text-secondary);
	}

	a.tag-crimson:hover {
		background-color: color-mix(in srgb, var(--color-accent-crimson) 20%, transparent);
	}

	a.tag-ochre:hover {
		background-color: color-mix(in srgb, var(--color-accent-ochre) 20%, transparent);
	}

	a.tag-sage:hover {
		background-color: color-mix(in srgb, var(--color-accent-sage) 20%, transparent);
	}
</style>
