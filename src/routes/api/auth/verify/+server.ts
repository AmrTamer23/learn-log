import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import jwt from 'jsonwebtoken';

export const GET: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('auth_token');

	if (!token) {
		return error(401, 'No token provided');
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'your-secret-key');
		return json({ user: decoded });
	} catch (err) {
		return error(401, 'Invalid token');
	}
};
