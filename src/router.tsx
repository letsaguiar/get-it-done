import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./app/layout";
import ListingView from "./app/listing";

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{ path: '/listing', Component: ListingView }
		]
	}
])

export default function Router() {
	return <RouterProvider router={router} />
}