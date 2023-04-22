import '@/styles/global.css'
import { store } from '@/store'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { monitorWalletConnection } from '@/services/blockchain'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
    monitorWalletConnection()
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
