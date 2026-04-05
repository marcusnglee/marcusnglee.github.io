<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Bio from '$lib/components/Bio.svelte';

	let displayedSlide = $state(0);
	let animState = $state<'idle' | 'exiting' | 'entering'>('idle');
	let touchStartY = 0;

	const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

	async function goToSlide(n: number) {
		if (n < 0 || n > 2 || n === displayedSlide || animState !== 'idle') return;

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
		goToSlide(e.deltaY > 0 ? displayedSlide + 1 : displayedSlide - 1);
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent) {
		const diff = touchStartY - e.changedTouches[0].clientY;
		if (diff > 30) goToSlide(displayedSlide + 1);
		else if (diff < -30) goToSlide(displayedSlide - 1);
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
		content="Marcus Lee's personal website"
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
			{:else if displayedSlide === 1}
				<p class="slide-label">Currently, I'm thinking about</p>
				<ul class="slide-list">
					<li>Privacy-preserving ML systems, Federated Learning</li>
					<li>Streaming Platform's Impact on Music Culture</li>
					<li>Internet Dark Forest</li>
				</ul>
			{:else}
				<p class="slide-label">I always hold curiosity for</p>
				<ul class="slide-list">
					<li>music</li>
					<li>功夫茶 (tea!)</li>
					<li>digital gardens! (other peoples' opinions)</li>
					<li>design (yes, this is intentionally vague c:)</li>
				</ul>
			{/if}
		</div>

		<div class="dots">
			<button class="dot" class:active={displayedSlide === 0} onclick={() => goToSlide(0)} aria-label="Slide 1"></button>
			<button class="dot" class:active={displayedSlide === 1} onclick={() => goToSlide(1)} aria-label="Slide 2"></button>
			<button class="dot" class:active={displayedSlide === 2} onclick={() => goToSlide(2)} aria-label="Slide 3"></button>
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
		width: min(860px, 94vmin);
		height: min(860px, 94vmin);
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

	/* --- second/third slide --- */

	.slide-label {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		letter-spacing: 0.04em;
		margin-bottom: var(--space-4);
	}

	.slide-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.slide-list li {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
		padding-left: var(--space-4);
		position: relative;
	}

	.slide-list li::before {
		content: '·';
		position: absolute;
		left: 0;
		color: var(--color-text-tertiary);
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
