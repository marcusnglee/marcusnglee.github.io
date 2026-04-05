<script lang="ts">
	interface Props {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { size = 'lg', class: className = '', children }: Props = $props();

	const sizeMap = {
		xs: 'var(--container-xs)',
		sm: 'var(--container-sm)',
		md: 'var(--container-md)',
		lg: 'var(--container-lg)',
		xl: 'var(--container-xl)'
	};
</script>

<div class="container {className}" style="max-width: {sizeMap[size]};">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		padding-left: var(--space-4);
		padding-right: var(--space-4);
	}

	@media (min-width: 640px) {
		.container {
			padding-left: var(--space-6);
			padding-right: var(--space-6);
		}
	}

	@media (min-width: 1024px) {
		.container {
			padding-left: var(--space-8);
			padding-right: var(--space-8);
		}
	}
</style>
