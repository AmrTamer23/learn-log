import { db } from './index';
import { User, Course, Task } from './schema';

async function seed() {
	// Create users
	const users = await db
		.insert(User)
		.values([
			{
				name: 'John Doe',
				email: 'john@example.com',
				password: 'hashed_password_1', // In production, ensure passwords are properly hashed
				dob: '1990-01-01'
			},
			{
				name: 'Jane Smith',
				email: 'jane@example.com',
				password: 'hashed_password_2',
				dob: '1992-05-15'
			}
		])
		.returning();

	// Create courses
	const courses = await db
		.insert(Course)
		.values([
			{
				name: 'JavaScript Basics',
				desc: 'Learn the fundamentals of JavaScript',
				dof: '2024-01-01',
				color: '#FFD700',
				emoji: '📚',
				progress: 0,
				instructor: 'Dr. JavaScript',
				archived: false
			},
			{
				name: 'Web Development',
				desc: 'Full-stack web development course',
				dof: '2024-02-01',
				color: '#4169E1',
				emoji: '💻',
				progress: 30,
				instructor: 'Prof. WebDev',
				archived: false
			},
			{
				name: 'Legacy Course',
				desc: 'Old course content',
				dof: '2023-01-01',
				color: '#808080',
				emoji: '📦',
				progress: 100,
				instructor: 'Prof. Legacy',
				archived: true
			}
		])
		.returning();

	// Create tasks
	await db.insert(Task).values([
		{
			title: 'Complete JavaScript Variables',
			desc: 'Learn about var, let, and const',
			isDone: false,
			userId: users[0].id,
			courseId: courses[0].id,
			dueDate: '2024-03-15'
		},
		{
			title: 'Build a Todo App',
			desc: 'Create a simple todo application',
			isDone: true,
			userId: users[0].id,
			courseId: courses[1].id,
			dueDate: '2024-03-20'
		},
		{
			title: 'Study Functions',
			desc: 'Learn about JavaScript functions',
			isDone: false,
			userId: users[1].id,
			courseId: courses[0].id,
			dueDate: '2024-03-25'
		}
	]);

	console.log('Database seeded successfully!');
}

// Execute the seed function
seed().catch((error) => {
	console.error('Error seeding database:', error);
	process.exit(1);
});
