<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	const mockCourses = [
		{
			id: 1,
			name: 'Web Development',
			desc: 'Learn modern web development with HTML, CSS, and JavaScript',
			dof: '2024-01-01',
			color: '#3b82f6',
			emoji: '💻',
			progress: 65
		},
		{
			id: 2,
			name: 'Data Science',
			desc: 'Master data analysis and machine learning fundamentals',
			dof: '2024-01-15',
			color: '#10b981',
			emoji: '📊',
			progress: 30
		},
		{
			id: 3,
			name: 'Mobile Development',
			desc: 'Build cross-platform mobile applications',
			dof: '2024-02-01',
			color: '#f59e0b',
			emoji: '📱',
			progress: 45
		},
		{
			id: 4,
			name: 'UI/UX Design',
			desc: 'Create beautiful and functional user interfaces',
			dof: '2024-02-15',
			color: '#ec4899',
			emoji: '🎨',
			progress: 80
		}
	];

	const mockTasks = [
		{
			id: 1,
			title: 'Complete JavaScript Assignment',
			desc: 'Submit final project for Web Development course',
			isDone: 0
		},
		{
			id: 2,
			title: 'Data Visualization Project',
			desc: 'Create dashboard using Python and Matplotlib',
			isDone: 0
		},
		{
			id: 3,
			title: 'Mobile App Wireframes',
			desc: 'Design initial screens for the fitness app',
			isDone: 1
		},
		{
			id: 4,
			title: 'User Research Report',
			desc: 'Compile findings from user interviews',
			isDone: 0
		}
	];
</script>

<main>
	<Separator class="bg-zinc-600"></Separator>
	<div class="flex justify-between gap-8 p-8">
		<section class="flex w-3/5 flex-col gap-4">
			<div class="flex items-center justify-between">
				<h2 class="font- text-4xl">My Courses</h2>
				<Button>
					<svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
						><path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h14m-7-7v14"
						/></svg
					>
				</Button>
			</div>
			<div class="grid grid-cols-3 gap-6 pt-4">
				{#each mockCourses as course}
					<div class="flex flex-col gap-2 rounded-lg border border-zinc-200 p-6 shadow-sm">
						<div class="flex items-center gap-3">
							<span class="text-2xl">{course.emoji}</span>
							<h3 class="text-xl font-semibold">{course.name}</h3>
						</div>
						<p class="text-sm text-zinc-200">{course.desc}</p>
						<div class="mt-2">
							<div class="h-2 w-full rounded-full bg-zinc-100">
								<div
									class="h-2 rounded-full bg-primary transition-all"
									style="width: {course.progress}%"
								></div>
							</div>
							<span class="mt-1 text-sm text-zinc-400">{course.progress}% Complete</span>
						</div>
					</div>
				{/each}
			</div>
		</section>
		<section class="w-1/4">
			<h2 class="font- text-4xl">Upcoming deadlines</h2>
			<div class="mt-4 flex flex-col gap-3 pt-4">
				{#each mockTasks.filter((task) => !task.isDone) as task}
					<div class="rounded-lg border border-zinc-200 p-4">
						<h3 class="font-semibold">{task.title}</h3>
						<p class="text-sm text-zinc-200">{task.desc}</p>
					</div>
				{/each}
			</div>
		</section>
	</div>
</main>
