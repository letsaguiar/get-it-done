import { Task } from "@/stores/task.store";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SelectableTaskInput({
	label,
	placeholder,
	tasks
}: {
	label?: string,
	placeholder?: string,
	tasks: Task[]
}) {
	return <>
		<Select>
			<Label className="mb-3 text-sm">{label}</Label>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{tasks.map((task) => (
					<
						SelectItem
						value={task.name}
						key={task.uuid}
					>
						{task.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</>
}