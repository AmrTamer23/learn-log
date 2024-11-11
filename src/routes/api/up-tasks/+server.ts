import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { course, task } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export const GET: RequestHandler = async ({ request, cookies }) => {
	const token = cookies.get('auth_token');

	if (!token) {
		throw error(401, 'Unauthorized');
	}

	const user = jwt.decode(token) as { userId: string; email: string };

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	try {
		const tasks = await db
			.select()
			.from(task)
			.where(eq(task.userId, parseInt(user.userId)))
			.limit(5);

		tasks.sort((a, b) => {
			const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
			const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
			return dateA - dateB;
		});
		return json({ tasks });
	} catch (err) {
		console.error('Database query failed:', err);
		throw error(500, 'Failed to retrieve upcoming tasks');
	}
};
