import { ITaskModel } from "@/models/task.model";
import { useTaskStore } from "@/stores/task.store";
import { arrayMove } from "@dnd-kit/sortable";
import React from "react";

export function useActiveTasks() {
	const taskStore = useTaskStore();
	const activeTasks = taskStore.data
		.filter(task => task.priority >= 0)
		.sort((a, b) => a.priority - b.priority);

	const [tasks, setTasks] = React.useState(activeTasks);

	const moveTask = (oldIndex: number, newIndex: number) => {
		setTasks((tasks) => {
			return arrayMove(tasks, oldIndex, newIndex);
		});
	}
	const findTask = (id: string) => {
		return tasks.find(task => task.id === id);
	}
	const updateTask = (id: string, model: Partial<ITaskModel>) => {
		setTasks((tasks) => tasks.map(task =>
			task.id === id ? { ...task, ...model } : task
		));
		taskStore.update(id, model);
	}
	const removeTask = (id: string) => {
		setTasks((tasks) => tasks.filter(task => task.id !== id));
	}

	return { tasks, findTask, updateTask, removeTask, moveTask };
}