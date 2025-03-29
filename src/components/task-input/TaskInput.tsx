import { Pencil, Trash } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function TaskInput({
	value,
	label,
	placeholder,
	onValueChange,
	deleteButton,
	deleteButtonDisabled,
	onDelete,
	disabled,
	editButton,
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
		{label &&
			<Label>{label}</Label>
		}
		<div className="w-full flex flex-row justify-between align-middle gap-2">
			<
				Input
				disabled={disabled}
				placeholder={placeholder}
				onChange={onValueChange}
				value={value}
			/>
			{deleteButton &&
				<
					Button
					variant='destructive'
					onClick={onDelete}
					disabled={deleteButtonDisabled}
				>
					<Trash />
				</Button>
			}
			{editButton &&
				<
					Button
					variant='secondary'
					onClick={onEdit}
					disabled={editButtonDisabled}
				>
					<Pencil />
				</Button>
			}
		</div>
	</>
}