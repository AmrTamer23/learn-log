<script lang="ts">
	import type { Course } from '$lib/types';
	import { formatDate } from '$lib/utils';

	let {
		course
	}: {
		course: Course;
	} = $props();
</script>

<div
	class="hover:bg-zinc-750 flex flex-col gap-3 rounded-lg border border-zinc-700 bg-zinc-800 p-6 shadow-md transition-all duration-300"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<span class="text-3xl">{course.emoji}</span>
			<h3 class="text-xl font-semibold">{course.name || ''}</h3>
		</div>
		<span class="text-sm text-zinc-400">
			Started: {formatDate(course.dateOfStart || '')}
		</span>
	</div>
	<p class="text-sm text-zinc-300">{course.description || ''}</p>
	<div class="flex items-center gap-2 text-sm text-zinc-400">
		<span>👨‍🏫</span>
		<span>Instructor: {course.instructor === '' ? 'Not set' : course.instructor}</span>
	</div>
	<div class="mt-2">
		<div class="mb-4 h-2 w-full rounded-full bg-zinc-700">
			<div
				class="h-2 rounded-full transition-all duration-500 ease-in-out"
				style="width: {course.progress}%; background-color: {course.color}"
			></div>
		</div>
		<span class="mt-1 text-sm font-medium" style="color: {course.color}">
			{course.progress}% Complete
		</span>
	</div>
</div>
