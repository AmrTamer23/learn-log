import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	if (!email || !password) {
		return error(400, 'Missing required fields');
	}

	const users = await db.select().from(user).where(eq(user.email, email));
	const userData = users[0];

	if (!userData) {
		return error(401, 'Invalid credentials');
	}

	const isValidPassword = await bcrypt.compare(password, userData.password);
	if (!isValidPassword) {
		return error(401, 'Invalid credentials');
	}

	const token = jwt.sign(
		{ userId: userData.id, email: userData.email },
		process.env.JWT_SECRET ?? 'your-secret-key',
		{ expiresIn: '24h' }
	);

	cookies.set('auth_token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24
	});

	const { password: _, ...userWithoutPassword } = userData;
	return json({
		user: userWithoutPassword
	});
};
