import { db } from './index';
import { user, course, task } from './schema';

async function seed() {
	const users = await db
		.insert(user)
		.values([
			{
				name: 'John Doe',
				email: 'john@example.com',
				password: 'hashed_password_1',
				dateOfBirth: '1990-01-01'
			},
			{
				name: 'Jane Smith',
				email: 'jane@example.com',
				password: 'hashed_password_2',
				dateOfBirth: '1992-05-15'
			}
		])
		.returning();

	const courses = await db
		.insert(course)
		.values([
			{
				name: 'JavaScript Basics',
				description: 'Learn the fundamentals of JavaScript',
				dateOfStart: '2024-01-01',
				color: '#FFD700',
				emoji: '📚',
				progress: 0,
				archived: false,
				userId: users[0].id
			},
			{
				name: 'Web Development',
				description: 'Full-stack web development course',
				dateOfStart: '2024-02-01',
				color: '#4169E1',
				emoji: '💻',
				progress: 30,
				archived: false,
				userId: users[0].id
			},
			{
				name: 'Legacy Course',
				description: 'Old course content',
				dateOfStart: '2023-01-01',
				color: '#808080',
				emoji: '📦',
				progress: 100,
				archived: true,
				userId: users[0].id
			}
		])
		.returning();

	await db.insert(task).values([
		{
			title: 'Complete JavaScript Variables',
			description: 'Learn about var, let, and const',
			isDone: false,
			userId: users[0].id,
			courseId: courses[0].id,
			dueDate: '2024-03-15'
		},
		{
			title: 'Build a Todo App',
			description: 'Create a simple todo application',
			isDone: true,
			userId: users[0].id,
			courseId: courses[1].id,
			dueDate: '2024-03-20'
		},
		{
			title: 'Study Functions',
			description: 'Learn about JavaScript functions',
			isDone: false,
			userId: users[1].id,
			courseId: courses[0].id,
			dueDate: '2024-03-25'
		}
	]);

	console.log('Database seeded successfully!');
}

seed().catch((error) => {
	console.error('Error seeding database:', error);
	process.exit(1);
});
