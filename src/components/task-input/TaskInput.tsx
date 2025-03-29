import { Pencil, Trash } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function TaskInput({
	label,
	placeholder,
	onChange,
	deleteButton,
	deleteButtonDisabled,
	onDelete,
	disabled,
	editButton,
	editButtonDisabled,
	onEdit,
}: {
	label?: string,
	placeholder?: string,
	onChange?: React.ChangeEventHandler<HTMLInputElement>
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
			<div className="text-sm font-bold mb-1">
				<span>{label}</span>
			</div>
		}
		<div className="w-full flex flex-row justify-between align-middle gap-2">
			<
				Input
				disabled={disabled}
				placeholder={placeholder}
				onChange={onChange}
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
					variant='outline'
					onClick={onEdit}
					disabled={editButtonDisabled}
				>
					<Pencil />
				</Button>
			}
		</div>
	</>
}