import { DefaultCard } from "@/components/cards/DefaultCard";
import Pomodoro, { PomodoroStage } from "@/components/pomodoro/Pomodoro";
import SelectableTaskInput from "@/components/task-input/SelectableTaskInput";
import { useTaskStore } from "@/stores/task.store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PomodoroView() {
	const { t } = useTranslation('pomodoro-view');

	const taskStore = useTaskStore();

	const [activeTask, setActiveTask] = useState<string>(taskStore.data[0]?.id);

	return <>
		<DefaultCard className="mb-3">
			<DefaultCard.Content>
				<SelectableTaskInput
					label={t('active_task_label')}
					tasks={taskStore.data}
					onSelect={onSelect}
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
		setActiveTask(id);
	}

	function onTick(stage: PomodoroStage) {
		if (stage === PomodoroStage.POMODORO && activeTask) {
			const task = taskStore.findOne(activeTask);
			if (!task)
				return;

			taskStore.update(task.id, { workedTimeSeconds: task.workedTimeSeconds + 1 });
		}
	}
}