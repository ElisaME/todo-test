import { useEffect, useState, type ChangeEvent } from 'react';
import { type Category, type ListOfCategories } from './types';

interface Props {
	closeModal: () => void;
	refreshCategories: () => void;
}

const NewCategory = ({ closeModal, refreshCategories }: Props) => {
	const [categoriesData, setCategoriesData] = useState<ListOfCategories>([]);
	const [errors, setErrors] = useState<{
		name?: boolean;
		color?: boolean;
	}>({});
	const [category, setCategory] = useState<Category>({} as Category);

	useEffect(() => {
		const categories = localStorage.getItem('categories');
		const parsedCategories = categories ? JSON.parse(categories) : [];
		setCategoriesData(parsedCategories);
	}, []);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setErrors((prevState) => ({
			...prevState,
			[name]: false,
		}));
		const { name, value } = e.target;
		setCategory((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const validate = () => {
		const newErrors = {
			name: !category.name?.trim(),
			color: !category.color,
		};
		setErrors(newErrors);
		return !Object.values(newErrors).some(Boolean);
	};

	const addCategory = () => {
		const updatedCategories = [...categoriesData, category];
		setCategoriesData(updatedCategories);
		localStorage.setItem('categories', JSON.stringify(updatedCategories));
		closeModal();
		refreshCategories();
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
			<div className="bg-white rounded-lg p-6 w-1/3 h-[250px] flex flex-col gap-4">
				<h1 className="font-medium text-xl text-center">Agregar categoría</h1>
				<input
					type="text"
					className={`py-1 px-2 border-2 ${
						errors.name ? 'border-red-500' : 'border-gray-200'
					} w-full`}
					placeholder="Nombre de categoría"
					onChange={(e) => handleChange(e)}
					name="name"
				/>
				<input
					type="color"
					name="color"
					value={category.color}
					onChange={handleChange}
					className={`py-1 px-2 border-2 ${
						errors.name ? 'border-red-500' : 'border-gray-200'
					} h-10 w-20`}
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
								addCategory();
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

export default NewCategory;
