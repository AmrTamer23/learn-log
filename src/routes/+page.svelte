<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';

	let showTestimonial = false;

	onMount(() => {
		setTimeout(() => {
			showTestimonial = true;
		}, 500);
	});
</script>

<main class="p-4 font-sans">
	<section class="hero rounded-lg text-white">
		<div class="container mx-auto flex flex-col justify-center px-6 py-20 *:mx-auto">
			<h1 class="mb-4 text-5xl font-bold">
				Track Your Learning Journey with <span
					class="text-pretty font-highlight font-thin italic text-primary"
				>
					Learn Log
				</span>
			</h1>
			<p class="mx-auto mb-8 text-xl">
				Never lose track of your progress. Organize, monitor, and accelerate your learning.
			</p>
			<a href="/auth"> <Button class="text-lg">Get Started</Button> </a>
		</div>
	</section>

	<section class="py-20">
		<div class="container mx-auto px-6">
			<h2 class="mb-12 text-center text-3xl font-bold">Why Choose Learn Log?</h2>
			<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
				<div class="text-center">
					<svg
						class="mx-auto mb-4 h-12 w-12 text-primary"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
						></path></svg
					>
					<h3 class="mb-2 text-xl font-semibold">Track Multiple Subjects</h3>
					<p>Keep all your learning endeavors organized in one place.</p>
				</div>
				<div class="text-center">
					<svg
						class="mx-auto mb-4 h-12 w-12 text-primary"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						></path></svg
					>
					<h3 class="mb-2 text-xl font-semibold">Progress Visualization</h3>
					<p>See your growth with intuitive charts and graphs.</p>
				</div>
				<div class="text-center">
					<svg
						class="mx-auto mb-4 h-12 w-12 text-primary"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						></path></svg
					>
					<h3 class="mb-2 text-xl font-semibold">Smart Reminders</h3>
					<p>Stay on track with customizable notifications.</p>
				</div>
			</div>
		</div>
	</section>

	{#if showTestimonial}
		<section class=" py-20" transition:fade>
			<div class="container mx-auto px-6">
				<div class="mx-auto max-w-2xl text-center">
					<svg
						class="mx-auto mb-4 h-12 w-12 text-gray-400"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
						></path></svg
					>
					<p class="mb-4 text-xl">
						"Learn Log has revolutionized the way I approach my studies. It's like having a personal
						learning coach!"
					</p>
					<p class="font-semibold">- Sarah K., Medical Student</p>
				</div>
			</div>
		</section>
	{/if}

	<footer class=" py-8 text-white">
		<div class="container mx-auto px-6 text-center">
			<p>&copy; 2023 Learn Log. All rights reserved.</p>
		</div>
	</footer>
</main>

<style>
	.hero {
		background-color: #241100;
		background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
		/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
	}
</style>
