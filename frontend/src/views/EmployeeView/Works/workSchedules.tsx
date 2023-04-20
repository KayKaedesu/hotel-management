import { Grid, Table, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { EmployeeGetSelfScheduleResponse, EmployeeGetSelfRequest } from 'types'
import { z } from 'zod'
import axios from 'axios'
import { API_URL } from '../../../config'

async function fetchData(id: number) {
  const parsedSendingData = EmployeeGetSelfRequest.parse({
    employee_id: id,
  })

  const output = await axios.get('/employee/schedules', {
    baseURL: API_URL,
    params: parsedSendingData,
  })
  return EmployeeGetSelfScheduleResponse.parse(output.data)
}

function EmployeeWorkSchedules({ id }: { id: number }) {
  const [schedules, setSchedules] = useState<
    z.infer<typeof EmployeeGetSelfScheduleResponse.shape.schedules>
  >([])

  useEffect(() => {
    fetchData(id).then((data) => {
      setSchedules(data.schedules)
    })
  }, [id])

  return (
    <>
      <Title
        sx={(theme) => ({
          textAlign: 'center',
        })}
      >
        กะงาน
      </Title>
      <Table withBorder>
        <thead>
          <tr>
            <th>วัน</th>
            <th>ตั้งแต่</th>
            <th>ถึง</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((sche) => (
            <tr key={sche.schedule_date + sche.start_hour + sche.work_hours}>
              <td>{sche.schedule_date}</td>
              <td>{sche.start_hour}</td>
              <td>{(sche.start_hour + sche.work_hours) % 24}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
export default EmployeeWorkSchedules
