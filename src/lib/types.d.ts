import type { InferSelectModel } from 'drizzle-orm';
import { User, Course, Task } from '$lib/server/db/schema';

type UserType = InferSelectModel<typeof User>;
type CourseType = InferSelectModel<typeof Course>;
type TaskType = InferSelectModel<typeof Task>;
