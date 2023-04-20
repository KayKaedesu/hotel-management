import React from 'react'
import { Table } from '@mantine/core'
import axios from 'axios'
import { API_URL } from '../../../config'

axios.get('/reception/rooms', {
  baseURL: API_URL,
})
.then(
  (res) => 
    console.log(res)
  )
.catch(
  (error) => console.log(error)
  )
function CheckRoom() {
  return (
    <Table>
      <thead>
        <tr>
          <th>Element position</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
        </tr>
      </thead>
      <tbody></tbody>
    </Table>
  )
}
export default CheckRoom