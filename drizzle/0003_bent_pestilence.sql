ALTER TABLE `Course` RENAME TO `course`;--> statement-breakpoint
ALTER TABLE `Task` RENAME TO `task`;--> statement-breakpoint
ALTER TABLE `User` RENAME TO `user`;--> statement-breakpoint
ALTER TABLE `course` RENAME COLUMN "desc" TO "description";--> statement-breakpoint
ALTER TABLE `course` RENAME COLUMN "dof" TO "dateOfStart";--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN "dob" TO "dateOfBirth";--> statement-breakpoint
ALTER TABLE `course` ALTER COLUMN "progress" TO "progress" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `course` ALTER COLUMN "archived" TO "archived" integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `course` ADD `userId` integer NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `course` DROP COLUMN `instructor`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_task` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`isDone` integer DEFAULT false,
	`userId` integer NOT NULL,
	`courseId` integer NOT NULL,
	`dueDate` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_task`("id", "title", "description", "isDone", "userId", "courseId", "dueDate") SELECT "id", "title", "description", "isDone", "userId", "courseId", "dueDate" FROM `task`;--> statement-breakpoint
DROP TABLE `task`;--> statement-breakpoint
ALTER TABLE `__new_task` RENAME TO `task`;--> statement-breakpoint
PRAGMA foreign_keys=ON;