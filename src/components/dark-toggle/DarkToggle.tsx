import { Moon } from "lucide-react";
import React, { MouseEventHandler } from "react";
import { Button } from "../ui/button";

export default function DarkToggle({ onClick }: {
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return <>
		<div className="fixed top-0 right-0 p-5 md:p-7 lg:p-9">
			<
				Button
				onClick={onClick}
			>
				<Moon />
			</Button>
		</div>
	</>
}