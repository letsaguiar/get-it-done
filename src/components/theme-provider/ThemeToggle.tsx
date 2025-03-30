import { Moon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
	const { toggleTheme } = useTheme();

	return <>
		<div className="fixed top-0 right-0 p-5 md:p-7 lg:p-9">
			<
				Button
				onClick={toggleTheme}
			>
				<Moon />
			</Button>
		</div>
	</>
}