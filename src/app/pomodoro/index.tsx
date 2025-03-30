import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Timer() {
	const { t } = useTranslation('pomodoro-view');
	const modes = {
		pomodoro: { label: t('pomodoro_label'), duration: 2 },
		shortBreak: { label: t('short_break_label'), duration: 5 * 60 },
		longBreak: { label: t('long_break_label'), duration: 15 * 60 }
	};
	const [mode, setMode] = useState<keyof typeof modes>("pomodoro");
	const [secondsLeft, setSecondsLeft] = useState<number>(modes[mode].duration);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const timerRef = useRef<NodeJS.Timeout>(null);

	useEffect(() => {
		setSecondsLeft(modes[mode].duration);
		setIsRunning(false);
		if (timerRef.current)
			clearInterval(timerRef.current)
	}, [mode]);
	useEffect(() => {
		if (!isRunning)
			return;

		timerRef.current = setInterval(() => {
			setSecondsLeft((prev) => {
				if (prev <= 1) {
					if (timerRef.current)
						clearInterval(timerRef.current);
					setIsRunning(false);
					return (0);
				}

				return (prev - 1);
			});
		}, 1000);

		return () => {
			if (timerRef.current)
				clearInterval(timerRef.current)
		}
	}, [isRunning]);

	const formatTime = (secs: number) => {
		const mins = Math.floor(secs / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (secs % 60).toString().padStart(2, "0");
		return `${mins}:${seconds}`;
	};

	return <>
		<div className="flex flex-row align-middle justify-center gap-2 mb-4">
			{Object.keys(modes).map((key) => (
				<Button
					key={key}
					variant={mode === key ? "default" : "ghost"}
					onClick={() => setMode(key as keyof typeof modes)}
					className="gap-2 px-4"
				>
					{modes[key as keyof typeof modes].label}
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
				onClick={() => setIsRunning(!isRunning)}
				variant="default"
				className="gap-2"
			>
				{isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
				{isRunning ? t('start_label') : t('stop_label')}
			</Button>
			<Button
				onClick={() => {
					setSecondsLeft(modes[mode].duration);
					setIsRunning(false);
				}}
				variant="outline"
				className="gap-2"
			>
				<RotateCcw className="w-4 h-4" />
				{t('reset_label')}
			</Button>
		</div>
	</>;
}

export default function PomodoroView() {
	useTranslation('prioritizing-view');

	return <>
		<Card className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
			<CardContent>
				<Timer />
			</CardContent>
		</Card>
	</>
}