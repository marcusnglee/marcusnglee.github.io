<script lang="ts">
	import { navigateFn } from '$lib/stores/canvas';

	const navItems = [
		{ label: 'About', id: 'about' },
		{ label: 'Work', id: 'portfolio' },
		{ label: 'Garden', id: 'garden' },
		{ label: 'Links', id: 'links' }
	];

	function navigate(id: string) {
		$navigateFn?.(id);
	}
</script>

<header>
	<div class="name">marcus lee</div>
	<nav>
		{#each navItems as item}
			<button onclick={() => navigate(item.id)}>{item.label}</button>
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
		display: flex;
		gap: 24px;
		align-items: center;
	}

	nav button {
		font-family: Montserrat, sans-serif;
		font-size: 12px;
		color: #777;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px 0;
		transition: color 0.15s ease;
		letter-spacing: 0.02em;
	}

	nav button:hover {
		color: #1a1a1a;
	}
</style>
