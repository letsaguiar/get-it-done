import { v4 } from 'uuid';
import { z } from 'zod';
import { create } from 'zustand';

const Store = 'Task'

const TaskModel = z.object({
	uuid: z.string(),
	name: z.string(),
})
type Task = z.infer<typeof TaskModel>

type State = {
	tasks: Task[];
}

type Actions = {
	addOne: (task: Omit<Task, 'uuid'>) => void;
	commit: () => void;
}

export const useTaskStore = create<State & Actions>((set, get) => ({
	tasks: [],
	addOne(data) {
		const task: Task = { uuid: v4(), ...data };
		set(state => ({ tasks: [...state.tasks, task] }));
		get().commit();
	},
	commit: () => {
		const data: State = {
			tasks: get().tasks
		};

		localStorage.setItem(Store, JSON.stringify(data));
	},
	...JSON.parse(localStorage.getItem(Store) || '{}')
}))