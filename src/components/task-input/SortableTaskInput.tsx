import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function SortableTaskInput(props: {
	id: string,
	value?: string,
}) {
	const { id, value } = props;

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
			<div className='w-full flex flex-row justify-between align-middle'>
				<
					Button
					variant='secondary'
					className='rounded-r-none'
				>
					<Grip />
				</Button>
				<
					Input
					disabled={true}
					value={value}
					className='rounded-l-none'
				/>
			</div>
		</div>
	);
}