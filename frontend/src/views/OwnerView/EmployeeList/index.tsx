import React, { useEffect, useState } from 'react'
import { Table, Badge, MultiSelect, NativeSelect } from '@mantine/core'
import axios from 'axios'
import { API_URL } from '../../../config'
import { OwnerGetEmployeeRequest, OwnerGetEmployeeResponse } from 'types'
import { z } from 'zod'

function CheckEmployees() {
  const [queryInput, setQueryInput] = useState('')
  const [employee, setEmployee] = useState<
    z.infer<typeof OwnerGetEmployeeResponse.shape.employees>
  >([])

  const queryParams = OwnerGetEmployeeRequest.parse({
    jobs: ['พนักงานเปิดประตู'],
  })

  useEffect(() => {
    axios
      .get('/owner/employees', {
        baseURL: API_URL,
        params: queryParams,
      })
      .then((res) => {
        setEmployee(res.data.employees)
      })
  }, [])
  console.log(employee)
  return (
    <NativeSelect
      value={queryInput}
      onChange={(event) => setQueryInput(event.currentTarget.value)}
      data={['React', 'Vue', 'Angular', 'Svelte']}
      label="Select your favorite framework/library"
      description="This is anonymous"
      withAsterisk
    />
  )
}
export default CheckEmployees
