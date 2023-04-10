import Head from 'next/head'
import Header from '../components/Header'
import Jackpots from '../components/Jackpots'
import { getLotteries } from '@/services/blockchain.srr'

export default function Home({ jackpots }) {
  return (
    <div>
      <Head>
        <title>Dapp Lottery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <Header />
        <Jackpots jackpots={jackpots} />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data = await getLotteries()
  return {
    props: { jackpots: JSON.parse(JSON.stringify(data)) },
  }
}
