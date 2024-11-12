<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { courseFormSchema, type FormSchema } from './schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { CalendarIcon } from 'lucide-svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(courseFormSchema),
		onSubmit: async ({ formData }) => {
			// Add your submit logic here
			console.log('Form submitted:', formData);
		}
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', { dateStyle: 'long' });

	let dateValue: DateValue | undefined = undefined;
	let colorValue = '#3b82f6'; // Default color
	let emojiValue = '📚'; // Default emoji

	const emojis = ['📚', '💻', '🧪', '🎨', '🔬', '🧮', '🎵', '🏛️', '🌍', '🧠'];

	function handleDateChange(newValue: DateValue) {
		dateValue = newValue;
		$formData.dateOfStart = newValue.toString();
	}

	function handleColorChange(event: Event) {
		const target = event.target as HTMLInputElement;
		colorValue = target.value;
		$formData.color = colorValue;
	}

	function handleEmojiSelect(emoji: string) {
		emojiValue = emoji;
		$formData.emoji = emojiValue;
	}

	let value: DateValue | undefined = undefined;
</script>

<form
	method="POST"
	use:enhance
	class="mx-auto max-w-md space-y-6 rounded-lg bg-zinc-800 p-6 shadow-xl"
>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Course Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} class="bg-zinc-700 text-zinc-100" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="dateOfStart">
		<Form.Control let:attrs>
			<Form.Label>Start Date</Form.Label>
			<Popover.Root openFocus>
				<Popover.Trigger asChild let:builder>
					<Button
						variant="outline"
						class={cn(
							'w-[280px] justify-start text-left font-normal',
							!value && 'text-muted-foreground'
						)}
						builders={[builder]}
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{value ? df.format(value.toDate(getLocalTimeZone())) : 'Select a date'}
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0">
					<Calendar bind:value initialFocus />
				</Popover.Content>
			</Popover.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} class="bg-zinc-700 text-zinc-100" />
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
					bind:value={colorValue}
					on:change={handleColorChange}
					class="h-12 w-12 border-none bg-transparent p-1"
				/>
				<span class="text-zinc-300">{colorValue}</span>
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="emoji">
		<Form.Control let:attrs>
			<Form.Label>Course Emoji</Form.Label>
			<div class="flex flex-wrap gap-2">
				{#each emojis as emoji}
					<button
						type="button"
						on:click={() => handleEmojiSelect(emoji)}
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
