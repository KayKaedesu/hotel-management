import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import HomePage from '../views/VisitorView/HomePage'
import ReceptionSideBar from '../views/ReceiptionistView/SideBar'
import AddCustomer from '../views/ReceiptionistView/AddCustomer'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/reception/" element={<ReceptionSideBar />}>
        <Route path="add_customer" element={<AddCustomer />}></Route>
      </Route>
    </>
  )
)

export default router
