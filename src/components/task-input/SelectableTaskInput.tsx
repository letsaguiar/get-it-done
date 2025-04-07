import { ITaskModel } from "@/models/task.model";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SelectableTaskInput({
	label,
	placeholder,
	tasks = [],
	value,
	onValueChange
}: {
	label?: string,
	placeholder?: string,
	tasks?: ITaskModel[],
	value?: string,
	onValueChange?: (id: string) => void,
}) {
	return <>
		<div className="w-full">
			<Select onValueChange={onValueChange} value={value}>
				{label && <Label className="mb-3 text-sm">{label}</Label>}
				<SelectTrigger className="w-full !h-10">
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
		</div>
	</>
}