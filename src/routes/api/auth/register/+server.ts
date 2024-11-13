import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const POST: RequestHandler = async ({ request }) => {
	const { name, email, password, dob } = await request.json();

	if (!name || !email || !password || !dob) {
		return error(400, 'Missing required fields');
	}

	const existingUser = await db.select().from(user).where(eq(user.email, email));
	if (existingUser.length > 0) {
		return error(400, 'User with this email already exists');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const users = await db
		.insert(user)
		.values({
			name,
			email,
			password: hashedPassword,
			dateOfBirth: dob
		})
		.returning();

	const userData = users[0];

	const { password: _, ...userWithoutPassword } = userData;
	return json({ user: userWithoutPassword });
};
