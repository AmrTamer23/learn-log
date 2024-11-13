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

	const courses = await db
		.select()
		.from(course)
		.where(and(eq(course.userId, parseInt(user.userId)), eq(course.archived, false)));

	return json({ courses });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const token = cookies.get('auth_token');

	if (!token) {
		return error(401, 'Unauthorized');
	}

	const user = jwt.decode(token) as { userId: string; email: string };

	if (!user) {
		return error(401, 'Unauthorized');
	}

	const { name, description, dateOfStart, color, emoji, instructor } = await request.json();

	if (!name || !description || !dateOfStart || !color) {
		return error(400, 'Missing required fields');
	}

	if (name.length < 2 || name.length > 50) {
		return error(400, 'Name must be between 2 and 50 characters');
	}

	if (description.length > 500) {
		return error(400, 'Description must be less than 500 characters');
	}

	const courses = await db.insert(course).values({
		userId: parseInt(user.userId),
		name,
		description,
		dateOfStart,
		color,
		emoji,
		instructor
	});

	return json({ courses });
};
