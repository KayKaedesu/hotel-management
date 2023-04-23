import { AppShell, Navbar } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import {
  IconUserPlus,
  IconCalendarTime,
  IconBedFilled,
} from '@tabler/icons-react'
import Header from './header'
import NavbarLinksGroup, { LinksGroupProps } from './links'

const navLinks: LinksGroupProps[] = [
  {
    label: 'พนักงาน',
    icon: IconUserPlus,
    links: [
      { label: 'พนักงานทั้งหมด', link: '/owner/employee-list' },
      // { label: 'ดูรายการลูกค้า', link: '/reception/guest/view' },
    ],
  },
  // {
  //   label: 'การจอง',
  //   icon: IconCalendarTime,
  //   links: [
  //     {
  //       label: 'เพิ่มการจอง',
  //       link: '/reception/booking/add',
  //     },
  //     {
  //       label: 'ดูรายการการจอง',
  //       link: '/reception/booking/view',
  //     },
  //   ],
  // },
  // {
  //   label: 'ห้อง',
  //   icon: IconBedFilled,
  //   link: '/reception/rooms',
  // },
]

function OwnerShell() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 225 }}>
          {navLinks.map((props) => (
            <NavbarLinksGroup {...props} />
          ))}
        </Navbar>
      }
      header={<Header />}
      styles={(theme) => ({
        main: {
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
export default OwnerShell
