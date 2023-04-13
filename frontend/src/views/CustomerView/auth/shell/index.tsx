import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router-dom'

function CustomerAuthShell() {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  )
}
export default CustomerAuthShell
