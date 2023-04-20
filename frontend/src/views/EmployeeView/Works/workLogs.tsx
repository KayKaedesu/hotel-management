import axios from 'axios'
import { EmployeeGetSelfLogResponse, EmployeeGetSelfRequest } from 'types'
import { API_URL } from '../../../config'
import { Table, Title, createStyles } from '@mantine/core'
import { z } from 'zod'
import { useEffect, useState } from 'react'

import 'dayjs/locale/th'
import dayjs from 'dayjs'

const dateTimeFormat = 'วันdddที่ D MMM YYYY hh:mm:ss'

async function fetchData(id: number) {
  const parsedSendingData = EmployeeGetSelfRequest.parse({
    employee_id: id,
  })

  const output = await axios.get('/employee/logs', {
    baseURL: API_URL,
    params: parsedSendingData,
  })
  return EmployeeGetSelfLogResponse.parse(output.data)
}

function EmployeeWorksLogs({ id }: { id: number }) {
  const [logs, setLogs] = useState<
    z.infer<typeof EmployeeGetSelfLogResponse.shape.logs>
  >([])

  useEffect(() => {
    fetchData(id).then((data) => {
      setLogs(data.logs)
    })
  }, [id])

  return (
    <>
      <Title
        sx={(theme) => ({
          textAlign: 'center',
        })}
      >
        ช่วงเวลาการทำงาน
      </Title>
      <Table withBorder>
        <thead>
          <tr>
            <th>ตั้งแต่</th>
            <th>ถึง</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.start_at.getTime() + log.end_at.getTime()}>
              <td>{dayjs(log.start_at).locale('th').format(dateTimeFormat)}</td>
              <td>{dayjs(log.end_at).locale('th').format(dateTimeFormat)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
export default EmployeeWorksLogs
