import { createTaskModel, ITaskModel } from "@/models/task.model";
import { useTaskStore } from "@/stores/task.store";
import React from "react";

export function useEmptyTaskList() {
	const taskStore = useTaskStore();
	const [tasks, setTasks] = React.useState<Array<ITaskModel>>([]);
	
	const addTask = (name: string) => setTasks((tasks) => ([...tasks, createTaskModel({ name })]));
	const removeTask = (id: string) => setTasks((tasks) => tasks.filter(task => task.id !== id));
	const updateTask = (id: string, name: string) => setTasks((tasks) =>
		tasks.map(task => task.id === id ? { ...task, name } : task)
	);
	const saveTasks = () => {
		for (const task of tasks) {
			taskStore.add(task);
		}
	}
	
	return { tasks, addTask, removeTask, updateTask, saveTasks };
}