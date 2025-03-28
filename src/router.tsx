import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./app/layout";
import Home from "./app";

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{ index: true, Component: Home}
		]
	}
])

export default function Router() {
	return <RouterProvider router={router} />
}