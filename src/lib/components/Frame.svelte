<script lang="ts">
	import type { Snippet } from 'svelte';
	import { locked, navigateFn } from '$lib/stores/canvas';

	let {
		id,
		x,
		y,
		width,
		label,
		children
	}: {
		id?: string;
		x: number;
		y: number;
		width?: number;
		label?: string;
		children: Snippet;
	} = $props();
</script>

{#if label}
	<div
		class="frame-label"
		style="left: {x}px; top: {y - 22}px; {width ? `width: ${width}px;` : ''}"
	>
		{label}
	</div>
{/if}

<div {id} class="frame" style="left: {x}px; top: {y}px; {width ? `width: ${width}px;` : ''}">
	{@render children()}
	{#if $locked && id !== 'about'}
		<div class="home-bar">
			<button class="home-btn" onclick={() => $navigateFn?.('about')}>← Home</button>
		</div>
	{/if}
</div>

<style>
	.frame {
		position: absolute;
		background: #fff;
		border: 1px solid #e8e4dc;
		border-radius: 8px;
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.06),
			0 1px 4px rgba(0, 0, 0, 0.04);
	}

	.frame-label {
		position: absolute;
		font-family: Montserrat, sans-serif;
		font-size: 10px;
		color: #bbb;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		pointer-events: none;
		user-select: none;
	}

	.home-bar {
		border-top: 1px solid #f0ece4;
		padding: 0.75rem 2rem;
	}

	.home-btn {
		background: none;
		border: none;
		padding: 0;
		font-family: Montserrat, sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		color: #aaa;
		cursor: pointer;
		transition: color 0.15s ease;
		letter-spacing: 0.01em;
	}

	.home-btn:hover {
		color: #1a1a1a;
	}
</style>
