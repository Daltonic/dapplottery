import Head from 'next/head'
import Result from '../../components/Result'
import SubHeader from '../../components/SubHeader'
import { getLottery } from '@/services/blockchain.srr'

export default function Results({ jackpot }) {
  return (
    <div>
      <Head>
        <title>Dapp Lottery | Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <SubHeader />
        <Result jackpot={jackpot} />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { resultId } = context.query
  const jackpot = await getLottery(resultId)
  return {
    props: {
      jackpot: JSON.parse(JSON.stringify(jackpot)),
    },
  }
}
