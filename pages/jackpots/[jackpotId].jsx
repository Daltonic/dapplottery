import Head from 'next/head'
import { useEffect } from 'react'
import SubHeader from '@/components/SubHeader'
import Generator from '@/components/Generator'
import JackpotTable from '@/components/JackpotTable'
import { globalActions } from '@/store/globalSlices'
import { useDispatch, useSelector } from 'react-redux'
import { getLottery, getLuckyNumbers, getPurchasedNumbers } from '@/services/blockchain'

function Jackpot({ lottery, lotteryNumbers, numbersPurchased }) {
  const dispatch = useDispatch()
  const { setJackpot, setLuckyNumbers, setPurchasedNumbers } = globalActions
  const { luckyNumbers, purchasedNumbers, jackpot } = useSelector((states) => states.globalStates)

  useEffect(() => {
    dispatch(setJackpot(lottery))
    dispatch(setLuckyNumbers(lotteryNumbers))
    dispatch(setPurchasedNumbers(numbersPurchased))
  }, [])

  return (
    <div>
      <Head>
        <title>Dapp Lottery - Jackpot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <JackpotTable
          jackpot={jackpot}
          luckyNumbers={luckyNumbers}
          participants={purchasedNumbers}
        />
        <Generator />
      </div>
    </div>
  )
}

export default Jackpot

export const getServerSideProps = async (context) => {
  const { jackpotId } = context.query
  const lottery = await getLottery(jackpotId)
  const purchasedNumbers = await getPurchasedNumbers(jackpotId)
  const lotteryNumbers = await getLuckyNumbers(jackpotId)

  return {
    props: {
      lottery: JSON.parse(JSON.stringify(lottery)),
      lotteryNumbers: JSON.parse(JSON.stringify(lotteryNumbers)),
      numbersPurchased: JSON.parse(JSON.stringify(purchasedNumbers)),
    },
  }
}
