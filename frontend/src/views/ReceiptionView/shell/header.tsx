import { Header as MantineHeader, Group, Text, Box, rem } from '@mantine/core'
import UserButton from './header-user'

import CustomerHeader from '../../CustomerView/shell/header'

export default function Header() {
  return (
    <Box>
      <MantineHeader height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Text size="xl">โรงแรมซัมติง</Text>
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
