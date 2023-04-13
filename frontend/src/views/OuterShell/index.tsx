import { Outlet } from 'react-router-dom'

import OuterHeader from './header'
import { AppShell } from '@mantine/core'

function OuterShell() {
  return (
    <>
      <AppShell padding={0}>
        <Outlet />
      </AppShell>
    </>
  )
}
export default OuterShell
