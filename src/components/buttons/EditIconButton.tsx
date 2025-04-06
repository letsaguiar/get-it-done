import { Pencil } from "lucide-react";
import { Button } from "../ui/button";

export function EditIconButton({
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
			variant='secondary'
			onClick={onClick}
			disabled={disabled}
			size='lg'
		>
			<Pencil />
		</Button>
	)
}