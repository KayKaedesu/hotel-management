import { Badge, Table, Group, Text } from '@mantine/core'

export interface UsersTableProps {
  data: {
    room_id: number
    room_name: string
    room_type: string
    start_date: Date
    end_date: Date
    status: 'ยังไม่ถึงกำหนด' | 'ยังไม่เข้าพัก' | 'กำลังพักอยู่' | 'เลิกพักแล้ว'
  }[]
}

function renderStatus(status: UsersTableProps['data'][0]['status']) {
  if (status === 'กำลังพักอยู่') {
    return (
      <Badge color="blue" fullWidth variant="filled">
        {status}
      </Badge>
    )
  } else if (status === 'ยังไม่ถึงกำหนด') {
    return (
      <Badge color="teal" fullWidth variant="filled">
        {status}
      </Badge>
    )
  } else if (status === 'ยังไม่เข้าพัก') {
    return (
      <Badge color="yellow" fullWidth variant="filled">
        {status}
      </Badge>
    )
  } else if (status === 'เลิกพักแล้ว') {
    return (
      <Badge color="red" fullWidth variant="filled">
        {status}
      </Badge>
    )
  }
}

export default function ListReserves({ data }: UsersTableProps) {
  const rows = data.map((item) => (
    <tr key={item.room_id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text fz="sm" fw={500}>
              {item.room_name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.room_type}
            </Text>
          </div>
        </Group>
      </td>
      {[item.start_date, item.end_date].map((datee) => (
        <td>
          <Text>
            {datee.toLocaleDateString('th-TH', {
              dateStyle: 'medium',
            })}
          </Text>
        </td>
      ))}
      <td>{item.room_name[0]}</td>
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
