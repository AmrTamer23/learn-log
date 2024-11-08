CREATE TABLE `Course` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`desc` text,
	`dof` text,
	`color` text,
	`emoji` text,
	`progress` integer
);
--> statement-breakpoint
CREATE TABLE `Task` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`desc` text,
	`isDone` integer
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`dob` text
);
