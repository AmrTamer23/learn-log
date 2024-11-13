ALTER TABLE `Task` ADD `userId` integer NOT NULL REFERENCES User(id);--> statement-breakpoint
ALTER TABLE `Task` ADD `courseId` integer NOT NULL REFERENCES Course(id);--> statement-breakpoint
ALTER TABLE `Task` ADD `dueDate` text;