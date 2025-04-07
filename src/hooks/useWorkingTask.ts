import { ITaskModel } from "@/models/task.model";
import React from "react";
import { useActiveTasks } from "./useActiveTasks";
import { useTaskStore } from "@/stores/task.store";

export function useWorkingTask() {
	const {
		findOne,
		update,
	} = useTaskStore();
	const {
		tasks,
	} = useActiveTasks();

	const [workingTask, _setWorkingTask] = React.useState<ITaskModel>(tasks[0]);

	const setWorkingTask = (id: string) =>
		_setWorkingTask(findOne(id));
	const incrementWorkedTime = () =>
		_setWorkingTask((prev) => {
			const updated = { ...prev, workedTimeSeconds: prev.workedTimeSeconds + 1 };
			update(updated.id, updated);
			return updated;
		});

	return { workingTask, setWorkingTask, incrementWorkedTime };
}