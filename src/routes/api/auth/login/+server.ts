import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { User } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	if (!email || !password) {
		return error(400, 'Missing required fields');
	}

	// Find user by email
	const users = await db.select().from(User).where(eq(User.email, email));
	const user = users[0];

	if (!user) {
		return error(401, 'Invalid credentials');
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		return error(401, 'Invalid credentials');
	}

	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		process.env.JWT_SECRET ?? 'your-secret-key',
		{ expiresIn: '24h' }
	);

	const { password: _, ...userWithoutPassword } = user;
	return json({
		user: userWithoutPassword,
		token
	});
};
