import Head from 'next/head'
import DrawTime from '@/components/DrawTime'
import SubHeader from '@/components/SubHeader'
import Generator from '@/components/Generator'
import { getLottery, getLuckyNumbers } from '@/services/blockchain.srr'

export default function Draws({ jackpot, luckyNumbers }) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SubHeader />
        <DrawTime jackpot={jackpot} luckyNumbers={luckyNumbers} />
        <Generator />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { jackpotId } = context.query
  const jackpot = await getLottery(jackpotId)
  const luckyNumbers = await getLuckyNumbers(jackpotId)
  return {
    props: {
      jackpot: JSON.parse(JSON.stringify(jackpot)),
      luckyNumbers: JSON.parse(JSON.stringify(luckyNumbers)),
    },
  }
}
