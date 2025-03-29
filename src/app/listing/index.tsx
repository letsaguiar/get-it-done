import TaskInput from "@/components/task-input/TaskInput";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useTranslation } from "react-i18next";

function AnimatedTaskInput() {
	return <>
		<TaskInput label="foo" placeholder="boo" deleteButton editButton />
	</>
}

export default function ListingView() {
	const { t } = useTranslation('listing-view');

	return <>
		<Card className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
			<CardHeader>
				<CardTitle>{t('title')}</CardTitle>
				<CardDescription>{t('subtitle')}</CardDescription>
			</CardHeader>
			<CardContent>
				<AnimatedTaskInput />
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	</>
}