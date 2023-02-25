import { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import '@/styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
