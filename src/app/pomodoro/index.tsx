import { DefaultCard } from "@/components/cards/DefaultCard";
import Pomodoro, { PomodoroStage } from "@/components/pomodoro/Pomodoro";
import SelectableTaskInput from "@/components/task-input/SelectableTaskInput";
import { useActiveTasks } from "@/hooks/useActiveTasks";
import { useWorkingTask } from "@/hooks/useWorkingTask";
import { useTranslation } from "react-i18next";

export default function PomodoroView() {
	const { t } = useTranslation('pomodoro-view');
	const {
		tasks
	} = useActiveTasks();
	const {
		workingTask,
		setWorkingTask,
		incrementWorkedTime
	} = useWorkingTask();


	return <>
		<DefaultCard className="mb-3">
			<DefaultCard.Content>
				<SelectableTaskInput
					label={t('active_task_label')}
					tasks={tasks}
					defaultValue={workingTask.id}
					onValueChange={onSelect}
				/>
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

	function onTick(stage: PomodoroStage) {
		if (stage === PomodoroStage.POMODORO && workingTask)
			incrementWorkedTime();
	}
}