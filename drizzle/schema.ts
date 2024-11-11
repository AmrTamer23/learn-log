import { sqliteTable, AnySQLiteColumn, integer, text, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const course = sqliteTable("Course", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	desc: text(),
	dof: text(),
	color: text(),
	emoji: text(),
	progress: integer(),
	instructor: text(),
	archived: integer(),
});

export const task = sqliteTable("Task", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	title: text().notNull(),
	desc: text(),
	isDone: integer(),
	userId: integer().notNull().references(() => user.id),
	courseId: integer().notNull().references(() => course.id),
	dueDate: text(),
});

export const user = sqliteTable("User", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	dob: text(),
});

