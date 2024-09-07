import Layout from "./components/Layout"
import Profile from "./pages/resident/Profile"

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
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* auth routes */}
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoutes role="admin" />}></Route>
          <Route path="/admin/manageAccounts" element={<ManageAccounts />} />

          {/* Resident Routes */}
          <Route element={<PrivateRoutes role="resident" />}>
            <Route path="/resident/profile" element={<Profile />} />
          </Route>

          {/* Customer Support Routes */}
          <Route element={<PrivateRoutes role="customerSupport" />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
