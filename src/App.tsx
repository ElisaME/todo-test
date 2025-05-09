import { useEffect, useState, type JSX } from 'react';
import { Todos } from './components/Todos';
import NewCategory from './components/AddCategory';
import { mockCategories, mockToDos } from './mockData';
import type { Category } from './components/types';

const App = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalCategory, setModalCategory] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(mockToDos));
		localStorage.setItem('categories', JSON.stringify(mockCategories));
		const stored = localStorage.getItem('categories');
		const parsed = stored ? JSON.parse(stored) : [];
		setCategories(parsed);
	}, []);

	const refreshCategories = () => {
		const stored = localStorage.getItem('categories');
		const parsed = stored ? JSON.parse(stored) : [];
		setCategories(parsed);
	};

	return (
		<div className="w-10/12 p-6 m-auto">
			<div className="flex justify-between items-center h-20">
				<h1 className="text-3xl font-medium">Mis tareas</h1>
				<button
					className="bg-blue-800 text-white px-4 py-1 rounded-lg cursor-pointer"
					onClick={() => setIsOpen(true)}
				>
					Agregar tarea
				</button>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-3">
					<div className="bg-gray-300/80 p-4 h-full rounded-sm">
						<h2 className="text-xl">Categorías</h2>
						<ul className="m-4 flex flex-col gap-1">
							{categories.map((category, i) => (
								<li key={i} className="flex items-center">
									<div
										className="w-4 h-4 rounded-full mr-2"
										style={{ backgroundColor: category.color }}
									></div>
									<p>{category.name.toLocaleUpperCase()}</p>
								</li>
							))}
						</ul>
						<button
							className="bg-blue-800 text-white px-4 py-1 rounded-lg cursor-pointer"
							onClick={() => setModalCategory(true)}
						>
							Agregar categoría
						</button>
					</div>
				</div>
				<div className="col-span-9">
					<Todos
						isOpen={isOpen}
						closeModal={() => setIsOpen(false)}
						categories={categories}
					/>
				</div>
				{modalCategory && (
					<NewCategory
						closeModal={() => setModalCategory(false)}
						refreshCategories={refreshCategories}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
