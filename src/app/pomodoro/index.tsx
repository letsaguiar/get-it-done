import Pomodoro from "@/components/pomodoro/Pomodoro";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function PomodoroView() {
	useTranslation('prioritizing-view');

	return <>
		<Card className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
			<CardContent>
				<Pomodoro />
			</CardContent>
		</Card>
	</>
}