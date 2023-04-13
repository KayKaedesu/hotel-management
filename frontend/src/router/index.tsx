import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteObject,
} from 'react-router-dom'

import AddCustomer from '../views/ReceiptionView/AddCustomer'
import ReceptionistShell from '../views/ReceiptionView/shell'
import CustomerShell from '../views/CustomerView/shell'
import CustomerRoomTypes from '../views/CustomerView/RoomTypes'
import CustomerHome from '../views/CustomerView/Home'
import CustomerReserveRoom from '../views/CustomerView/ReserveRoom'
import CustomerAbout from '../views/CustomerView/About'
import CustomerAuthLogin from '../views/CustomerView/auth/Login'
import CustomerAuthRegister from '../views/CustomerView/auth/Register'
import CustomerAuthShell from '../views/CustomerView/auth/shell'
import OuterShell from '../views/OuterShell'

export const receptionistRoutes: RouteObject[] = [
  {
    path: '/reception/',
    element: <ReceptionistShell />,
    children: [
      {
        path: 'add-customer',
        element: <AddCustomer />,
      },
    ],
  },
]

export const customerRoutes: RouteObject[] = [
  {
    path: '/customer/',
    element: <CustomerShell />,
    children: [
      {
        path: '',
        element: <CustomerHome />,
      },
      {
        path: 'room-types',
        element: <CustomerRoomTypes />,
      },
      {
        path: 'reserve-room',
        element: <CustomerReserveRoom />,
      },
      {
        path: 'about',
        element: <CustomerAbout />,
      },
    ],
  },
  {
    path: '/customer/auth',
    element: <CustomerAuthShell />,
    children: [
      {
        path: 'login',
        element: <CustomerAuthLogin />,
      },
      {
        path: 'register',
        element: <CustomerAuthRegister />,
      },
    ],
  },
]

const router = createBrowserRouter([
  {
    element: <OuterShell />,
    children: [...receptionistRoutes, ...customerRoutes],
  },
])

export default router
