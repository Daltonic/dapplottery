import Link from 'next/link'
import { useSelector } from 'react-redux'
import { connectWallet, truncate } from '@/services/blockchain'
const background = 'https://dapplottery.vercel.app/_next/static/media/background.a7d45fa2.jpg'

const SubHeader = () => {
  const { wallet } = useSelector((states) => states.globalStates)
  return (
    <div
      style={{ background: `url('${background}') fixed no-repeat top/cover` }}
      className="flex items-center justify-between text-white px-10 py-5"
    >
      <div>
        <Link href="/" className="text-xl font-bold">
          DappLottery
        </Link>
      </div>

      <div className="hidden lg:flex items-center space-x-6 font-semibold">
        <p>Home</p>
        <p>How To Play</p>
        <p>All Lottery</p>
        <p>Contact</p>
      </div>

      {wallet ? (
        <button
          className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
          hover:bg-rose-600 cursor-pointer font-semibold text-sm"
        >
          {truncate(wallet, 4, 4, 11)}
        </button>
      ) : (
        <button
          className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
          hover:bg-rose-600 cursor-pointer font-semibold text-sm"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default SubHeader
