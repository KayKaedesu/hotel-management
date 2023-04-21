import { useEffect, useState } from 'react'
import ListReserves from './reserves'
import { z } from 'zod'
import { CustomerGetSelfReservesResponse } from 'types'
import { useCustomerUserStore } from '../shell'
import axios from 'axios'
import { API_URL } from '../../../config'

export default function CustomerListReserves() {
  const [reserves, setReserves] =
    useState<z.infer<typeof CustomerGetSelfReservesResponse>>()
  const { id } = useCustomerUserStore()

  useEffect(() => {
    axios
      .get('/customer/own-reserves', {
        baseURL: API_URL,
        params: {
          customerId: id,
        },
      })
      .then((res) =>
        setReserves(CustomerGetSelfReservesResponse.parse(res.data))
      )
  }, [id])

  return <ListReserves data={reserves?.myReserves} />
}
