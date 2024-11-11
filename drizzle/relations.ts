import { relations } from "drizzle-orm/relations";
import { user, course, task } from "./schema";

export const courseRelations = relations(course, ({one, many}) => ({
	user: one(user, {
		fields: [course.userId],
		references: [user.id]
	}),
	tasks: many(task),
}));

export const userRelations = relations(user, ({many}) => ({
	courses: many(course),
	tasks: many(task),
}));

export const taskRelations = relations(task, ({one}) => ({
	course: one(course, {
		fields: [task.courseId],
		references: [course.id]
	}),
	user: one(user, {
		fields: [task.userId],
		references: [user.id]
	}),
}));