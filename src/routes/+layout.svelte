<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="app">
	<main class="main">
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main {
		flex: 1;
		width: 100%;
	}

	:global(::view-transition-old(root)) {
		animation: page-out 0.3s ease-in forwards;
	}

	:global(::view-transition-new(root)) {
		animation: page-in 0.4s ease-out forwards;
	}

	@keyframes -global-page-out {
		from { opacity: 1; }
		to   { opacity: 0; }
	}

	@keyframes -global-page-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}
</style>
