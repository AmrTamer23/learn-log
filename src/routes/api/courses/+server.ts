import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { course, task } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export const GET: RequestHandler = async ({ request, cookies }) => {
	const token = cookies.get('auth_token');

	if (!token) {
		return error(401, 'Unauthorized');
	}

	const user = jwt.decode(token) as { userId: string; email: string };

	if (!user) {
		return error(401, 'Unauthorized');
	}

	console.log(user.userId);

	const courses = await db
		.select()
		.from(course)
		.where(and(eq(course.userId, parseInt(user.userId)), eq(course.archived, false)));

	console.log(courses);

	return json({ courses });
};
