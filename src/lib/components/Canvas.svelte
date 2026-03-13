<script lang="ts">
	import { onMount } from 'svelte';
	import { navigateFn } from '$lib/stores/canvas';
	import type { Snippet } from 'svelte';

	interface FramePos {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	let {
		children,
		framePositions
	}: {
		children: Snippet;
		framePositions: Record<string, FramePos>;
	} = $props();

	let tx = $state(0);
	let ty = $state(0);
	let scale = $state(1);
	let isDragging = $state(false);
	let isAnimating = $state(false);

	let viewportEl: HTMLDivElement;

	const GRID_SIZE = 24;
	const MIN_SCALE = 0.2;
	const MAX_SCALE = 3;

	let lastMouseX = 0;
	let lastMouseY = 0;
	let lastTouchDist = 0;
	let lastTouchMidX = 0;
	let lastTouchMidY = 0;

	// Update dot grid CSS custom properties whenever transform changes
	$effect(() => {
		if (!viewportEl) return;
		const gs = GRID_SIZE * scale;
		const ox = ((tx % gs) + gs) % gs;
		const oy = ((ty % gs) + gs) % gs;
		viewportEl.style.setProperty('--dot-ox', `${ox}px`);
		viewportEl.style.setProperty('--dot-oy', `${oy}px`);
		viewportEl.style.setProperty('--dot-size', `${gs}px`);
	});

	function startDrag(e: MouseEvent) {
		if (e.button !== 0) return;
		const target = e.target as HTMLElement;
		if (target.closest('button, a, input, textarea, select')) return;
		isDragging = true;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
	}

	function onGlobalMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		tx += e.clientX - lastMouseX;
		ty += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
	}

	function onGlobalMouseUp() {
		isDragging = false;
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		if (e.ctrlKey || e.metaKey) {
			// Pinch-to-zoom (trackpad) or ctrl+scroll
			const delta = -e.deltaY * 0.005;
			const factor = Math.exp(delta * 2);
			const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor));
			const ratio = newScale / scale;
			tx = e.clientX - ratio * (e.clientX - tx);
			ty = e.clientY - ratio * (e.clientY - ty);
			scale = newScale;
		} else {
			// Pan
			tx -= e.deltaX;
			ty -= e.deltaY;
		}
	}

	function handleTouchStart(e: TouchEvent) {
		if (e.touches.length === 2) {
			const t1 = e.touches[0];
			const t2 = e.touches[1];
			lastTouchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
			lastTouchMidX = (t1.clientX + t2.clientX) / 2;
			lastTouchMidY = (t1.clientY + t2.clientY) / 2;
			isDragging = false;
		} else if (e.touches.length === 1) {
			const target = e.touches[0].target as HTMLElement;
			if (target.closest('button, a, input, textarea, select')) return;
			lastMouseX = e.touches[0].clientX;
			lastMouseY = e.touches[0].clientY;
			isDragging = true;
		}
	}

	function handleTouchMove(e: TouchEvent) {
		e.preventDefault();
		if (e.touches.length === 2) {
			isDragging = false;
			const t1 = e.touches[0];
			const t2 = e.touches[1];
			const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
			const midX = (t1.clientX + t2.clientX) / 2;
			const midY = (t1.clientY + t2.clientY) / 2;
			const zoomFactor = dist / lastTouchDist;
			const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * zoomFactor));
			const ratio = newScale / scale;
			tx = midX - ratio * (midX - tx) + (midX - lastTouchMidX);
			ty = midY - ratio * (midY - ty) + (midY - lastTouchMidY);
			scale = newScale;
			lastTouchDist = dist;
			lastTouchMidX = midX;
			lastTouchMidY = midY;
		} else if (e.touches.length === 1 && isDragging) {
			tx += e.touches[0].clientX - lastMouseX;
			ty += e.touches[0].clientY - lastMouseY;
			lastMouseX = e.touches[0].clientX;
			lastMouseY = e.touches[0].clientY;
		}
	}

	function handleTouchEnd() {
		isDragging = false;
	}

	function navigateTo(id: string) {
		const frame = framePositions[id];
		if (!frame) return;
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		isAnimating = true;
		tx = vw / 2 - (frame.x + frame.width / 2) * scale;
		ty = vh / 2 - (frame.y + frame.height / 2) * scale;
		setTimeout(() => {
			isAnimating = false;
		}, 560);
	}

	onMount(() => {
		// Center on the about frame
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const aboutFrame = framePositions['about'];
		if (aboutFrame) {
			tx = vw / 2 - (aboutFrame.x + aboutFrame.width / 2);
			ty = vh / 2 - (aboutFrame.y + aboutFrame.height / 2);
		}

		// Register navigate function in store
		navigateFn.set(navigateTo);

		// Global mouse listeners for drag
		window.addEventListener('mousemove', onGlobalMouseMove);
		window.addEventListener('mouseup', onGlobalMouseUp);

		// Non-passive wheel and touch listeners
		viewportEl.addEventListener('wheel', handleWheel, { passive: false });
		viewportEl.addEventListener('touchstart', handleTouchStart, { passive: false });
		viewportEl.addEventListener('touchmove', handleTouchMove, { passive: false });
		viewportEl.addEventListener('touchend', handleTouchEnd);

		return () => {
			navigateFn.set(null);
			window.removeEventListener('mousemove', onGlobalMouseMove);
			window.removeEventListener('mouseup', onGlobalMouseUp);
			viewportEl.removeEventListener('wheel', handleWheel);
			viewportEl.removeEventListener('touchstart', handleTouchStart);
			viewportEl.removeEventListener('touchmove', handleTouchMove);
			viewportEl.removeEventListener('touchend', handleTouchEnd);
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	bind:this={viewportEl}
	class="viewport"
	class:dragging={isDragging}
	onmousedown={startDrag}
	role="application"
	aria-label="Infinite canvas"
	tabindex="-1"
>
	<div
		class="canvas-inner"
		class:animating={isAnimating}
		style="transform: translate({tx}px, {ty}px) scale({scale}); transform-origin: 0 0;"
	>
		{@render children()}
	</div>
</div>

<style>
	.viewport {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background-color: #f8f6f1;
		background-image: radial-gradient(circle, #c8c3b8 1.5px, transparent 1.5px);
		background-size: var(--dot-size, 24px) var(--dot-size, 24px);
		background-position: var(--dot-ox, 0px) var(--dot-oy, 0px);
		user-select: none;
		-webkit-user-select: none;
		cursor: grab;
		outline: none;
	}

	.viewport.dragging {
		cursor: grabbing;
	}

	.canvas-inner {
		position: absolute;
		top: 0;
		left: 0;
		will-change: transform;
	}

	.canvas-inner.animating {
		transition: transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
</style>
