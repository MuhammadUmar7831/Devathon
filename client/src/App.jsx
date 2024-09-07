import Layout from "./components/Layout"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import PrivateRoutes from "./components/PrivateRoutes"
import ManageAccounts from "./pages/admin/manageAccounts/ManageAccounts"
import AddCustomerSupport from "./pages/admin/addCustomerSupport/AddCustomerSupport"
import Bills from "./pages/admin/bills/Bills"
import ViewBills from "./pages/resident/viewBills/ViewBills"

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* auth routes */}
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoutes role="admin" />}>
            <Route path="/admin/manageAccounts" element={<ManageAccounts />} />
            <Route
              path="/admin/addCustomerSupport"
              element={<AddCustomerSupport />}
            />
            <Route path="/admin/bills" element={<Bills />} />
          </Route>

          {/* Resident Routes */}
          <Route element={<PrivateRoutes role="resident" />}>
            <Route path="/resident/viewBills" element={<ViewBills />} />
          </Route>

          {/* Customer Support Routes */}
          <Route element={<PrivateRoutes role="customerSupport" />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
