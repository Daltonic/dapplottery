import Head from 'next/head'
import Header from '../components/Header'
import Jackpots from '../components/Jackpots'
import { useSelector } from 'react-redux'

export default function Home() {
  const { jackpots } = useSelector((state) => state.jackpots)

  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <Jackpots jackpots={jackpots} />
      </div>
    </div>
  )
}
