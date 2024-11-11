import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const User = sqliteTable('User', {
	id: integer('id')
		.primaryKey({
			autoIncrement: true
		})
		.notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	dob: text('dob')
});

export const Course = sqliteTable('Course', {
	id: integer('id')
		.primaryKey({
			autoIncrement: true
		})
		.notNull(),
	name: text('name').notNull(),
	desc: text('desc'),
	dof: text('dof'),
	color: text('color'),
	emoji: text('emoji'),
	progress: integer('progress')
});

export const Task = sqliteTable('Task', {
	id: integer('id')
		.primaryKey({
			autoIncrement: true
		})
		.notNull(),
	title: text('title').notNull(),
	desc: text('desc'),
	isDone: integer('isDone', {
		mode: 'boolean'
	}),
	userId: integer('userId')
		.references(() => User.id)
		.notNull(),
	courseId: integer('courseId')
		.references(() => Course.id)
		.notNull(),
	dueDate: text('dueDate')
});
