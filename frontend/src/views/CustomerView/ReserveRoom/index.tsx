import { useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { ZodError, z } from 'zod'
import { useCustomerUserStore } from '../shell'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CustomerGetRoomsResponse, PostReservesRequest } from 'types'
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
import { DateInput, DatePickerInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'

async function sendReserveRequest(data: any) {
  try {
    PostReservesRequest.parse(data)
    const response = await axios.post('/customer/reserves', data, {
      baseURL: API_URL,
    })
    if (response.data.message === 'success') {
      notifications.show({
        message: 'จองห้องสำเร็จ',
        color: 'green',
      })
    }
  } catch (e) {
    if (e instanceof ZodError) {
      console.error(e)
      notifications.show({
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        title: 'เกิดปัญหา',
        color: 'red',
      })
    } else if (e instanceof AxiosError) {
      console.log(e)
      notifications.show({
        message: 'เกิดข้อผิดพลาดบางอย่างในเซิฟเวอร์',
        color: 'red',
      })
    }
  }
}

function CustomerReserveRoom() {
  const { loggedIn, id } = useCustomerUserStore()
  const navigate = useNavigate()

  const [rooms, setRooms] = useState<z.infer<typeof CustomerGetRoomsResponse>>({
    rooms: [],
  })
  const [startDate, setStartDate] = useState<Date | null>()
  const [endDate, setEndDate] = useState<Date | null>()
  const [limitDate] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date
  })
  const [paymentAmount, setPaymentAmount] = useState<number>(0)

  const Rooms = CustomerGetRoomsResponse.shape.rooms
  const [reservings, setReservings] = useState<z.infer<typeof Rooms> | []>([])

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
          setRooms(CustomerGetRoomsResponse.parse(res.data))
        })
      }
    },
    [loggedIn, navigate]
  )

  useEffect(
    function () {
      if (endDate == null || startDate == null) {
        return
      }
      setPaymentAmount(
        reservings.reduce((sum, resRoom) => {
          const resRoomCost = resRoom.daily_cost / 2 + sum
          return resRoomCost
        }, 0) *
          (endDate.getDate() - startDate.getDate())
      )
    },
    [startDate, endDate, reservings]
  )

  console.log(startDate, endDate)

  return (
    <>
      <Grid columns={13} align="end">
        <Grid.Col>
          <DatePickerInput
            type="range"
            label="ช่วงวันที่ต้องการจอง"
            placeholder="ตั้งแต่...ถึง"
            valueFormat="D MMM YYYY"
            onChange={(dates) => {
              setStartDate(dates[0])
              console.log(dates)
              setEndDate(dates[1])
            }}
            minDate={new Date()}
            maxDate={limitDate}
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
                user_id: id,
                room_ids: reservings.map((room) => room.room_id),
                reserve_range: [startDate, endDate],
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
