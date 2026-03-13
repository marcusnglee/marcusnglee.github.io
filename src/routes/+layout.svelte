<script lang="ts">
	import '../app.css';
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
</style>
