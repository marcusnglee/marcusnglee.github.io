<script lang="ts">
	import type { Snippet } from 'svelte';
	import { locked, navigateFn, activeSection } from '$lib/stores/canvas';

	let {
		id,
		x,
		y,
		width,
		label,
		fixed = false,
		dark = false,
		background,
		children
	}: {
		id?: string;
		x: number;
		y: number;
		width?: number;
		label?: string;
		fixed?: boolean;
		dark?: boolean;
		background?: string;
		children: Snippet;
	} = $props();

	let isRevealed = $derived(id === 'about' || $activeSection === id);
</script>

{#if fixed}
	<!-- Full-screen overlay for the about/landing frame -->
	<div
		{id}
		class="frame-fullscreen"
		class:hiding={$locked}
		style={background ? `background: ${background};` : ''}
	>
		{@render children()}
	</div>
{:else}
	{#if label}
		<div
			class="frame-label"
			style="left: {x}px; top: {y - 22}px; {width ? `width: ${width}px;` : ''}"
		>
			{label}
		</div>
	{/if}

	<div
		{id}
		class="frame"
		class:dark
		style="left: {x}px; top: {y}px; {width ? `width: ${width}px;` : ''}{background ? ` background: ${background};` : ''}"
	>
		{#if isRevealed}
			{@render children()}
			{#if $locked && id !== 'about'}
				<div class="home-bar">
					<button class="home-btn" onclick={() => $navigateFn?.('about')}>← Home</button>
				</div>
			{/if}
		{:else}
			<button class="preview" onclick={() => $navigateFn?.(id ?? '')}>
				<span class="preview-label">{label}</span>
				<span class="preview-hint">enter →</span>
			</button>
		{/if}
	</div>
{/if}

<style>
	/* ── Fixed full-screen frame (About / landing) ── */
	.frame-fullscreen {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8f6f1;
		opacity: 1;
		pointer-events: auto;
		transition: opacity 0.35s ease;
	}

	.frame-fullscreen.hiding {
		opacity: 0;
		pointer-events: none;
	}

	/* ── Canvas card frame ── */
	.frame {
		position: absolute;
		background: #fff;
		border: 1px solid #e8e4dc;
		border-radius: 8px;
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.06),
			0 1px 4px rgba(0, 0, 0, 0.04);
	}

	.frame.dark {
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.3),
			0 1px 4px rgba(0, 0, 0, 0.15);
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

	/* ── Preview gateway button ── */
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		width: 100%;
		min-height: 130px;
		background: none;
		border: none;
		border-radius: 8px;
		padding: 2.5rem;
		transition: background 0.15s ease;
	}

	.preview:hover {
		background: rgba(0, 0, 0, 0.03);
	}

	.dark .preview:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	.preview-label {
		font-family: Montserrat, sans-serif;
		font-size: 1.1rem;
		font-weight: 700;
		color: #1a1a1a;
		letter-spacing: -0.02em;
	}

	.dark .preview-label {
		color: rgba(255, 255, 255, 0.88);
	}

	.preview-hint {
		font-family: Montserrat, sans-serif;
		font-size: 0.75rem;
		color: #bbb;
		letter-spacing: 0.04em;
		transition: color 0.15s ease;
	}

	.dark .preview-hint {
		color: rgba(255, 255, 255, 0.3);
	}

	.preview:hover .preview-hint {
		color: #888;
	}

	.dark .preview:hover .preview-hint {
		color: rgba(255, 255, 255, 0.6);
	}

	/* ── Home bar ── */
	.home-bar {
		border-top: 1px solid #f0ece4;
		padding: 0.75rem 2rem;
	}

	.dark .home-bar {
		border-top-color: rgba(255, 255, 255, 0.1);
	}

	.home-btn {
		background: none;
		border: none;
		padding: 0;
		font-family: Montserrat, sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		color: #aaa;
		transition: color 0.15s ease;
		letter-spacing: 0.01em;
	}

	.dark .home-btn {
		color: rgba(255, 255, 255, 0.35);
	}

	.home-btn:hover {
		color: #1a1a1a;
	}

	.dark .home-btn:hover {
		color: rgba(255, 255, 255, 0.88);
	}
</style>
