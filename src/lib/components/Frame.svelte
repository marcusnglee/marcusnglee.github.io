<script lang="ts">
	import { navigateFn } from '$lib/stores/canvas';

	interface Props {
		id?: string;
		x: number;
		y: number;
		width?: number;
		height?: number;
		label?: string;
		description?: string;
		dark?: boolean;
		background?: string;
	}

	let { id, x, y, width, height, label, description, dark = false, background }: Props = $props();
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
	style="left: {x}px; top: {y}px; {width ? `width: ${width}px;` : ''}{height ? ` height: ${height}px;` : ''}{background ? ` background: ${background};` : ''}"
>
	<button class="preview" onclick={() => $navigateFn?.(id ?? '')}>
		<span class="preview-label">{label}</span>
		{#if description}
			<span class="preview-description">{description}</span>
		{/if}
		<span class="preview-hint">enter →</span>
	</button>
</div>

<style>
	.frame {
		position: absolute;
		background: #fff;
		border: 1px solid #d8d2c8;
	}

	.frame.dark {
		border-color: rgba(255, 255, 255, 0.15);
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
		gap: 1.25rem;
		width: 100%;
		min-height: 160px;
		background: none;
		border: none;
		padding: 2.5rem;
		cursor: pointer;
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
		font-size: 1.25rem;
		font-weight: 700;
		color: #1a1a1a;
		letter-spacing: -0.02em;
	}

	.dark .preview-label {
		color: rgba(255, 255, 255, 0.88);
	}

	.preview-description {
		font-family: Montserrat, sans-serif;
		font-size: 0.75rem;
		color: #aaa;
		text-align: center;
		line-height: 1.6;
		max-width: 260px;
	}

	.dark .preview-description {
		color: rgba(255, 255, 255, 0.4);
	}

	.preview-hint {
		font-family: Montserrat, sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		color: #888;
		letter-spacing: 0.06em;
		border: 1px solid #d0cbc3;
		padding: 0.5rem 1.4rem;
		transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
	}

	.dark .preview-hint {
		color: rgba(255, 255, 255, 0.5);
		border-color: rgba(255, 255, 255, 0.18);
	}

	.preview:hover .preview-hint {
		color: #1a1a1a;
		border-color: #1a1a1a;
		background: rgba(0, 0, 0, 0.04);
	}

	.dark .preview:hover .preview-hint {
		color: rgba(255, 255, 255, 0.9);
		border-color: rgba(255, 255, 255, 0.6);
		background: rgba(255, 255, 255, 0.06);
	}
</style>
