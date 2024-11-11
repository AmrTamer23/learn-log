import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const course = sqliteTable("course", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	description: text(),
	dateOfStart: text(),
	color: text(),
	emoji: text(),
	progress: integer().default(0),
	archived: integer().default(false),
	userId: integer().notNull().references(() => user.id),
	instructor: text().default(""),
});

export const task = sqliteTable("task", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	title: text().notNull(),
	description: text(),
	isDone: integer().default(false),
	userId: integer().notNull().references(() => user.id),
	courseId: integer().notNull().references(() => course.id),
	dueDate: text(),
});

export const user = sqliteTable("user", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	dateOfBirth: text(),
});

