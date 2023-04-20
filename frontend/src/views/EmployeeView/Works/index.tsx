import {
  Button,
  Grid,
  NumberInput,
  NumberInputHandlers,
  Table,
} from '@mantine/core'
import EmployeeWorkSchedules from './workSchedules'
import EmployeeWorksLogs from './workLogs'
import { useRef, useState } from 'react'

function EmployeeWorks() {
  const [employeeId, setEmployeeId] = useState<number>(1)
  const employeeInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Grid align='flex-end'>
        <Grid.Col span={'auto'}>
          <NumberInput
            label={'รหัสพนักงาน'}
            hideControls
            min={1}
            ref={employeeInputRef}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Button
            fullWidth
            onClick={() => {
              let val = Number(employeeInputRef.current?.value)
              setEmployeeId(val ?? -1)
            }}
          >
            ดู
          </Button>
        </Grid.Col>
      </Grid>
      <EmployeeWorkSchedules id={employeeId} />
      <EmployeeWorksLogs id={employeeId} />
    </>
  )
}
export default EmployeeWorks
