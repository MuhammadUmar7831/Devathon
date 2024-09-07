
import Sidebar from "./components/sidebar"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"


function App() {
  return (
    <>


      <Router>
      <Sidebar />
        <Routes>
          {/* auth routes */}
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
