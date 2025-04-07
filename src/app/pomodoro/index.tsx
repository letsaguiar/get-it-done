import { CompleteIconButton } from "@/components/buttons/CompleteIconButton";
import { DefaultCard } from "@/components/cards/DefaultCard";
import Pomodoro, { PomodoroStage } from "@/components/pomodoro/Pomodoro";
import SelectableTaskInput from "@/components/task-input/SelectableTaskInput";
import { useActiveTasks } from "@/hooks/useActiveTasks";
import { useWorkingTask } from "@/hooks/useWorkingTask";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PomodoroView() {
	const { t } = useTranslation('pomodoro-view');
	const {
		tasks,
		removeTask
	} = useActiveTasks();
	const {
		workingTask,
		setWorkingTask,
		incrementWorkedTime,
		completeTask
	} = useWorkingTask();

	useEffect(() => {
		if (!tasks.find(task => task.id === workingTask.id)) {
			setWorkingTask(tasks[0].id);
		}
	}, [tasks]);

	return <>
		<DefaultCard className="mb-3">
			<DefaultCard.Content>
				<div className="flex flex-row justify-between items-end gap-2">
					<SelectableTaskInput
						label={t('active_task_label')}
						tasks={tasks}
						value={workingTask.id}
						onValueChange={onSelect}
					/>
					<CompleteIconButton
						onClick={onComplete}
					/>
				</div>
			</DefaultCard.Content>
		</DefaultCard>
		<DefaultCard>
			<DefaultCard.Content>
				<Pomodoro
					onTick={onTick}
				/>
			</DefaultCard.Content>
		</DefaultCard>
	</>

	function onSelect(id: string) {
		setWorkingTask(id);
	}

	function onComplete() {
		completeTask();
		removeTask(workingTask.id);
	}

	function onTick(stage: PomodoroStage) {
		if (stage === PomodoroStage.POMODORO && workingTask)
			incrementWorkedTime();
	}
}