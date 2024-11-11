import type { UserType } from '$lib/types';
import { Store } from '@tanstack/svelte-store';

export const authStore = new Store<{
	user: UserType | null;
	authed: boolean;
}>({
	user: null,
	authed: false
});

export function updateAuthState(user: UserType | null, isAuthed: boolean) {
	authStore.setState((_prev) => ({
		..._prev,
		user,
		authed: isAuthed
	}));
}
