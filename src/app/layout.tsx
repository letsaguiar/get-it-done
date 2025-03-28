import DarkToogle from "@/components/dark-toggle/DarkToggle";
import React, { useState } from "react";
import { Outlet } from "react-router";

function DarkModeWrapper({ enabled, children }: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const dynamicStyle = `
    ${enabled ? 'dark' : ''}
  `.trim();

  return <div className={dynamicStyle}>{children}</div>
}

function ContentAlignerWrapper({ children }: {
  children: React.ReactNode;
}) {
  const dynamicStyle = `
    flex flex-col items-center justify-center min-h-svh
    dark:bg-zinc-900
  `.trim();

  return <div className={dynamicStyle}>{children}</div>
}

export default function App() {
  const [isDarkModeEnabled, setDarkMode] = useState<boolean>(false);

  return (
    <DarkModeWrapper enabled={isDarkModeEnabled}>
      <ContentAlignerWrapper>
        <Outlet />
        <DarkToogle onClick={toggleDarkMode} />
      </ContentAlignerWrapper>
    </DarkModeWrapper>
  )

  function toggleDarkMode() {
    setDarkMode(!isDarkModeEnabled);
  }
}