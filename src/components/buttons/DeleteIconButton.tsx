import { Trash } from "lucide-react";
import { Button } from "../ui/button";

export function DeleteIconButton({
	visible = true,
	onClick,
	disabled,
}: {
	visible?: boolean,
	onClick?: React.MouseEventHandler<HTMLButtonElement>,
	disabled?: boolean,
}) {
	if (!visible)
		return null;

	return (
		<Button
			variant='destructive'
			onClick={onClick}
			disabled={disabled}
			size='lg'
		>
			<Trash />
		</Button>
	)
}