import { Box, Button, Group, Header, createStyles } from '@mantine/core'
import { Link } from 'react-router-dom'

type LinkedButton = {
  link: string
  label: string
}

const links: LinkedButton[] = [
  {
    link: '/customer/',
    label: 'มุมมองลูกค้า',
  },
  {
    link: '/employee/',
    label: 'มุมมองพนักงานทั่วไป',
  },
  {
    link: '/reception/',
    label: 'มุมมองผู้กรอกข้อมูล',
  },
  {
    link: '/owner/',
    label: 'มุมมองผู้บริหาร',
  },
]

export const headerHeight = 100

function OuterHeader() {
  return (
    <Box>
      <Header height={headerHeight}>
        <Group position="center" pt={6}>
          {links.map((link) => (
            <Link to={link.link}>
              <Button>{link.label}</Button>
            </Link>
          ))}
        </Group>
      </Header>
    </Box>
  )
}
export default OuterHeader
