import Head from 'next/head'
import Header from '../components/Header'
import Jackpots from '../components/Jackpots'
import { useSelector } from 'react-redux'
import { getLotteries } from '@/services/blockchain.srr'
import { useEffect } from 'react'

export default function Home({ jackpots }) {
  jackpots = JSON.parse(jackpots)
  // useEffect(() => {
  //   const fetchData = async () => console.log(data)
  //   fetchData()
  // }, [])

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

export const getServerSideProps = async () => {
  let data = await getLotteries()
  const structureLotteries = (lotteries) =>
    lotteries.map((lottery) => ({
      id: Number(lottery.id),
      title: lottery.name,
      description: lottery.description,
      prize: Number(lottery.prize),
      ticketPrice: Number(lottery.ticketPrice),
      image: lottery.image,
      createdAt: new Date(lottery.createdAt * 1000).toDateString(),
      expiresAt: new Date(lottery.expiresAt * 1000).toDateString(),
      drawn: lottery.drawn,
    }))

  data = structureLotteries(data[0])
  return {
    props: { jackpots: JSON.stringify(data) },
  }
}
