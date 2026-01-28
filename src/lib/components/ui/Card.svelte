<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		class?: string;
		children?: Snippet;
	}

	let { href, class: className = '', children }: Props = $props();
</script>

{#if href}
	<a {href} class="card card-link {className}">
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<div class="card {className}">
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}
