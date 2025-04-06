import { DefaultCard } from "@/components/cards/DefaultCard";
import TaskInputBox from "@/components/task-input/TaskInputBox";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/stores/task.store";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { v4 } from "uuid";

function AnimatedTaskInput({ tasks, onTaskChange, onTaskDelete }: {
	tasks: Array<string>,
	onTaskChange: (task: string, index: number) => void;
	onTaskDelete: (index: number) => void;
}) {
	return <>
		<div className="flex flex-col align-middle justify-center gap-2.5">
			{[...tasks, ""].map((task, index) => (
				<
					TaskInputBox
					value={task}
					onValueChange={e => onTaskChange(e.target.value, index)}
					placeholder="A descriptive task name..."
					deleteButton
					deleteButtonDisabled={index >= tasks.length}
					onDelete={() => onTaskDelete(index)}
					key={index}
				/>
			))}
		</div>
	</>
}

export default function ListingView() {
	const { t } = useTranslation('listing-view');
	const [tasks, setTasks] = React.useState<Array<string>>([]);
	const taskStore = useTaskStore();
	const navigate = useNavigate();

	return <>
		<DefaultCard title={t('title')} description={t('subtitle')}>
			<DefaultCard.Content>
				<AnimatedTaskInput
					tasks={tasks}
					onTaskChange={onTaskChange}
					onTaskDelete={onTaskDelete}
				/>
			</DefaultCard.Content>
			<DefaultCard.Footer>
				<div className="w-full flex flex-row align-middle justify-end">
					<Button
						onClick={next}
					>
						<span>Next</span>
					</Button>
				</div>
			</DefaultCard.Footer>
		</DefaultCard>
	</>

	function onTaskChange(task: string, index: number) {
		if (index == tasks.length)
			setTasks([...tasks, task]);
		else if (task === "")
			onTaskDelete(index);
		else {
			const copy = [...tasks];
			copy[index] = task;
			setTasks(copy);
		}
	}

	function onTaskDelete(index: number) {
		if (index == tasks.length)
			return;
		else {
			const copy = [...tasks];
			copy.splice(index, 1);
			setTasks(copy);
		}
	}

	function next() {
		for (const task of tasks) {
			taskStore.add({
				id: v4(),
				name: task,
				priority: 0,
				completed: false,
				workedTimeSeconds: 0,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});
		}

		navigate('/prioritizing')
	}
}