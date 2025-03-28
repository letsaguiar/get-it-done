import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./app/App";

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
	}
])

export default function Router() {
	return <RouterProvider router={router} />
}