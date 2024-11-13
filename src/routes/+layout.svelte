<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	let { children } = $props();
</script>

<div class="app dark bg-background text-foreground">
	<main>
		<QueryClientProvider>
			{@render children()}
		</QueryClientProvider>
	</main>
</div>
