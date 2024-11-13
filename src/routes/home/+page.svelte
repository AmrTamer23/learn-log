<script lang="ts">
	import CourseItem from '$lib/components/home/course-item.svelte';
	import TaskItem from '$lib/components/home/task-item.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { Course, Task } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';
	import * as Dialog from '$lib/components/ui/dialog';
	import CourseForm from './course-form.svelte';
	import type { PageData } from './$types.js';
	export let data: PageData;

	const coursesQuery = createQuery<
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
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return data;
		}
	});

	const upTasksQuery = createQuery<
		{
			tasks: Task[];
		},
		Error
	>({
		queryKey: ['tasks'],
		queryFn: async () => {
			const response = await fetch('/api/up-tasks', {
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return data;
		}
	});

	console.log('Tasks Query:', $upTasksQuery.data?.tasks);
</script>

<main class="h-[92dvh] max-h-full bg-zinc-900 text-zinc-100">
	<Separator class="bg-zinc-700" />
	<div class="flex justify-between gap-8 p-8">
		<section class="flex w-3/5 flex-col gap-4">
			<div class="flex items-center justify-between">
				<h2 class="text-4xl font-bold">My Courses</h2>

				<Dialog.Root>
					<Dialog.Trigger>
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
					</Dialog.Trigger>
					<Dialog.Content class="bg-zinc-800 p-4">
						<Dialog.Header>
							<Dialog.Title>Add new Course</Dialog.Title>
							<Dialog.Description class="text-zinc-300">
								Enter the details of the course you want to add.
							</Dialog.Description>
						</Dialog.Header>
						<CourseForm {...data.form.data} />
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<div class="grid grid-cols-2 gap-6 pt-4">
				{#if $coursesQuery.isLoading}
					{#each Array(4) as _}
						<div
							class="flex flex-col gap-3 rounded-lg border border-zinc-700 bg-zinc-800 p-6 shadow-md"
						>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<div class="h-8 w-8 animate-pulse rounded-full bg-zinc-700"></div>
									<div class="h-6 w-32 animate-pulse rounded bg-zinc-700"></div>
								</div>
								<div class="h-4 w-24 animate-pulse rounded bg-zinc-700"></div>
							</div>
							<div class="h-4 w-full animate-pulse rounded bg-zinc-700"></div>
							<div class="h-4 w-3/4 animate-pulse rounded bg-zinc-700"></div>
							<div class="mt-2">
								<div class="h-2 w-full rounded-full bg-zinc-700">
									<div class="h-2 w-1/2 animate-pulse rounded-full bg-zinc-600"></div>
								</div>
							</div>
						</div>
					{/each}
				{:else if $coursesQuery.isError}
					<div class="col-span-2 rounded-lg border border-red-700 bg-red-900 p-4 text-red-100">
						<p>Error loading courses: {$coursesQuery.error.message}</p>
						<Button class="mt-2" on:click={() => $coursesQuery.refetch()}>Retry</Button>
					</div>
				{:else if $coursesQuery?.data?.courses?.length ?? 0 > 0}
					{#each $coursesQuery?.data?.courses || [] as course}
						<CourseItem {course} />
					{/each}
				{:else}
					<p class="col-span-2 text-center text-lg">
						No courses found. Add a course to get started!
					</p>
				{/if}
			</div>
		</section>
		<section class="w-2/5">
			<h2 class="mb-6 text-4xl font-bold">Upcoming Deadlines</h2>
			<div class="flex flex-col gap-4">
				{#if $upTasksQuery.isLoading}
					{#each Array(3) as _}
						<div class="rounded-lg border border-zinc-700 bg-zinc-800 p-5">
							<div class="mb-2 flex items-center justify-between">
								<div class="h-6 w-32 animate-pulse rounded bg-zinc-700"></div>
								<div class="h-4 w-24 animate-pulse rounded bg-zinc-700"></div>
							</div>
							<div class="mb-3 h-4 w-full animate-pulse rounded bg-zinc-700"></div>
							<div class="flex items-center justify-between">
								<div class="h-8 w-32 animate-pulse rounded bg-zinc-700"></div>
								<div class="h-4 w-16 animate-pulse rounded bg-zinc-700"></div>
							</div>
						</div>
					{/each}
				{:else if $upTasksQuery.isError}
					<div class="rounded-lg border border-red-700 bg-red-900 p-4 text-red-100">
						<p>Error loading tasks: {$upTasksQuery.error.message}</p>
						<Button class="mt-2" onclick={() => $upTasksQuery.refetch()}>Retry</Button>
					</div>
				{:else if $upTasksQuery?.data?.tasks?.filter((task) => !task.isDone)?.length ?? 0 > 0}
					{#each $upTasksQuery.data?.tasks?.filter((task) => !task.isDone) || [] as task}
						<TaskItem {task} />
					{/each}
				{:else}
					<p class="text-center text-lg">No upcoming tasks. Great job!</p>
				{/if}
			</div>
		</section>
	</div>
</main>

<style>
	:global(body) {
		background-color: #18181b;
		color: #fafafa;
	}
</style>
