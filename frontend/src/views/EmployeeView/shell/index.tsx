import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"

function EmployeeShell() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
export default EmployeeShell