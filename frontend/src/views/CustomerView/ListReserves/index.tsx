import ListReserves, { UsersTableProps } from './reserves'

const mockData: UsersTableProps['data'] = [
  {
    start_date: new Date('2021-04-01'),
    end_date: new Date('2021-04-03'),
    room_id: 1,
    room_name: '203',
    room_type: 'ห้องพักเดี่ยว',
    status: 'ยังไม่ถึงกำหนด',
  },
]

export default function CustomerListReserves() {
  return <ListReserves data={mockData} />
}
