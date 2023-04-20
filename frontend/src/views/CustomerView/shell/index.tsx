import CustomerHeader, { UserSetter, LinkTab, User } from './header'
import { AppShell, Container } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Outlet } from 'react-router-dom'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCustomerUserStore = create<User & UserSetter>()(
  persist(
    (set) => {
      const defaultUser: User = {
        image: '',
        name: 'ยังไม่ได้เข้าสู่ระบบ',
        loggedIn: false,
      }

      return {
        ...defaultUser,
        setId(value) {
          set(() => ({ id: value }))
        },
        setImage(value) {
          set(() => ({ image: value }))
        },
        setName(value) {
          set(() => ({ name: value }))
        },
        setLoggedIn(value) {
          set(() => ({ loggedIn: value }))
        },
        setUser(value: User) {
          set(() => value)
        },
        reset() {
          set(() => defaultUser)
        },
      }
    },
    {
      name: 'customerUser',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

const linkTabs: LinkTab[] = [
  {
    label: 'หน้าหลัก',
    link: '/customer',
  },
  {
    label: 'ตัวอย่างห้อง',
    link: '/customer/room-types',
  },
  {
    label: 'จองห้อง',
    link: '/customer/reserve-room',
  },
  {
    label: 'ห้องที่จองไว้',
    link: '/customer/list-reserves',
  },
  {
    label: 'ติดต่อสอบถาม',
    link: '/customer/about',
  },
]

export default function CustomerShell() {
  const { image, name, loggedIn } = useCustomerUserStore()
  return (
    <AppShell header={<CustomerHeader tabs={linkTabs} />}>
      <Container>
        <Outlet />
        <Notifications />
      </Container>
    </AppShell>
  )
}
