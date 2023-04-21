import { Badge, Table, Group, Text } from '@mantine/core'
import { CustomerGetSelfReservesResponse } from 'types'
import { z } from 'zod'

function renderStatus(
  status: z.infer<
    typeof CustomerGetSelfReservesResponse
  >['myReserves'][0]['status']
) {
  if (status === 'active') {
    return (
      <Badge color="blue" fullWidth variant="filled">
        อยู่ในช่วงเวลาการจอง
      </Badge>
    )
  } else if (status === 'upcoming') {
    return (
      <Badge color="teal" fullWidth variant="filled">
        ยังไม่ถึงกำหนด
      </Badge>
    )
  } else if (status === 'complete') {
    return (
      <Badge color="red" fullWidth variant="filled">
        เลิกพักแล้ว
      </Badge>
    )
  }
}

export default function ListReserves({
  data = [],
}: {
  data?: z.infer<typeof CustomerGetSelfReservesResponse.shape.myReserves>
}) {
  const rows = data.map((item) => (
    <tr key={item.roomId}>
      <td>
        <Group spacing="sm">
          <div>
            <Text fz="sm" fw={500}>
              {item.roomNum}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.roomType}
            </Text>
          </div>
        </Group>
      </td>
      {[item.startDate, item.endDate].map((datee) => (
        <td>
          <Text>
            {datee.toLocaleDateString('th-TH', {
              dateStyle: 'medium',
            })}
          </Text>
        </td>
      ))}
      <td>{item.floor}</td>
      <td>{renderStatus(item.status)}</td>
    </tr>
  ))

  return (
    <Table miw={800} maw={1200} verticalSpacing="sm">
      <thead>
        <tr>
          <th>เลขห้อง</th>
          <th>วันเริ่มต้น</th>
          <th>วันสิ้นสุด</th>
          <th>ชั้น</th>
          <th>สถานะ</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}
