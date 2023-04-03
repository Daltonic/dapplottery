import { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import '@/styles/global.css'
import { useEffect } from 'react'
import { isWallectConnected } from '@/services/blockchain'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const fetchData = async () => await isWallectConnected()
    fetchData()
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
