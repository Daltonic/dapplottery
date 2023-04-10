import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import DrawTime from '@/components/DrawTime'
import SubHeader from '@/components/SubHeader'
import Generator from '@/components/Generator'
import { globalActions } from '@/store/global_reducer'
import { getLottery, getLuckyNumbers, getParticipants } from '@/services/blockchain.srr'
import { useEffect } from 'react'

export default function Draws({ jackpot, lotteryNumbers, participants }) {
  const { luckyNumbers } = useSelector((state) => state.globalState)
  const { setLuckyNumbers } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLuckyNumbers(lotteryNumbers))
    console.log(participants)
  }, [])

  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SubHeader />
        <DrawTime jackpot={jackpot} luckyNumbers={luckyNumbers} participants={[]} />
        <Generator />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { jackpotId } = context.query
  const jackpot = await getLottery(jackpotId)
  const participants = await getParticipants(jackpotId)
  const lotteryNumbers = await getLuckyNumbers(jackpotId)
  return {
    props: {
      jackpot: JSON.parse(JSON.stringify(jackpot)),
      lotteryNumbers: JSON.parse(JSON.stringify(lotteryNumbers)),
      participants: JSON.parse(JSON.stringify(participants)),
    },
  }
}
