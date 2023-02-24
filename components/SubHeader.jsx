import Link from 'next/link'
import background from '../assets/background.jpg'

const SubHeader = () => {
  return (
    <div
      style={{ background: `url('${background.src}') fixed no-repeat top/cover` }}
      className="flex items-center justify-between text-white px-10 py-5"
    >
      <div>
        <Link href="/" className="text-3xl font-bold">
          DappLottery
        </Link>
      </div>

      <div className="hidden lg:flex items-center space-x-6 font-semibold">
        <p>Home</p>
        <p>How To Play</p>
        <p>All Lottery</p>
        <p>Contact</p>
      </div>

      <div>
        <a className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
        hover:bg-rose-600 cursor-pointer font-semibold">
          Connect Wallet
        </a>
      </div>
    </div>
  )
}

export default SubHeader
