import { relations } from "drizzle-orm/relations";
import { course, task, user } from "./schema";

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

export const courseRelations = relations(course, ({many}) => ({
	tasks: many(task),
}));

export const userRelations = relations(user, ({many}) => ({
	tasks: many(task),
}));