<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Bio from '$lib/components/Bio.svelte';

	let displayedSlide = $state(0);
	let animState = $state<'idle' | 'exiting' | 'entering'>('idle');
	let touchStartY = 0;

	const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

	async function goToSlide(n: number) {
		if (n < 0 || n > 1 || n === displayedSlide || animState !== 'idle') return;

		animState = 'exiting';
		await sleep(340);

		displayedSlide = n;
		await tick();

		animState = 'entering';
		await sleep(560);

		animState = 'idle';
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		goToSlide(e.deltaY > 0 ? 1 : 0);
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent) {
		const diff = touchStartY - e.changedTouches[0].clientY;
		if (diff > 30) goToSlide(1);
		else if (diff < -30) goToSlide(0);
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:head>
	<title>Marcus Lee</title>
	<meta
		name="description"
		content="Marcus Lee is a software engineer exploring distributed systems, cloud infrastructure, and thoughtful design."
	/>
</svelte:head>

<section
	class="hero"
	onwheel={handleWheel}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<div class="hero-circle" aria-hidden="true"></div>

	<div class="hero-content">
		<div class="slide" class:exiting={animState === 'exiting'} class:entering={animState === 'entering'}>
			{#if displayedSlide === 0}
				<Bio />
			{:else}
				<p class="slide-text">
					Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
					egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
					Donec eu libero sit amet quam egestas semper.
				</p>
				<p class="slide-text">
					Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et
					sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae,
					ornare sit amet, wisi.
				</p>
			{/if}
		</div>

		<div class="dots">
			<button
				class="dot"
				class:active={displayedSlide === 0}
				onclick={() => goToSlide(0)}
				aria-label="Slide 1"
			></button>
			<button
				class="dot"
				class:active={displayedSlide === 1}
				onclick={() => goToSlide(1)}
				aria-label="Slide 2"
			></button>
		</div>

		<nav class="circle-nav">
			<a href="/garden" class="circle-nav-link">garden</a>
			<span class="circle-nav-sep" aria-hidden="true">/</span>
			<a href="/resume" class="circle-nav-link">resume</a>
		</nav>
	</div>
</section>

<style>
	.hero {
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding: var(--space-8);
	}

	.hero-circle {
		position: absolute;
		width: min(700px, 80vmin);
		height: min(700px, 80vmin);
		background-color: #f5f0e8;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 460px;
		width: 100%;
		display: flex;
		flex-direction: column;
		height: min(380px, 52vmin);

		--color-text-primary: #1a3316;
		--color-text-secondary: rgba(26, 51, 22, 0.75);
		--color-text-tertiary: rgba(26, 51, 22, 0.5);
		--color-link: rgba(26, 51, 22, 0.7);
		--color-link-hover: #1a3316;
		--color-accent-crimson: #d45c2b;
	}

	/* --- slide animation --- */

	.slide {
		flex: 1;
		min-height: 0;
		overflow: hidden;
		will-change: opacity, transform;
	}

	.slide.exiting {
		animation: slideOut 0.34s ease-in forwards;
	}

	.slide.entering {
		animation: slideIn 0.56s ease-out forwards;
	}

	@keyframes slideOut {
		from { opacity: 1; transform: translateY(0); }
		to   { opacity: 0; transform: translateY(-16px); }
	}

	@keyframes slideIn {
		from { opacity: 0; transform: translateY(44px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	/* --- second slide text --- */

	.slide-text {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-4);
	}

	/* --- dot indicator --- */

	.dots {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-top: var(--space-8);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(26, 51, 22, 0.2);
		border: none;
		padding: 0;
		cursor: pointer;
		transition: background 0.3s;
	}

	.dot.active {
		background: #1a3316;
	}

	/* --- circle nav --- */

	.circle-nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		margin-top: var(--space-4);
	}

	.circle-nav-link {
		font-size: var(--text-sm);
		color: rgba(26, 51, 22, 0.5);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.2s;
	}

	.circle-nav-link:hover {
		color: #1a3316;
	}

	.circle-nav-sep {
		font-size: var(--text-sm);
		color: rgba(26, 51, 22, 0.25);
	}

	@media (max-width: 600px) {
		.hero {
			padding: var(--space-6);
		}
	}
</style>
