import { ITaskModel } from "@/models/task.model";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SelectableTaskInput({
	label,
	placeholder,
	tasks = [],
	defaultValue,
	onValueChange
}: {
	label?: string,
	placeholder?: string,
	tasks?: ITaskModel[],
	defaultValue?: string,
	onValueChange?: (id: string) => void,
}) {
	return <>
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			{label && <Label className="mb-3 text-sm">{label}</Label>}
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{tasks.map((task) => (
					<
						SelectItem
						value={task.id}
						key={task.id}
					>
						{task.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</>
}