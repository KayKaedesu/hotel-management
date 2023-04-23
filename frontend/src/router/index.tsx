import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteObject,
} from 'react-router-dom'

import Home from '../views/Home'
import AddCustomer from '../views/ReceiptionView/AddCustomer'
import ReceptionistShell from '../views/ReceiptionView/shell'
import CheckRoom from '../views/ReceiptionView/Rooms'
import CustomerShell from '../views/CustomerView/shell'
import CustomerRoomTypes from '../views/CustomerView/RoomTypes'
import CustomerHome from '../views/CustomerView/Home'
import CustomerReserveRoom from '../views/CustomerView/ReserveRoom'
import CustomerAbout from '../views/CustomerView/About'
import CustomerAuthLogin from '../views/CustomerView/auth/Login'
import CustomerAuthRegister from '../views/CustomerView/auth/Register'
import CustomerAuthShell from '../views/CustomerView/auth/shell'
import CustomerListReserves from '../views/CustomerView/ListReserves'
import EmployeeShell from '../views/EmployeeView/shell'
import EmployeeWorks from '../views/EmployeeView/Works'
import OwnerShell from '../views/OwnerView/shell'
import CheckEmployees from '../views/OwnerView/EmployeeList'

export const receptionistRoutes: RouteObject[] = [
  {
    path: '/reception/',
    element: <ReceptionistShell />,
    children: [
      {
        path: 'add-customer',
        element: <AddCustomer />,
      },
      {
        path: 'rooms',
        element: <CheckRoom />,
      },
      // {
      //   path: 'add-customer',
      //   element: <AddCustomer />,
      // },
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
      {
        path: 'list-reserves',
        element: <CustomerListReserves />,
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

const employeeRoutes: RouteObject[] = [
  {
    element: <EmployeeShell />,
    path: '/employee',
    children: [
      {
        path: '',
        element: <EmployeeWorks />,
      },
    ],
  },
]

const ownerRoutes: RouteObject[] = [
  {
    element: <OwnerShell />,
    path: '/owner',
    children: [
      {
        path: 'employee-list',
        element: <CheckEmployees />,
      },
    ],
  },
]

const homeRouter: RouteObject = {
  path: '/',
  element: <Home />,
}

const router = createBrowserRouter([
  {
    children: [
      homeRouter,
      ...receptionistRoutes,
      ...customerRoutes,
      ...employeeRoutes,
      ...ownerRoutes,
    ],
  },
])

export default router
