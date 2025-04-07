import React from "react"
import { DeleteIconButton } from "../buttons/DeleteIconButton"
import { EditIconButton } from "../buttons/EditIconButton"
import { Label } from "../ui/label"
import { TaskInput } from "./TaskInput"

export default function TaskInputBox({
	value,
	label,
	placeholder,
	onValueChange,
	deleteButton = false,
	deleteButtonDisabled,
	onDelete,
	disabled,
	editButton = false,
	editButtonDisabled,
	onEdit,
}: {
	value?: string,
	onValueChange?: React.ChangeEventHandler<HTMLInputElement>
	label?: string,
	placeholder?: string,
	deleteButton?: boolean,
	deleteButtonDisabled?: boolean,
	onDelete?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean,
	editButton?: boolean,
	editButtonDisabled?: boolean,
	onEdit?: React.MouseEventHandler<HTMLButtonElement>
}) {
	return <>
		<div>
			{label &&
				<Label>{label}</Label>
			}
			<div className="w-full flex flex-row justify-between align-middle gap-2">
				<TaskInput
					disabled={disabled}
					placeholder={placeholder}
					value={value}
					onValueChange={onValueChange}
				/>
				<DeleteIconButton
					visible={deleteButton}
					onClick={onDelete}
					disabled={deleteButtonDisabled}
				/>
				<EditIconButton
					visible={editButton}
					onClick={onEdit}
					disabled={editButtonDisabled}
				/>
			</div>
		</div>
	</>
}