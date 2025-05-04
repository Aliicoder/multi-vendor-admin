import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
function RootLayout() {
  return (
    <>
      <Outlet/>
      <Toaster 
          toastOptions={{
            position:"top-right",
            className:"noOutline"
          }}
        />
    </>
  )
}

export default RootLayout


