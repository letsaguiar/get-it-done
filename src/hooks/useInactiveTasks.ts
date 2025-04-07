import { useTaskStore } from "@/stores/task.store";
import dayjs from "dayjs";

export function useInactiveTasks() {
	const taskStore = useTaskStore();

	const inactivateTask = (id: string) => {
		taskStore.update(id, { priority: -1 });
	}
	const inactivateTaskByDate = (date: Date) => {
		const tasks = taskStore.data
			.filter(task => (
				task.priority > 0 && dayjs(date).isAfter(dayjs(task.updatedAt), 'day')
			));

		for (const task of tasks)
			inactivateTask(task.id);
	}

	return {
		inactivateTask,
		inactivateTaskByDate,
	}
}