<script lang="ts">
	import { spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	let isLogin = $state(true);
	const formPosition = spring(0, { stiffness: 0.3, damping: 0.8 });
	$effect(() => {
		formPosition.set(isLogin ? 0 : 50);
	});

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let passwordError = $state('');

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (!isLogin && password !== confirmPassword) {
			passwordError = "Passwords don't match";
			return;
		}
		passwordError = '';

		console.log('Form submitted:', { isLogin, name, email, password });

		const res = fetch('/api/auth/login', {
			body: JSON.stringify({ isLogin, name, email, password }),
			method: 'POST'
		}).then((res) => {
			if (res.ok) {
				console.log('Login successful');
				window.location.href = '/home';
			} else {
				console.log('Login failed');
			}
		});
	}
</script>

<div class="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 rounded-xl bg-white p-6 shadow-md">
		<div class="flex justify-center">
			<div class="rounded-full bg-gray-200 p-1">
				<button
					class="rounded-full px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none"
					class:bg-blue-500={isLogin}
					class:text-white={isLogin}
					onclick={() => (isLogin = true)}
				>
					Sign In
				</button>
				<button
					class="rounded-full px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none"
					class:bg-blue-500={!isLogin}
					class:text-white={!isLogin}
					onclick={() => (isLogin = false)}
				>
					Sign Up
				</button>
			</div>
		</div>

		<div class="overflow-hidden" style="height: {isLogin ? '240px' : '380px'}">
			<div
				class="flex transition-transform duration-300 ease-in-out"
				style="transform: translateX(-{$formPosition}%); width: 200%;"
			>
				<form onsubmit={handleSubmit} class="w-1/2 space-y-6 pr-4" in:fade={{ duration: 300 }}>
					<h2 class="text-center text-3xl font-extrabold text-gray-900">Welcome Back</h2>
					<div>
						<label for="login-email" class="sr-only">Email address</label>
						<input
							id="login-email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={email}
							class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="Email address"
						/>
						<div class="text-red-500">{passwordError}</div>
					</div>
					<div>
						<label for="login-password" class="sr-only">Password</label>
						<input
							id="login-password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							bind:value={password}
							class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="Password"
						/>
						<div class="text-red-500">{passwordError}</div>
					</div>
					<div>
						<button
							type="submit"
							class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							<span class="absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
							Sign In
						</button>
					</div>
				</form>

				<form onsubmit={handleSubmit} class="w-1/2 space-y-6 pl-4" in:fade={{ duration: 300 }}>
					<h2 class="text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
					<div>
						<label for="signup-name" class="sr-only">Full Name</label>
						<input
							id="signup-name"
							name="name"
							type="text"
							required
							bind:value={name}
							class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="Full Name"
						/>
					</div>
					<div>
						<label for="signup-email" class="sr-only">Email address</label>
						<input
							id="signup-email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={email}
							class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="Email address"
						/>
					</div>
					<div>
						<label for="signup-password" class="sr-only">Password</label>
						<input
							id="signup-password"
							name="password"
							type="password"
							autocomplete="new-password"
							required
							bind:value={password}
							class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="Password"
						/>
					</div>
					<div>
						<label for="confirm-password" class="sr-only">Confirm Password</label>
						<input
							id="confirm-password"
							name="confirm-password"
							type="password"
							autocomplete="new-password"
							required
							bind:value={confirmPassword}
							class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="Confirm Password"
						/>
					</div>
					{#if passwordError}
						<p class="text-sm text-red-500">{passwordError}</p>
					{/if}
					<div>
						<button
							type="submit"
							class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							<span class="absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
