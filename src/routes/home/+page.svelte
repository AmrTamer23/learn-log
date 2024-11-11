<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { Course } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery<
		{
			courses: Course[];
		},
		Error
	>({
		queryKey: ['courses'],
		queryFn: async () => {
			const response = await fetch('/api/courses', {
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});
			const data = await response.json();
			console.log('Response:', data); // Log the response to check the data structure
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return data;
		}
	});

	function formatDate(dateString: string) {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	}
</script>

<main class="h-[92dvh] max-h-full bg-zinc-900 text-zinc-100">
	<Separator class="bg-zinc-700" />
	<div class="flex justify-between gap-8 p-8">
		<section class="flex w-3/5 flex-col gap-4">
			<div class="flex items-center justify-between">
				<h2 class="text-4xl font-bold">My Courses</h2>
				<Button variant="outline" class="border-zinc-700 text-zinc-100 hover:bg-zinc-800">
					<svg
						width="1.5rem"
						height="1.5rem"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h14m-7-7v14"
						/>
					</svg>
					Add Course
				</Button>
			</div>
			<div class="grid grid-cols-2 gap-6 pt-4">
				{#if $query.isLoading}
					<p>Loading...</p>
				{:else if $query.isError}
					<p>Error loading courses: {$query.error.message}</p>
				{:else if $query?.data?.courses?.length ?? 0 > 0}
					{#each $query?.data?.courses || [] as course}
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
								<div class="h-2 w-full rounded-full bg-zinc-700">
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
					{/each}
				{:else}
					<p class="text-lg">No courses found</p>
				{/if}
			</div>
		</section>
		<section class="w-2/5">
			<h2 class="mb-6 text-4xl font-bold">Upcoming Deadlines</h2>
			<!-- <div class="flex flex-col gap-4">
				{#each mockTasks.filter((task) => !task.isDone) as task}
					<div
						class="hover:bg-zinc-750 rounded-lg border border-zinc-700 bg-zinc-800 p-5 transition-all duration-300"
					>
						<div class="mb-2 flex items-center justify-between">
							<h3 class="text-lg font-semibold">{task.title}</h3>
							<span class="flex items-center gap-1 text-sm font-medium text-amber-400">
								<span>⏰</span>
								Due: {formatDate(task.dueDate)}
							</span>
						</div>
						<p class="mb-3 text-sm text-zinc-300">{task.desc}</p>
						<div class="flex items-center justify-between">
							<Button
								variant="outline"
								size="sm"
								class="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
							>
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
				{/each}
			</div> -->
		</section>
	</div>
</main>
