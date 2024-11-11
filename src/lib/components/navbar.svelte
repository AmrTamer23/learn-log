<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	let {
		name
	}: {
		name?: string;
	} = $props();
	console.log(name);
</script>

<nav class="flex h-full w-full items-end justify-between px-8 py-4">
	<div>
		<a
			href="/"
			class="flex items-center font-highlight text-4xl font-semibold text-primary !no-underline"
		>
			Learn Log
		</a>
	</div>

	<Avatar.Root class="size-14 bg-stone-800 font-highlight text-xl italic shadow-md">
		<Avatar.Fallback class="cursor-pointer border-2 border-[#f9e8a4] bg-zinc-900 text-zinc-100">
			{name?.charAt(0).toUpperCase()}
		</Avatar.Fallback>
	</Avatar.Root>
</nav>
