import { ITaskModel } from "@/models/task.model";
import { useTaskStore } from "@/stores/task.store";
import React from "react";
import { useActiveTasks } from "./useActiveTasks";

export function useWorkingTask() {
	const {
		findOne: findOneOnStore,
		update: updateOnStore,
	} = useTaskStore();
	const {
		tasks: activeTasks,
	} = useActiveTasks();

	const [workingTask, _setWorkingTask] = React.useState<ITaskModel>(activeTasks[0]);

	const setWorkingTask = (id: string) =>
		_setWorkingTask(findOneOnStore(id));
	const incrementWorkedTime = () =>
		_setWorkingTask((prev) => {
			const updated = { ...prev, workedTimeSeconds: prev.workedTimeSeconds + 1 };
			updateOnStore(updated.id, updated);
			return updated;
		});
	const completeTask = () => {
		updateOnStore(workingTask.id, { ...workingTask, completed: true, priority: -1 });
	};

	return { workingTask, setWorkingTask, incrementWorkedTime, completeTask };
}