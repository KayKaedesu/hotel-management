import { useState } from 'react'
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Button,
  Box,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconLogin,
  IconUserPlus,
} from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import { useCustomerUserStore } from '.'

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}))

export type User = {
  name: string
  image: string
  loggedIn?: boolean
}
export type UserSetter = {
  setName: (value: User['name']) => void
  setImage: (value: User['image']) => void
  setLoggedIn: (value: User['loggedIn']) => void
  setUser: (value: User) => void
  reset: () => void
}

export type LinkTab = {
  label: string
  link: string
  active?: boolean
}

type HeaderTabsProps = {
  tabs: LinkTab[]
}

function DropdownMenu() {
  const { reset, loggedIn } = useCustomerUserStore()

  function logOut() {
    reset()
  }
  if (loggedIn) {
    return (
      <Menu.Dropdown>
        <Menu.Label>บัญชี</Menu.Label>
        <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
          เปลี่ยนบัญชี
        </Menu.Item>
        <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
          ตั้งค่าบัญชี
        </Menu.Item>
        <Link to={'/customer'} style={{ textDecoration: 'none' }}>
          <Menu.Item
            onClick={logOut}
            icon={<IconLogout size="0.9rem" stroke={1.5} />}
          >
            ออกจากระบบ
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    )
  } else {
    return (
      <Menu.Dropdown>
        <Menu.Label>บัญชี</Menu.Label>
        <Link to={'/customer/auth/login'} style={{ textDecoration: 'none' }}>
          <Menu.Item icon={<IconLogin size="0.9rem" stroke={1.5} />}>
            เข้าสู่ระบบ
          </Menu.Item>
        </Link>
        <Link to={'/customer/auth/register'} style={{ textDecoration: 'none' }}>
          <Menu.Item
            color="blue"
            icon={<IconUserPlus size="0.9rem" stroke={1.5} />}
          >
            สร้างบัญชี
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    )
  }
}

export default function CustomerHeader({ tabs }: HeaderTabsProps) {
  const { name, image } = useCustomerUserStore()
  const user: User = { name, image }
  const { classes, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const { pathname } = useLocation()

  const items = tabs.map((tab, index) => (
    <Link
      to={tab.link}
      style={{
        textDecoration: 'none',
      }}
    >
      <Tabs.Tab value={tab.link} key={index}>
        {tab.label}
      </Tabs.Tab>
    </Link>
  ))

  return (
    <Box className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Text size="xl">โรงแรมซัมติง</Text>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <DropdownMenu />
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          defaultValue={pathname}
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </Box>
  )
}
