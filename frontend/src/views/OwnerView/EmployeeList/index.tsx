import React, { useEffect, useState } from 'react'
import { Table, Badge, MultiSelect, NativeSelect } from '@mantine/core'
import axios from 'axios'
import { API_URL } from '../../../config'
import { OwnerGetEmployeeRequest, OwnerGetEmployeeResponse } from 'types'
import { z } from 'zod'

function CheckEmployees() {
  const [queryInput, setQueryInput] = useState<string[]>([])
  const [employee, setEmployee] = useState<
    z.infer<typeof OwnerGetEmployeeResponse.shape.employees>
  >([])

  useEffect(() => {
    const queryParams = OwnerGetEmployeeRequest.parse({
      jobs: queryInput,
    })
    axios
      .get('/owner/employees', {
        baseURL: API_URL,
        params: queryParams,
      })
      .then((res) => {
        setEmployee(res.data.employees)
      })
  }, [queryInput])
  return (
    <>
      <NativeSelect
        value={queryInput}
        onChange={(event) => setQueryInput([event.currentTarget.value])}
        data={[
          'พนักงานเปิดประตู',
          'พนักงานยกกระเป๋า',
          'แม่บ้าน',
          'พ่อครัว',
          'พนักงานบริการลูกค้า',
          'พนักงานรักษาความปลอดภัย',
        ]}
        label="Select your favorite framework/library"
        description="This is anonymous"
        withAsterisk
      />
      <Table>
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>เบอร์โทร</th>
            <th>ชื่อบัญชี</th>
            <th>ชื่องาน</th>
            <th>รายได้ / ชม</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((i, j) => {
            return (
              <tr key={j}>
                <td>{i.full_name}</td>
                <td>{i.tel_num}</td>
                <td>{i.username}</td>
                <td>{i.job_name}</td>
                <td>{i.hourly_wage}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
export default CheckEmployees
