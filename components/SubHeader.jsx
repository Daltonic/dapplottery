import Link from 'next/link'
import background from '@/assets/background.jpg'
import { useSelector } from 'react-redux'
import { connectWallet, truncate } from '@/services/blockchain'

const SubHeader = () => {
  const { wallet } = useSelector((state) => state.globalState)
  return (
    <div
      style={{ background: `url('${background.src}') fixed no-repeat top/cover` }}
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
          onClick={connectWallet}
          className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
          hover:bg-rose-600 cursor-pointer font-semibold text-sm"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default SubHeader
