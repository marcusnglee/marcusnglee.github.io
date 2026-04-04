<script lang="ts">
	import { onMount } from 'svelte';
	import { navigateFn, clearSectionFn, locked, activeSection } from '$lib/stores/canvas';
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

	let lastMouseX = 0;
	let lastMouseY = 0;

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
		tx -= e.deltaX;
		ty -= e.deltaY;
	}

	function handleTouchStart(e: TouchEvent) {
		if (e.touches.length === 1) {
			const target = e.touches[0].target as HTMLElement;
			if (target.closest('button, a, input, textarea, select')) return;
			lastMouseX = e.touches[0].clientX;
			lastMouseY = e.touches[0].clientY;
			isDragging = true;
		}
	}

	function handleTouchMove(e: TouchEvent) {
		e.preventDefault();
		if (e.touches.length === 1 && isDragging) {
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

		// Always navigate at scale 1 — sections open as fullscreen overlays
		tx = vw / 2 - (frame.x + frame.width / 2);
		ty = vh / 2 - (frame.y + frame.height / 2);
		scale = 1;

		locked.set(false);
		activeSection.set(id === 'about' ? null : id);
		setTimeout(() => {
			isAnimating = false;
		}, 560);
	}

	function clearSection(id: string) {
		const frame = framePositions[id];
		if (!frame) return;
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		// Position canvas so the frame button is centered, then close overlay
		tx = vw / 2 - (frame.x + frame.width / 2);
		ty = vh / 2 - (frame.y + frame.height / 2);
		scale = 1;
		activeSection.set(null);
	}

	onMount(() => {
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const aboutFrame = framePositions['about'];
		if (aboutFrame) {
			tx = vw / 2 - (aboutFrame.x + aboutFrame.width / 2);
			ty = vh / 2 - (aboutFrame.y + aboutFrame.height / 2);
		}

		navigateFn.set(navigateTo);
		clearSectionFn.set(clearSection);

		window.addEventListener('mousemove', onGlobalMouseMove);
		window.addEventListener('mouseup', onGlobalMouseUp);
		window.addEventListener('wheel', handleWheel, { passive: false });

		viewportEl.addEventListener('touchstart', handleTouchStart, { passive: false });
		viewportEl.addEventListener('touchmove', handleTouchMove, { passive: false });
		viewportEl.addEventListener('touchend', handleTouchEnd);

		return () => {
			navigateFn.set(null);
			clearSectionFn.set(null);
			locked.set(false);
			activeSection.set(null);
			window.removeEventListener('mousemove', onGlobalMouseMove);
			window.removeEventListener('mouseup', onGlobalMouseUp);
			window.removeEventListener('wheel', handleWheel);
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
		background-color: #f5f0e8;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg transform='translate(40,40)'%3E%3Cellipse rx='3.5' ry='10' fill='%23c4aa80' opacity='0.22' transform='rotate(0) translate(0,-6)'/%3E%3Cellipse rx='3.5' ry='10' fill='%23c4aa80' opacity='0.22' transform='rotate(60) translate(0,-6)'/%3E%3Cellipse rx='3.5' ry='10' fill='%23c4aa80' opacity='0.22' transform='rotate(120) translate(0,-6)'/%3E%3Cellipse rx='3.5' ry='10' fill='%23c4aa80' opacity='0.22' transform='rotate(180) translate(0,-6)'/%3E%3Cellipse rx='3.5' ry='10' fill='%23c4aa80' opacity='0.22' transform='rotate(240) translate(0,-6)'/%3E%3Cellipse rx='3.5' ry='10' fill='%23c4aa80' opacity='0.22' transform='rotate(300) translate(0,-6)'/%3E%3Ccircle r='4' fill='%23b89060' opacity='0.28'/%3E%3C/g%3E%3Cg transform='translate(0,0)'%3E%3Cellipse rx='2' ry='5.5' fill='%23c4aa80' opacity='0.14' transform='rotate(0) translate(0,-3)'/%3E%3Cellipse rx='2' ry='5.5' fill='%23c4aa80' opacity='0.14' transform='rotate(60) translate(0,-3)'/%3E%3Cellipse rx='2' ry='5.5' fill='%23c4aa80' opacity='0.14' transform='rotate(120) translate(0,-3)'/%3E%3Cellipse rx='2' ry='5.5' fill='%23c4aa80' opacity='0.14' transform='rotate(180) translate(0,-3)'/%3E%3Cellipse rx='2' ry='5.5' fill='%23c4aa80' opacity='0.14' transform='rotate(240) translate(0,-3)'/%3E%3Cellipse rx='2' ry='5.5' fill='%23c4aa80' opacity='0.14' transform='rotate(300) translate(0,-3)'/%3E%3Ccircle r='2.5' fill='%23b89060' opacity='0.18'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
		user-select: none;
		-webkit-user-select: none;
		outline: none;
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
