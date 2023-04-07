import { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/global.css'
import { useEffect, useState } from 'react'
import { isWallectConnected } from '@/services/blockchain'
import { ToastContainer } from 'react-toastify'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
    const fetchData = async () => await isWallectConnected()
    fetchData()
  }, [])

  if (!showChild || typeof window === 'undefined') {
    return null
  } else {
    return (
      <Provider store={store}>
        <Component {...pageProps} />

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Provider>
    )
  }
}
