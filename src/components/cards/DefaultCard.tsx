import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function DefaultCard({
	visible = true,
	title,
	description,
	children,
}: {
	visible?: boolean;
	title?: string;
	description?: string;
	children?: React.ReactNode;
}) {
	if (!visible)
		return null;

	const childArray = React.useMemo(() => React.Children.toArray(children), [children]);

	const headerContent = React.useMemo(() =>
		childArray.find(
			(child) => (child as React.ReactElement).type === DefaultCard.Header
		), [childArray]);

	const contentContent = React.useMemo(() =>
		childArray.find(
			(child) => (child as React.ReactElement).type === DefaultCard.Content
		), [childArray]);

	const footerContent = React.useMemo(() =>
		childArray.find(
			(child) => (child as React.ReactElement).type === DefaultCard.Footer
		), [childArray]);



	return <>
		<Card className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
			{(title || description || headerContent) && (
				<CardHeader>
					{title && <CardTitle>{title}</CardTitle>}
					{description && <CardDescription>{description}</CardDescription>}
					{headerContent}
				</CardHeader>
			)}
			{contentContent && <CardContent>{contentContent}</CardContent>}
			{footerContent && <CardFooter>{footerContent}</CardFooter>}
		</Card>
	</>
}

DefaultCard.Header = ({ children }: { children: React.ReactNode }) => children;
DefaultCard.Content = ({ children }: { children: React.ReactNode }) => children;
DefaultCard.Footer = ({ children }: { children: React.ReactNode }) => children;