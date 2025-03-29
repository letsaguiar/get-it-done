import TaskInput from "@/components/task-input/TaskInput";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTaskStore } from "@/stores/task.store";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function AnimatedTaskInput({ tasks, onTaskChange, onTaskDelete }: {
	tasks: Array<string>,
	onTaskChange: (task: string, index: number) => void;
	onTaskDelete: (index: number) => void;
}) {
	return <>
		<div className="flex flex-col align-middle justify-center gap-2.5">
			{[...tasks, ""].map((task, index) => (
				<
					TaskInput
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
	const commitNewTask = useTaskStore(state => state.addOne);
	const navigate = useNavigate();

	return <>
		<Card className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
			<CardHeader>
				<CardTitle>{t('title')}</CardTitle>
				<CardDescription>{t('subtitle')}</CardDescription>
			</CardHeader>
			<CardContent>
				<
					AnimatedTaskInput
					tasks={tasks}
					onTaskChange={onTaskChange}
					onTaskDelete={onTaskDelete}
				/>
			</CardContent>
			<CardFooter>
				<div className="w-full flex flex-row align-middle justify-end">
					<
						Button
						variant='outline'
						onClick={onSave}
					>
						<span>Next</span>
					</Button>
				</div>
			</CardFooter>
		</Card>
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

	function onSave() {
		for (const task of tasks) {
			commitNewTask({ name: task });
		}

		navigate('/prioritizing')
	}
}