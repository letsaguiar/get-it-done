import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import TaskInput from './TaskInput';

export function SortableItem(props: {
	id: string,
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
	const { id, ...rest } = props;

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<TaskInput {...rest} />
		</div>
	);
}