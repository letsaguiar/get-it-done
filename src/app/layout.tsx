import DarkToogle from "@/components/theme-provider/ThemeToggle";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";
import { Outlet } from "react-router";
import { initializeApplication } from "@/hooks/initializeApplication";

export default function App() {
  initializeApplication();

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Outlet />
        <DarkToogle />
      </div>
    </ThemeProvider>
  )
}