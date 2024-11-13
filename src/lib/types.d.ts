export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	dateOfBirth?: string;
}

export interface Course {
	id: number;
	name: string;
	description?: string;
	dateOfStart?: string;
	color?: string;
	emoji?: string;
	instructor?: string;
	progress: number;
	archived: boolean;
	userId: number;
}

export interface Task {
	id: number;
	title: string;
	description?: string;
	isDone: boolean;
	userId: number;
	courseId: number;
	dueDate?: string;
}
