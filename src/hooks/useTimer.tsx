import { useEffect, useRef, useState } from "react";

export enum TimerStage {
	POMODORO = "POMODORO",
	SHORT_BREAK = "SHORT_BREAK",
	LONG_BREAK = "LONG_BREAK",
}

export type ITimerStep = {
	stage: TimerStage;
	duration: number;
}

export const TimerSteps: ITimerStep[] = [
	{ stage: TimerStage.POMODORO, duration: 25 * 60 },
	{ stage: TimerStage.SHORT_BREAK, duration: 5 * 60 },
	{ stage: TimerStage.POMODORO, duration: 25 * 60 },
	{ stage: TimerStage.SHORT_BREAK, duration: 5 * 60 },
	{ stage: TimerStage.POMODORO, duration: 25 * 60 },
	{ stage: TimerStage.SHORT_BREAK, duration: 15 * 60 },
	{ stage: TimerStage.POMODORO, duration: 25 * 60 },
	{ stage: TimerStage.LONG_BREAK, duration: 30 * 60 },
]

export function useTimer({
	onTick,
	onStageChange,
	steps = TimerSteps
}: {
	onTick?: (stage: TimerStage, secondsLeft: number) => void;
	onStageChange?: (stage: TimerStage) => void;
	steps?: ITimerStep[];
}) {
	const [isRunning, setIsRunning] = useState(false);
	const [stepIndex, setStepIndex] = useState(0);
	const [secondsLeft, setSecondsLeft] = useState(steps[0].duration);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const startTimer = () => setIsRunning(true);
	const stopTimer = () => setIsRunning(false);
	const toggleTimer = () => setIsRunning((prev) => !prev);
	const incrementTimer = () => setSecondsLeft((prev) => prev + 1);
	const decrementTimer = () => {
		if (secondsLeft > 0)
			setSecondsLeft((prev) => prev - 1);
	};
	const resetTimer = () => {
		stopTimer();
		clearInterval(timerRef.current!);
		timerRef.current = null;
		setSecondsLeft(steps[stepIndex].duration);
	}
	const nextStep = () => setStepIndex((prev) => (prev + 1) % steps.length);
	const setStage = (stage: TimerStage) => {
		const index = steps.findIndex((step) => step.stage === stage);
		if (index !== -1) {
			setStepIndex(index);
		}
	}

	// Reset timer when step changes
	useEffect(() => {
		resetTimer();
		onStageChange?.(steps[stepIndex].stage);
	}, [stepIndex]);

	// Handle timer tick
	useEffect(() => {
		if (!isRunning)
			return;

		timerRef.current = setInterval(() => {
			setSecondsLeft((prev) => {
				const next = prev - 1;
				if (next <= 0) {
					clearInterval(timerRef.current!);
					timerRef.current = null;
					nextStep();
					return (0);
				}

				return next;
			});
		}, 1000);

		return () => clearInterval(timerRef.current!);
	}, [isRunning]);
	useEffect(() => {
		if (!isRunning)
			return;
		onTick?.(steps[stepIndex].stage, secondsLeft);
	}, [secondsLeft]);

	return {
		isRunning,
		secondsLeft,
		currentStage: steps[stepIndex].stage,
		startTimer,
		stopTimer,
		toggleTimer,
		incrementTimer,
		decrementTimer,
		resetTimer,
		setStage,
		setStepIndex,
		nextStep,
	}
}