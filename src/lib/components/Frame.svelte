<script lang="ts">
	import { navigateFn } from '$lib/stores/canvas';

	let {
		id,
		x,
		y,
		width,
		label,
		dark = false,
		background
	}: {
		id?: string;
		x: number;
		y: number;
		width?: number;
		label?: string;
		dark?: boolean;
		background?: string;
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

<div
	{id}
	class="frame"
	class:dark
	style="left: {x}px; top: {y}px; {width ? `width: ${width}px;` : ''}{background
		? ` background: ${background};`
		: ''}"
>
	<button class="preview" onclick={() => $navigateFn?.(id ?? '')}>
		<span class="preview-label">{label}</span>
		<span class="preview-hint">enter →</span>
	</button>
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
</style>
