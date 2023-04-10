import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import DrawTime from '@/components/DrawTime'
import SubHeader from '@/components/SubHeader'
import Generator from '@/components/Generator'
import { globalActions } from '@/store/global_reducer'
import { getLottery, getLuckyNumbers, getParticipants } from '@/services/blockchain.srr'
import { useEffect } from 'react'

export default function Draws({ jackpot, lotteryNumbers, purchasedNumbers }) {
  const { luckyNumbers, participants } = useSelector((state) => state.globalState)
  const { setLuckyNumbers, setParticipants } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLuckyNumbers(lotteryNumbers))
    dispatch(setParticipants(purchasedNumbers))
  }, [])

  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SubHeader />
        <DrawTime jackpot={jackpot} luckyNumbers={luckyNumbers} participants={participants} />
        <Generator />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { jackpotId } = context.query
  const jackpot = await getLottery(jackpotId)
  const purchasedNumbers = await getParticipants(jackpotId)
  const lotteryNumbers = await getLuckyNumbers(jackpotId)
  return {
    props: {
      jackpot: JSON.parse(JSON.stringify(jackpot)),
      lotteryNumbers: JSON.parse(JSON.stringify(lotteryNumbers)),
      purchasedNumbers: JSON.parse(JSON.stringify(purchasedNumbers)),
    },
  }
}
