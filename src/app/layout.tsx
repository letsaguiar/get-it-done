import React from "react"
import { Outlet } from "react-router"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Outlet />
    </div>
  )
}

export default App