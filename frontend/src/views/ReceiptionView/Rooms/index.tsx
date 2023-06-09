import React, { useEffect, useState } from 'react'
import { Table, Badge } from '@mantine/core'
import axios from 'axios'
import { API_URL } from '../../../config'
import { ReceptionGetRoomsResponse } from 'types'
import { z } from 'zod'
import { DateInput } from '@mantine/dates'

function CheckRoom() {
  const [userQuery, setUserQuery] = useState<{ queryDate: Date | null }>()
  const [rooms, setRooms] = useState<
    z.infer<typeof ReceptionGetRoomsResponse.shape.allRooms>
  >([])
  useEffect(() => {
    axios
      .get('/reception/rooms', {
        baseURL: API_URL,
        params: userQuery,
      })
      .then((res) => {
        setRooms(res.data.allRooms)
      })
  }, [userQuery])
  return (
    <Table>
      <thead>
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Date input"
          placeholder="Date input"
          maw={400}
          mx="auto"
          onChange={(date) => setUserQuery({ queryDate: date })}
        />
        <tr>
          <th>หมายเลขห้อง</th>
          <th>ประเภทห้อง</th>
          <th>ราคา</th>
          <th>รายละเอียด</th>
          <th>สถานะ</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((i, j) => {
          return (
            <tr key={j}>
              <td>{i.room_num}</td>
              <td>{i.name}</td>
              <td>{i.daily_cost}</td>
              <td>{i.description}</td>
              <td>
                {i.reserve_id != 0 || i.check_in_out_id != 0 ? (
                  <Badge color="red" variant="filled">
                    ไม่ว่าง
                  </Badge>
                ) : (
                  <Badge color="green" variant="filled">
                    ว่าง
                  </Badge>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
export default CheckRoom
