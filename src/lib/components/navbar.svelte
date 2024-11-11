<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from './ui/button/button.svelte';
	let {
		name
	}: {
		name?: string;
	} = $props();
	console.log(name);
</script>

<nav class="flex h-[8dvh] w-full items-end justify-between px-8 py-4">
	<div>
		<a
			href="/"
			class="flex items-center font-highlight text-4xl font-semibold italic text-primary !no-underline"
		>
			Learn Log
		</a>
	</div>

	<div class="flex items-center gap-4">
		<Button class="text-xl" variant="secondary">My Profile</Button>
		<Button class="text-xl" variant="destructive">Logout</Button>
	</div>
</nav>
