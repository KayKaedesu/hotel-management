import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import HomePage from '../views/VisitorView/HomePage'
import AddCustomer from '../views/ReceiptionistView/AddCustomer'
import ReceptionShell from '../views/ReceiptionistView/shell'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/reception/" element={<ReceptionShell />}>
        <Route path="add_customer" element={<AddCustomer />} />
      </Route>
    </>
  )
)

export default router
