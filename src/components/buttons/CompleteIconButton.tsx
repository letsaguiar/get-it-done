import { Check } from "lucide-react";
import { Button } from "../ui/button";

export function CompleteIconButton({
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
			variant='default'
			onClick={onClick}
			disabled={disabled}
			size='lg'
		>
			<Check />
		</Button>
	)
}