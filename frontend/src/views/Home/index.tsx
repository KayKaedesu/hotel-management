import { AppShell, Button } from '@mantine/core'
import { Link } from 'react-router-dom'

const links: { to: string; label: string }[] = [
  {
    label: 'Customer',
    to: '/customer',
  },
  {
    label: 'Receptionist',
    to: '/reception',
  },
  {
    label: 'Employee',
    to: '/employee',
  },
  {
    label: 'Owner',
    to: '/owner',
  },
]

function Home() {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: theme.spacing.md,
        },
      })}
    >
      {links.map((link) => (
        <Button
          sx={(theme) => ({
            textDecoration: 'none',
          })}
        >
          <Link {...link} style={{ textDecoration: 'none', color: 'white' }}>
            {link.label}
          </Link>
        </Button>
      ))}
    </AppShell>
  )
}
export default Home
