import { Pencil, Trash } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function TaskInput({
	label,
	placeholder,
	onChange,
	deleteButton,
	onDelete,
	disabled,
	editButton,
	onEdit,
}: {
	label?: string,
	placeholder?: string,
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	deleteButton?: boolean,
	onDelete?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean,
	editButton?: boolean,
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
				>
					<Trash />
				</Button>
			}
			{editButton &&
				<
					Button
					variant='outline'
					onClick={onEdit}
				>
					<Pencil />
				</Button>
			}
		</div>
	</>
}