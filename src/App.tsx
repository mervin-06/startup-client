import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/Router'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer position="top-center"/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
