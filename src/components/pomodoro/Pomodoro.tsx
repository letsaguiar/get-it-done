import { TimerStage, useTimer } from "@/hooks/useTimer";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";



export default function Pomodoro({
	onTick
}: {
	onTick?: (stage: TimerStage, secondsLeft: number) => void;
}) {
	const { t } = useTranslation("pomodoro-component");

	const {
		currentStage,
		setStage,
		secondsLeft,
		isRunning,
		toggleTimer,
		resetTimer,
	} = useTimer({ onTick })

	const formatTime = (secs: number) => {
		const mins = Math.floor(secs / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (secs % 60).toString().padStart(2, "0");
		return `${mins}:${seconds}`;
	};

	return (
		<>
			<div className="flex flex-col gap-4 items-center">
				<div className="flex-gap-2">
					{Object.values(TimerStage).map((stage) => (
						<Button
							key={stage}
							variant={currentStage === stage ? "default" : "ghost"}
							onClick={() => setStage(stage as TimerStage)}
						>
							{t(`${(stage as string).toLowerCase()}_label`)}
						</Button>
					))}
				</div>

				<h1 className="text-6xl font-mono font-bold">{formatTime(secondsLeft)}</h1>

				<div className="flex gap-3">
					<Button onClick={toggleTimer}>
						{isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
						{isRunning ? t("stop_label") : t("start_label")}
					</Button>
					<Button variant='outline' onClick={resetTimer}>
						<RotateCcw className="w-4 h-4" />
						{t("reset_label")}
					</Button>
				</div>
			</div>
		</>
	);
}