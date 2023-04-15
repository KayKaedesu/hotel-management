import { useEffect } from 'react'
import axios from 'axios'
import { z } from 'zod'
import { useCustomerUserStore } from '../shell'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GetRoomsResponse, PostReservesRequest } from 'types'
import { API_URL } from '../../../config'
import {
  Box,
  Button,
  Center,
  Grid,
  MultiSelect,
  Text,
  Title,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'

async function sendReserveRequest(data: z.infer<typeof PostReservesRequest>) {
  console.log(data)
  await axios.post('/customer/reserves', data, {
    baseURL: API_URL,
  })
}

function CustomerReserveRoom() {
  const { loggedIn } = useCustomerUserStore()
  const id = 1
  const navigate = useNavigate()

  const [rooms, setRooms] = useState<z.infer<typeof GetRoomsResponse>>({
    rooms: [],
  })
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [limitDate] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date
  })
  const [paymentAmount, setPaymentAmount] = useState<number>(0)

  const Rooms = GetRoomsResponse.shape.rooms
  const [reservings, setReservings] = useState<z.infer<typeof Rooms>>([])

  // login guard
  useEffect(
    function () {
      if (typeof loggedIn === 'undefined') {
        return
      }
      if (!loggedIn) {
        navigate('/customer/auth/login')
      } else {
        axios.get(API_URL + '/customer/rooms').then(async (res) => {
          setRooms(GetRoomsResponse.parse(res.data))
        })
      }
    },
    [loggedIn, navigate]
  )

  useEffect(
    function () {
      setPaymentAmount(
        reservings.reduce((sum, resRoom) => {
          return resRoom.daily_cost / 2 + sum
        }, 0) *
          ((endDate?.getDate() ?? new Date().getDate()) +
            1 -
            (startDate?.getDate() ?? new Date().getDate()))
      )
    },
    [startDate, endDate, reservings]
  )

  return (
    <>
      <Grid columns={13} align="end">
        <Grid.Col span="auto">
          <DateInput
            allowDeselect
            onChange={setStartDate}
            label="วัน"
            placeholder="วันเริ่มต้น"
            minDate={new Date()}
            maxDate={endDate ?? limitDate}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Center>ถึง</Center>
        </Grid.Col>
        <Grid.Col span="auto">
          <DateInput
            allowDeselect
            minDate={startDate ?? new Date()}
            maxDate={limitDate}
            onChange={setEndDate}
            placeholder="วันสิ้นสุด"
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col>
          <MultiSelect
            pb={32}
            data={rooms.rooms.map((room, index) => ({
              label: room.room_num,
              value: String(index),
              group: `${room.room_type_name} - ${room.daily_cost} บาท`,
            }))}
            onChange={(res) => {
              setReservings(res.map((re) => rooms.rooms[Number(re)]))
            }}
            label="ห้องที่ต้องการจอง"
            placeholder="เลือกห้องที่ต้องการจอง (เลือกได้หลายตัวเลือก)"
          />
        </Grid.Col>
      </Grid>
      <Box pb={30}>
        <Text weight="bold">ราคาสุทธิ</Text>
        <Title>
          {paymentAmount.toLocaleString('th-TH')}
          <Text span> ฿</Text>
        </Title>
      </Box>
      <Grid>
        <Grid.Col>
          <Button
            onClick={() => {
              sendReserveRequest({
                user_id: id ?? -1,
                room_ids: reservings.map((room) => room.room_id),
                start_date: startDate ?? new Date(0),
                end_date: endDate ?? new Date(0),
                payment_amount: paymentAmount,
              })
            }}
          >
            จองห้อง
          </Button>
        </Grid.Col>
      </Grid>
    </>
  )
}
export default CustomerReserveRoom
