<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient();

	let { children } = $props();
</script>

<div class="app">
	<main>
		<QueryClientProvider>
			{@render children()}
		</QueryClientProvider>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
	}
</style>
