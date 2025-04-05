import Pomodoro from "@/components/pomodoro/Pomodoro";
import SelectableTaskInput from "@/components/task-input/SelectableTaskInput";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function PomodoroView() {
	const { t } = useTranslation('pomodoro-view');

	return <>
		<div className="flex flex-col gap-3 w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
			<Card>
				<CardContent>
					<SelectableTaskInput label={t('active_task_label')} tasks={[]} />
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					<Pomodoro />
				</CardContent>
			</Card>
		</div>
	</>
}