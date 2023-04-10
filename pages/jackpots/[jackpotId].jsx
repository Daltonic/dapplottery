import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import DrawTime from '@/components/DrawTime'
import SubHeader from '@/components/SubHeader'
import Generator from '@/components/Generator'
import { globalActions } from '@/store/global_reducer'
import { getLottery, getLuckyNumbers, getPurchasedNumbers } from '@/services/blockchain.srr'
import { useEffect } from 'react'

export default function Draws({ lottery, lotteryNumbers, numbersPurchased }) {
  const { luckyNumbers, purchasedNumbers, jackpot } = useSelector((state) => state.globalState)
  const { setLuckyNumbers, setPurchasedNumbers, setJackpot } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setJackpot(lottery))
    dispatch(setLuckyNumbers(lotteryNumbers))
    dispatch(setPurchasedNumbers(numbersPurchased))
  }, [])

  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='min-h-screen bg-slate-100'>
        <SubHeader />
        <DrawTime jackpot={jackpot} luckyNumbers={luckyNumbers} participants={purchasedNumbers} />
        <Generator />
      </div>
    </div>
  )
}

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
