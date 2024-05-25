import './App.css'
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}

export default App
