import { sequence } from '@sveltejs/kit/hooks';
import jwt from 'jsonwebtoken';
import type { Handle } from '@sveltejs/kit';

const protect: Handle = async ({ event, resolve }) => {
	// Paths that don't need protection
	if (event.url.pathname.startsWith('/api/auth')) {
		return await resolve(event);
	}

	// Check protected routes (adjust this pattern as needed)
	if (event.url.pathname.startsWith('/api')) {
		const token = event.cookies.get('auth_token');

		if (!token) {
			return new Response('Unauthorized', { status: 401 });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'your-secret-key');
			// Add the user info to the event.locals if you want
			//@ts-expect-error
			event.locals.user = decoded;
		} catch (err) {
			return new Response('Unauthorized', { status: 401 });
		}
	}

	return await resolve(event);
};

export const handle = sequence(protect);
