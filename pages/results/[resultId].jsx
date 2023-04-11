import Head from 'next/head'
import { useEffect } from 'react'
import Result from '@/components/Result'
import Winners from '@/components/Winners'
import SubHeader from '@/components/SubHeader'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/global_reducer'
import { getLottery, getLotteryResult, getParticipants } from '@/services/blockchain.srr'

export default function Results({ lottery, participantList, lotteryResult }) {
  const { participants, jackpot, result } = useSelector((state) => state.globalState)
  const { setParticipants, setJackpot, setResult } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setResult(lotteryResult))
    dispatch(setJackpot(lottery))
    dispatch(setParticipants(participantList))
  }, [])

  return (
    <div>
      <Head>
        <title>Dapp Lottery | Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <Result jackpot={jackpot} participants={participants} result={result} />
        <Winners />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { resultId } = context.query
  const lottery = await getLottery(resultId)
  const participantList = await getParticipants(resultId)
  const lotteryResult = await getLotteryResult(resultId)
  return {
    props: {
      lottery: JSON.parse(JSON.stringify(lottery)),
      participantList: JSON.parse(JSON.stringify(participantList)),
      lotteryResult: JSON.parse(JSON.stringify(lotteryResult)),
    },
  }
}
