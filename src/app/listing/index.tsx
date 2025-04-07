import { DefaultCard } from "@/components/cards/DefaultCard";
import TaskInputBox from "@/components/task-input/TaskInputBox";
import { Button } from "@/components/ui/button";
import { useEmptyTaskList } from "@/hooks/useEmptyTaskList";
import { createTaskModel, ITaskModel } from "@/models/task.model";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function AnimatedTaskInput({ tasks, onTaskChange, onTaskDelete }: {
	tasks: Array<ITaskModel>,
	onTaskChange: (name: string, id: string) => void;
	onTaskDelete: (id: string) => void;
}) {
	return <>
		<div className="flex flex-col align-middle justify-center gap-2.5">
			{[...tasks, createTaskModel({ id: "" })].map((task, index) => (
				<
					TaskInputBox
					value={task.name}
					onValueChange={e => onTaskChange(e.target.value, task.id)}
					placeholder="A descriptive task name..."
					deleteButton
					deleteButtonDisabled={index >= tasks.length}
					onDelete={() => onTaskDelete(task.id)}
					key={index}
				/>
			))}
		</div>
	</>
}

export default function ListingView() {
	const { t } = useTranslation('listing-view');
	const {
		tasks,
		addTask,
		removeTask,
		updateTask,
		saveTasks
	} = useEmptyTaskList();
	const navigate = useNavigate();

	return <>
		<DefaultCard title={t('title')} description={t('subtitle')}>
			<DefaultCard.Content>
				<AnimatedTaskInput
					tasks={tasks}
					onTaskChange={onTaskValueChange}
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

	function onTaskValueChange(name: string, id: string) {
		if (id == "")
			addTask(name);
		else if (name === "")
			removeTask(id);
		else {
			updateTask(id, name);
		}
	}

	function onTaskDelete(id: string) {
		removeTask(id);
	}

	function next() {
		saveTasks();
		navigate('/prioritizing')
	}
}