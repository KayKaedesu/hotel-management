import {
  Button,
  Checkbox,
  Flex,
  Grid,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core'
import {
  IconAbc,
  IconAt,
  IconEyeCheck,
  IconEyeOff,
  IconPassword,
  IconPhone,
  IconUser,
} from '@tabler/icons-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../../config'
import {
  ReceptionPostCustomersRequest,
  ReceptionPostCustomersResponse,
} from 'types'
import { z } from 'zod'
import { notifications } from '@mantine/notifications'

async function sendCreateReq(
  data: z.input<typeof ReceptionPostCustomersRequest>
) {
  axios
    .post('/reception/customers', ReceptionPostCustomersRequest.parse(data), {
      baseURL: API_URL,
    })
    .then((res) => {
      const { customer_id } = ReceptionPostCustomersResponse.parse(res.data)
      if (customer_id) {
        notifications.show({
          message: 'เพิ่มลูกค้าสำเร็จ',
          color: 'green',
        })
      } else {
        notifications.show({
          message: 'เกิดข้อผิดพลาดบางอย่างในเซิฟเวอร์',
          color: 'red',
        })
      }
    })
}

function AddCustomer() {
  const [hasAccount, setHasAccount] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNum, setPhoneNum] = useState<string>('')

  return (
    <Grid>
      <Grid.Col span={12}>
        <Title>เพิ่มลูกค้า</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          label="ชื่อจริง"
          icon={<IconUser size={16} />}
          onChange={(event) => {
            setFirstName(event.currentTarget.value)
          }}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="นามสกุล"
          icon={<IconAbc size={16} />}
          onChange={(event) => {
            setLastName(event.currentTarget.value)
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <TextInput
          label="เบอร์โทรศัพท์"
          icon={<IconPhone size={16} />}
          onChange={(event) => {
            setPhoneNum(event.currentTarget.value)
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Checkbox
          label="เปิดบัญชีด้วยไหม?"
          onChange={(event) => {
            setHasAccount(event.currentTarget.checked)
          }}
        />
      </Grid.Col>

      {hasAccount ? (
        <>
          <Grid.Col span={6}>
            <TextInput
              label="ชื่อผู้ใช้"
              icon={<IconUser size={16} />}
              onChange={(event) => {
                setUsername(event.currentTarget.value)
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="อีเมลล์"
              type="email"
              icon={<IconAt size={16} />}
              onChange={(event) => {
                setEmail(event.currentTarget.value)
              }}
            />
          </Grid.Col>
          <Grid.Col>
            <PasswordInput
              label="พาสเวิร์ด"
              icon={<IconPassword size={16} />}
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IconEyeOff size={16} /> : <IconEyeCheck size={16} />
              }
              onChange={(event) => {
                setPassword(event.currentTarget.value)
              }}
            />
          </Grid.Col>
        </>
      ) : undefined}

      <Grid.Col span={12}>
        <Flex gap={20}>
          <Button
            onClick={() => {
              sendCreateReq({
                first_name: firstName,
                last_name: lastName,
                tel_num: phoneNum,
                account: hasAccount ? { username, email, password } : undefined,
              })
            }}
          >
            สร้างบัญชี
          </Button>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}
export default AddCustomer
