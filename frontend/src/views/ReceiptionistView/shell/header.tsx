import {
  createStyles,
  Header as MantineHeader,
  Group,
  UnstyledButton,
  Text,
  ThemeIcon,
  Box,
  rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
} from '@tabler/icons-react'
import UserButton from './header-user'

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },
}))

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
]

export default function Header() {
  // TODO: if not authenticated show login/ signup
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
  const { classes, theme } = useStyles()

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ))

  return (
    <Box>
      <MantineHeader height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Text size="xl">โรงแรมซัมติง</Text>
          {/* <Group>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group> */}
          <Group>
            <UserButton
              image="https://www.corporatephotographylondon.com/wp-content/uploads/2019/11/HKstrategies-846.jpg"
              name="จอห์น โด"
              email="receptionist_1@hotelmail.com"
            />
          </Group>
        </Group>
      </MantineHeader>
    </Box>
  )
}
