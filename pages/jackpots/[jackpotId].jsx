import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import DrawTime from '@/components/DrawTime'
import SubHeader from '@/components/SubHeader'
import Generator from '@/components/Generator'
import { globalActions } from '@/store/global_reducer'
import { getLottery, getLuckyNumbers, getPurchasedNumbers } from '@/services/blockchain.srr'
import { useEffect } from 'react'

export default function Draws({ jackpot, lotteryNumbers, numbersPurchased }) {
  const { luckyNumbers, purchasedNumbers } = useSelector((state) => state.globalState)
  const { setLuckyNumbers, setPurchasedNumbers } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLuckyNumbers(lotteryNumbers))
    dispatch(setPurchasedNumbers(numbersPurchased))
  }, [])

  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SubHeader />
        <DrawTime jackpot={jackpot} luckyNumbers={luckyNumbers} participants={purchasedNumbers} />
        <Generator />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { jackpotId } = context.query
  const jackpot = await getLottery(jackpotId)
  const purchasedNumbers = await getPurchasedNumbers(jackpotId)
  const lotteryNumbers = await getLuckyNumbers(jackpotId)
  return {
    props: {
      jackpot: JSON.parse(JSON.stringify(jackpot)),
      lotteryNumbers: JSON.parse(JSON.stringify(lotteryNumbers)),
      numbersPurchased: JSON.parse(JSON.stringify(purchasedNumbers)),
    },
  }
}
