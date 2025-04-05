import { useUserPreferencesStore } from "@/stores/user-preferences.store"
import React, { createContext, useContext, useEffect } from "react"

export type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  toggleColorMode: () => void;
}

const initialState: ThemeProviderState = {
  theme: "dark",
  toggleColorMode: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: ThemeProviderProps) {
  const theme = useUserPreferencesStore(s => s.data.colorMode) || 'light';
  const toggleColorMode = useUserPreferencesStore(s => s.toggleColorMode);

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider {...props} value={{ theme, toggleColorMode }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
