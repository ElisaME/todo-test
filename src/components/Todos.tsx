import { useEffect, useState } from 'react';
import type { ListOfTodos, Todo } from './types';
import NewTask from './NewTask';

interface Props {
	isOpen: boolean;
	closeModal: () => void;
}
export const Todos = ({ isOpen, closeModal }: Props) => {
	const [tasksData, setTasksData] = useState<ListOfTodos>([]);
	const [filteredData, setFilteredData] = useState<ListOfTodos>([]);
	const [status, setStatus] = useState(false);
	//Paginación:
	const [currentPage, setCurrentPage] = useState(1);
	const tasksPerPage = 6;
	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const currentTasks = filteredData.slice(indexOfFirstTask, indexOfLastTask);

	useEffect(() => {
		const todos = localStorage.getItem('todos');
		const parsedTodos = todos ? JSON.parse(todos) : [];
		setTasksData(parsedTodos);
	}, []);

	useEffect(() => {
		const filteredData = tasksData.filter(
			(task: Todo) => task.completed === status
		);
		setFilteredData(filteredData);
	}, [status, tasksData]);

	const finishTask = (taskId: string) => {
		const updatedTasks = tasksData.map((task) =>
			task.id === taskId ? { ...task, completed: true } : task
		);
		setTasksData(updatedTasks);
		localStorage.setItem('todos', JSON.stringify(updatedTasks));
	};

	const removeTask = (taskId: string) => {
		const updatedTasks = tasksData.filter((task) => task.id !== taskId);
		setTasksData(updatedTasks);
		localStorage.setItem('todos', JSON.stringify(updatedTasks));
	};

	const addTask = (task: Todo) => {
		const updatedTasks = [...tasksData, task];
		setTasksData(updatedTasks);
		localStorage.setItem('todos', JSON.stringify(updatedTasks));
		closeModal();
	};

	const getCategoryColor = (category: string) => {
		switch (category?.toLowerCase()) {
			case 'trabajo':
				return '#fb2c36';
			case 'estudio':
				return '#0080ff';
			case 'casa':
				return '#b34cff';
			case 'familia':
				return '#00c75b';
			case 'diversión':
				return '#f6b100';
			default:
				return '#d1d5db';
		}
	};

	return (
		<div>
			<div className="flex justify-center">
				<div
					className={`rounded-l-md w-1/3 text-center text-sm p-1 cursor-pointer`}
					style={{
						backgroundColor: !status ? '#c0c0c0' : '#e4e4e4',
					}}
					onClick={() => setStatus(false)}
				>
					Tareas Pendientes
				</div>
				<div
					className={`rounded-r-md w-1/3 text-center text-sm p-1 cursor-pointer`}
					style={{
						backgroundColor: status ? '#c0c0c0' : '#e4e4e4',
					}}
					onClick={() => setStatus(true)}
				>
					Tareas Finalizadas
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 my-4 p-6 h-[500px] grid-rows-3">
				{currentTasks &&
					currentTasks.map((todo) => (
						<div
							key={todo.id}
							className="rounded-lg py-2 px-4 border-2 h-full flex flex-col justify-between"
							style={{ borderColor: todo.color }}
						>
							<div>
								<div className="flex justify-between">
									<p className="font-medium text-xl">{todo.title}</p>
									<img
										onClick={() => removeTask(todo.id)}
										src="/delete.svg"
										className="w-4 h-4 cursor-pointer"
									/>
								</div>
								<p>{todo.description}</p>
							</div>
							<div className="my-2 flex justify-between items-center">
								<div
									className="w-4 h-4 rounded-full"
									style={{ backgroundColor: getCategoryColor(todo.category) }}
								></div>
								{!todo.completed && (
									<button
										className="bg-green-500 py-1 px-2 text-white cursor-pointer rounded-md"
										onClick={() => finishTask(todo.id)}
									>
										Finalizar tarea
									</button>
								)}
							</div>
						</div>
					))}
			</div>
			<div className="flex justify-center items-center gap-2 my-4">
				<button
					className="bg-gray-300 rounded-lg px-2 py-1 disabled:opacity-50 cursor-pointer"
					onClick={() => setCurrentPage((prev) => prev - 1)}
					disabled={currentPage === 1}
				>
					Anterior
				</button>
				<span className="px-2">
					Página {currentPage} de{' '}
					{Math.ceil(filteredData.length / tasksPerPage)}
				</span>
				<button
					className="bg-gray-300 rounded-lg px-2 py-1 disabled:opacity-50 cursor-pointer"
					onClick={() => setCurrentPage((prev) => prev + 1)}
					disabled={indexOfLastTask >= filteredData.length}
				>
					Siguiente
				</button>
			</div>
			{isOpen && <NewTask add={addTask} closeModal={closeModal} />}
		</div>
	);
};
