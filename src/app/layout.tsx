import DarkToogle from "@/components/theme-provider/ThemeToggle";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";
import React from "react";
import { Outlet } from "react-router";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Outlet />
        <DarkToogle />
      </div>
    </ThemeProvider>
  )
}