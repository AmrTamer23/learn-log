<script lang="ts">
	let { children } = $props();
	import { authStore as store, updateAuthState } from '$lib/stores/auth.store';
	import { useStore } from '@tanstack/svelte-store';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/layout/navbar.svelte';

	const authStore = useStore(store);

	async function checkAuth() {
		try {
			const response = await fetch('/api/auth/verify');
			console.log('Response:', response);
			if (response.ok) {
				const data = await response.json();

				updateAuthState(data.user, true);
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

<main class="min-h-screen">
	<header>
		<Navbar name={authStore.current.user?.email} />
	</header>
	{@render children()}
</main>
