<script lang="ts">
	import { navigateFn } from '$lib/stores/canvas';

	const navItems = [
		{ id: 'about',     shape: 'circle'   },
		{ id: 'portfolio', shape: 'square'   },
		{ id: 'garden',    shape: 'triangle' },
		{ id: 'links',     shape: 'diamond'  },
	];

	function navigate(id: string) {
		$navigateFn?.(id);
	}
</script>

<header>
	<div class="name">marcus lee</div>
	<nav>
		{#each navItems as item}
			<button onclick={() => navigate(item.id)} aria-label={item.id}>
				{#if item.shape === 'circle'}
					<svg viewBox="0 0 14 14" fill="currentColor"><circle cx="7" cy="7" r="6"/></svg>
				{:else if item.shape === 'square'}
					<svg viewBox="0 0 14 14" fill="currentColor"><rect x="1" y="1" width="12" height="12"/></svg>
				{:else if item.shape === 'triangle'}
					<svg viewBox="0 0 14 14" fill="currentColor"><polygon points="7,1 13,13 1,13"/></svg>
				{:else if item.shape === 'diamond'}
					<svg viewBox="0 0 14 14" fill="currentColor"><polygon points="7,1 13,7 7,13 1,7"/></svg>
				{/if}
			</button>
		{/each}
	</nav>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 44px;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		background: rgba(248, 246, 241, 0.72);
		pointer-events: auto;
	}

	.name {
		font-family: Montserrat, sans-serif;
		font-size: 13px;
		font-weight: 600;
		color: #1a1a1a;
		letter-spacing: 0.04em;
	}

	nav {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 20px;
		align-items: center;
	}

	nav button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: none;
		border: none;
		padding: 0;
		color: #bbb;
		transition: color 0.15s ease;
	}

	nav button:hover {
		color: #1a1a1a;
	}

	nav button svg {
		width: 10px;
		height: 10px;
	}
</style>
