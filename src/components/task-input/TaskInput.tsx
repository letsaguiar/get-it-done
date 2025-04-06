import { Input } from "../ui/input"

export function TaskInput({
	visible = true,
	disabled = false,
	placeholder,
	value,
	onValueChange
}: {
	visible?: boolean,
	disabled?: boolean,
	placeholder?: string,
	value?: string,
	onValueChange?: React.ChangeEventHandler<HTMLInputElement>
}) {
	if (!visible)
		return null

	return <>
		<
			Input
			disabled={disabled}
			placeholder={placeholder}
			onChange={onValueChange}
			value={value}
			className="h-10"
		/>
	</>
}