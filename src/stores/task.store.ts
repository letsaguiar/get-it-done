import { v4 } from 'uuid';
import { z } from 'zod';
import { create } from 'zustand';

const Store = 'Task'

export const TaskModel = z.object({
	uuid: z.string(),
	name: z.string(),
	priority: z.optional(z.number()),
})
export type Task = z.infer<typeof TaskModel>

type State = {
	tasks: Task[];
}

type Actions = {
	addOne: (task: Omit<Task, 'uuid'>) => void;
	addMany: (tasks: Omit<Task, 'uuid'>[]) => void;
	update: (uuid: string, partial: Partial<Omit<Task, 'uuid'>>) => void;
	commit: () => void;
}

export const useTaskStore = create<State & Actions>((set, get) => ({
	tasks: [],
	addOne(data) {
		const task: Task = { uuid: v4(), ...data };
		set(state => ({ tasks: [...state.tasks, task] }));
		get().commit();
	},
	addMany(data) {
		const tasks: Task[] = data.map(task => ({ uuid: v4(), ...task }));
		set(state => ({ tasks: [...state.tasks, ...tasks] }))
		get().commit();
	},
	update(uuid, partial) {
		const index = get().tasks.findIndex(t => t.uuid == uuid);
		const task = { ...get().tasks[index], ...partial };
		set(state => {
			const tasks = state.tasks;
			tasks[index] = task;

			return { tasks };
		});
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