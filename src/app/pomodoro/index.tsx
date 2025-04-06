import Pomodoro, { PomodoroStage } from "@/components/pomodoro/Pomodoro";
import SelectableTaskInput from "@/components/task-input/SelectableTaskInput";
import { Card, CardContent } from "@/components/ui/card";
import { useTaskStore } from "@/stores/task.store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PomodoroView() {
	const { t } = useTranslation('pomodoro-view');

	const taskStore = useTaskStore();

	const [activeTask, setActiveTask] = useState<string>(taskStore.data[0]?.id);

	return <>
		<div className="flex flex-col gap-3 w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
			<Card>
				<CardContent>
					<
						SelectableTaskInput
						label={t('active_task_label')}
						tasks={taskStore.data}
						onSelect={onSelect}
					/>
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					<Pomodoro onTick={onTick} />
				</CardContent>
			</Card>
		</div>
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