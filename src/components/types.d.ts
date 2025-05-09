export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	category: Categories;
    color:string;
    description:string;
}

export type ListOfTodos = Todo[];

export interface Category{
	name:string;
	color:string;
}

export type ListOfCategories = Category[];
