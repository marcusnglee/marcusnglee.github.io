<script lang="ts">
	import { onMount } from 'svelte';
	import { navigateFn, locked } from '$lib/stores/canvas';
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

	const MIN_SCALE = 0.2;
	const MAX_SCALE = 3;

	let lastMouseX = 0;
	let lastMouseY = 0;
	let lastTouchDist = 0;
	let lastTouchMidX = 0;
	let lastTouchMidY = 0;

	function startDrag(e: MouseEvent) {
		if ($locked) return;
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
		if ($locked) return;
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
		if ($locked) return;
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
		if ($locked) return;
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
		locked.set(id !== 'about');
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
			locked.set(false);
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
	class:locked={$locked}
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
		user-select: none;
		-webkit-user-select: none;
		cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='4' fill='%231a1a1a'/%3E%3C/svg%3E") 5 5, auto;
		outline: none;
	}

	.viewport.locked {
		cursor: default;
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
