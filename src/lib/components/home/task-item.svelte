<script lang="ts">
	import type { Task } from '$lib/types';
	import { formatDate } from '$lib/utils';
	import Button from '../ui/button/button.svelte';

	let {
		task
	}: {
		task: Task;
	} = $props();
</script>

<div
	class="hover:bg-zinc-750 rounded-lg border border-zinc-700 bg-zinc-800 p-5 transition-all duration-300"
>
	<div class="mb-2 flex items-center justify-between">
		<h3 class="text-lg font-semibold">{task.title}</h3>
		<span class="flex items-center gap-1 text-sm font-medium text-amber-400">
			<span>⏰</span>
			Due: {formatDate(task.dueDate || '')}
		</span>
	</div>
	<p class="mb-3 text-sm text-zinc-300">{task.description || ''}</p>
	<div class="flex items-center justify-between">
		<Button variant="outline" size="sm" class="border-zinc-600 text-zinc-300 hover:bg-zinc-700">
			Mark as Complete
		</Button>
		<span class="flex items-center gap-1 text-sm text-zinc-400">
			<span class={task.isDone ? 'text-green-500' : 'text-zinc-600'}>
				{task.isDone ? '✅' : '⭕'}
			</span>
			{task.isDone ? 'Completed' : 'Pending'}
		</span>
	</div>
</div>
