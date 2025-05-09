import { useState, type ChangeEvent } from 'react';
import { type Todo } from './types';

interface Props {
	add: (task: Todo) => void;
	closeModal: () => void;
}

const NewTask = ({ add, closeModal }: Props) => {
	const usedColors = new Set<string>();
	const [errors, setErrors] = useState<{
		title?: boolean;
		category?: boolean;
		description?: boolean;
	}>({});

	const getReadableColor = () => {
		const randomChannel = () => Math.floor(Math.random() * (200 - 60) + 60);
		const r = randomChannel();
		const g = randomChannel();
		const b = randomChannel();
		return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
	};

	const getUniqueReadableColor = () => {
		let color;
		do {
			color = getReadableColor();
		} while (usedColors.has(color));

		usedColors.add(color);
		return color;
	};

	const [task, setTask] = useState<Todo>({
		id: crypto.randomUUID(),
		color: getUniqueReadableColor(),
		completed: false,
		category: '',
	} as Todo);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setErrors((prevState) => ({
			...prevState,
			[name]: false,
		}));
		const { name, value } = e.target;
		setTask((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const validate = () => {
		const newErrors = {
			title: !task.title?.trim(),
			category: !task.category,
			description: !task.description?.trim(),
		};
		setErrors(newErrors);
		return !Object.values(newErrors).some(Boolean); // true si no hay errores
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
			<div className="bg-white rounded-lg p-6 w-1/3 h-1/2 flex flex-col gap-4">
				<h1 className="font-medium text-xl text-center">Agregar tarea</h1>
				<input
					type="text"
					className={`py-1 px-2 border-2 ${
						errors.title ? 'border-red-500' : 'border-gray-200'
					} w-full`}
					placeholder="Nombre de tarea"
					onChange={(e) => handleChange(e)}
					name="title"
				/>
				<div>
					<label>Selecciona categoría</label>
					<select
						name="category"
						className={`py-1 px-2 border-2 ${
							errors.category ? 'border-red-500' : 'border-gray-200'
						} w-full`}
						onChange={(e) => handleChange(e)}
					>
						<option value={''}>Selecciona una opción</option>
						<option value={'trabajo'}>Trabajo</option>
						<option value={'estudio'}>Estudio</option>
						<option value={'casa'}>Casa</option>
						<option value={'familia'}>Familia</option>
						<option value={'diversión'}>Diversión</option>
					</select>
				</div>
				<textarea
					name="description"
					className={`py-1 px-2 border-2 ${
						errors.description ? 'border-red-500' : 'border-gray-200'
					} w-full`}
					onChange={(e) => handleChange(e)}
					placeholder="Descripción"
				/>
				<div className="flex justify-center items-center gap-3">
					<button
						className="bg-gray-500 text-white px-2 py-1 rounded-lg cursor-pointer"
						onClick={closeModal}
					>
						Cancelar
					</button>
					<button
						className="bg-blue-700 text-white px-2 py-1 rounded-lg cursor-pointer"
						onClick={() => {
							if (validate()) {
								add(task);
							}
						}}
					>
						Guardar
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewTask;
