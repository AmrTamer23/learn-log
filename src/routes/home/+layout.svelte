<script lang="ts">
	let { children } = $props();
	import { updateAuthState } from '$lib/stores/auth.store';
	import { onMount } from 'svelte';

	async function checkAuth() {
		try {
			const response = await fetch('/api/auth/verify');
			console.log('Response:', response);
			if (response.ok) {
				const data = await response.json();
				updateAuthState(data, true);
			} else {
				updateAuthState(null, false);
			}
		} catch (error) {
			updateAuthState(null, false);
		}
	}

	onMount(async () => {
		await checkAuth();
	});
</script>

<main>
	{@render children()}
</main>
