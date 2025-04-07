import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./app/layout";
import ListingView from "./app/listing";
import PomodoroView from "./app/pomodoro";
import PrioritizingView from "./app/prioritizing";

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{ path: 'listing', Component: ListingView },
			{ path: 'prioritizing', Component: PrioritizingView },
			{ path: 'pomodoro', Component: PomodoroView }
		]
	}
])

export default function Router() {
	return <RouterProvider router={router} />
}