import { TFunction } from "i18next";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export enum PomodoroStage {
	POMODORO,
	SHORT_BREAK,
	LONG_BREAK,
}

const PomodoroConfig = {
	duration: {
		[PomodoroStage.POMODORO]: 25 * 60,
		[PomodoroStage.SHORT_BREAK]: 5 * 60,
		[PomodoroStage.LONG_BREAK]: 15 * 60,
	},
	steps: [
		PomodoroStage.POMODORO,
		PomodoroStage.SHORT_BREAK,
		PomodoroStage.POMODORO,
		PomodoroStage.SHORT_BREAK,
		PomodoroStage.POMODORO,
		PomodoroStage.SHORT_BREAK,
		PomodoroStage.POMODORO,
		PomodoroStage.LONG_BREAK,
	],
	getStepDuration(step: number) {
		return this.duration[this.steps[step]];
	},
	getStageLabel(t: TFunction, stage: PomodoroStage) {
		const labels: Record<PomodoroStage, () => string> = {
			[PomodoroStage.POMODORO]: () => t("pomodoro_label"),
			[PomodoroStage.SHORT_BREAK]: () => t("short_break_label"),
			[PomodoroStage.LONG_BREAK]: () => t("long_break_label"),
		};

		return labels[stage]();
	},
};

export default function Pomodoro() {
	const { t } = useTranslation("pomodoro-component");
	const [step, setStep] = useState(0);
	const [secondsLeft, setSecondsLeft] = useState(
		PomodoroConfig.getStepDuration(0)
	);
	const [isRunning, setIsRunning] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		stop();
		setSecondsLeft(PomodoroConfig.getStepDuration(step));
	}, [step]);

	useEffect(() => {
		clearTimer();

		if (isRunning) {
			timerRef.current = setInterval(() => {
				setSecondsLeft((prev) => {
					if (prev <= 1) {
						clearTimer();
						transit();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => clearTimer();
	}, [isRunning]);

	const clearTimer = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};

	const stop = () => {
		setIsRunning(false);
		clearTimer();
	};

	const transit = () => {
		setStep((prevStep) => {
			if (prevStep < PomodoroConfig.steps.length - 1) {
				return prevStep + 1;
			} else {
				return 0;
			}
		});
		console.log(step)
	};


	const formatTime = (secs: number) => {
		const mins = Math.floor(secs / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (secs % 60).toString().padStart(2, "0");
		return `${mins}:${seconds}`;
	};

	return (
		<>
			<div className="flex flex-row align-middle justify-center gap-2 mb-4">
				{Object.values(PomodoroStage)
					.filter((s) => !isNaN(s as any))
					.map((stage) => (
						<Button
							key={stage}
							variant={
								PomodoroConfig.steps[step] === stage ? "default" : "ghost"
							}
							onClick={() =>
								setStep(
									PomodoroConfig.steps.findIndex((s) => s === (stage as any))
								)
							}
							className="gap-2 px-4"
						>
							{PomodoroConfig.getStageLabel(t, stage as any)}
						</Button>
					))}
			</div>
			<div
				className={`
        text-7xl font-mono font-bold
        flex flex-row align-middle justify-center
        transition-all duration-200
        mb-3`
					.trim()}
			>
				{formatTime(secondsLeft)}
			</div>
			<div className="flex flex-row align-middle justify-center gap-3">
				<Button
					onClick={() => setIsRunning((prev) => !prev)}
					variant="default"
					className="gap-2"
				>
					{isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
					{isRunning ? t("stop_label") : t("start_label")}
				</Button>
				<Button
					onClick={() => {
						stop();
						setSecondsLeft(PomodoroConfig.getStepDuration(step));
					}}
					variant="outline"
					className="gap-2"
				>
					<RotateCcw className="w-4 h-4" />
					{t("reset_label")}
				</Button>
			</div>
		</>
	);
}