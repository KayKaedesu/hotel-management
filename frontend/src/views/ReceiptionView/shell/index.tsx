import { AppShell, Navbar } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import NavbarLinksGroup, { LinksGroupProps } from './links'
import { IconUserPlus, IconCalendarTime, IconBedFilled } from '@tabler/icons-react'

import Header from './header'

const navLinks: LinksGroupProps[] = [
  {
    label: 'ลูกค้า',
    icon: IconUserPlus,
    links: [
      { label: 'เพิ่มลูกค้า', link: '/reception/guest/add' },
      { label: 'ดูรายการลูกค้า', link: '/reception/guest/view' },
      // { label: 'Previous releases', link: '/reception/' },
      // { label: 'Releases schedule', link: '/' },
    ],
  },
  {
    label: 'การจอง',
    icon: IconCalendarTime,
    links: [
      {
        label: 'เพิ่มการจอง',
        link: '/reception/booking/add',
      },
      {
        label: 'ดูรายการการจอง',
        link: '/reception/booking/view',
      },
    ],
  },
  {
    label:'ห้อง',
    icon:IconBedFilled,
    link:'/reception/rooms'
  }
]

export default function ReceptionistShell() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 225 }} >
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
