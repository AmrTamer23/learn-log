<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { courseFormSchema, type FormSchema } from './schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { cn } from '$lib/utils';

	let data: {
		description: string;
		name: string;
		dateOfStart?: string | undefined;
		color?: string | undefined;
		emoji?: string | undefined;
		instructor?: string | undefined;
	} = $props();

	let color = $state('#3b82f6');
	let emojiValue = $state('📚');

	const emojis = ['📚', '💻', '🧪', '🎨', '🔬', '', '🎵', '🏛️', '🌍', '🧠'];
	const form = superForm(data, {
		validators: zodClient(courseFormSchema),
		onSubmit: async ({ formData }) => {
			const res = await fetch('/api/courses', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.get('name'),
					description: formData.get('description'),
					dateOfStart: formData.get('dateOfStart'),
					color: formData.get('color'),
					instructor: formData.get('instructor'),
					emoji: emojiValue
				})
			});
			if (res.ok) {
				form.reset();
				window.location.reload();
				console.log('Course added successfully');
			} else {
				console.error('Failed to add course');
			}
		}
	});
	const { form: formData, enhance } = form;

	function handleColorChange(event: Event) {
		const target = event.target as HTMLInputElement;
		color = target.value;
		$formData.color = color;
	}
	function handleEmojiSelect(emoji: string) {
		emojiValue = emoji;
		$formData.emoji = emojiValue;
		console.log('Selected emoji:', $formData.emoji);
	}
</script>

<form method="POST" use:enhance class=" space-y-6 rounded-lg bg-zinc-800 shadow-xl">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Course Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} class="bg-zinc-700 text-zinc-100" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="instructor">
		<Form.Control let:attrs>
			<Form.Label>Course Instructor</Form.Label>
			<Input {...attrs} bind:value={$formData.instructor} class="bg-zinc-700 text-zinc-100" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="dateOfStart">
		<Form.Control let:attrs>
			<Form.Label>Start Date</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.dateOfStart}
				class="bg-zinc-700 text-zinc-100"
				type="date"
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea
				{...attrs}
				bind:value={$formData.description}
				class="h-36 resize-none bg-zinc-700 text-zinc-100"
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="color">
		<Form.Control let:attrs>
			<Form.Label>Course Color</Form.Label>
			<div class="flex items-center space-x-2">
				<Input
					type="color"
					{...attrs}
					bind:value={color}
					on:change={handleColorChange}
					class="h-12 w-12 border-none bg-transparent p-1"
				/>
				<span class="text-zinc-300">{color}</span>
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="emoji">
		<Form.Control>
			<Form.Label>Course Emoji</Form.Label>

			<div class="flex flex-wrap gap-2">
				{#each emojis as emoji}
					<button
						type="button"
						onclick={() => handleEmojiSelect(emoji)}
						class={cn(
							'flex h-10 w-10 items-center justify-center rounded text-xl',
							emojiValue === emoji ? 'bg-zinc-600' : 'bg-zinc-700 hover:bg-zinc-600'
						)}
					>
						{emoji}
					</button>
				{/each}
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="flex justify-end pt-4">
		<Form.Button class="bg-blue-600 text-white hover:bg-blue-700">Add Course</Form.Button>
	</div>
</form>

<style>
	:global(body) {
		background-color: #18181b;
		color: #fafafa;
	}
</style>
