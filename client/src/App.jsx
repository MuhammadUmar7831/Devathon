import Layout from "./components/Layout"
import Profile from "./pages/resident/Profile"

function App() {
  return (
    <>
      <Layout children={<Profile />} />
    </>
  )
}

export default App
