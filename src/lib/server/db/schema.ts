import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	dateOfBirth: text('dateOfBirth')
});

export const course = sqliteTable('course', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	name: text('name').notNull(),
	description: text('description'),
	dateOfStart: text('dateOfStart'),
	color: text('color'),
	emoji: text('emoji'),
	progress: integer('progress').default(0),
	archived: integer('archived', { mode: 'boolean' }).default(false),
	userId: integer('userId')
		.references(() => user.id)
		.notNull()
});

export const task = sqliteTable('task', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	title: text('title').notNull(),
	description: text('description'),
	isDone: integer('isDone', { mode: 'boolean' }).default(false),
	userId: integer('userId')
		.references(() => user.id)
		.notNull(),
	courseId: integer('courseId')
		.references(() => course.id)
		.notNull(),
	dueDate: text('dueDate')
});
