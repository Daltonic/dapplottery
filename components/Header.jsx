import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { connectWallet, truncate } from '@/services/blockchain'

const networking =
  'https://dapplottery.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnetworking.1f3500e7.png&w=3840&q=75'
const background = 'https://dapplottery.vercel.app/_next/static/media/background.a7d45fa2.jpg'

const Header = () => {
  const { wallet } = useSelector((states) => states.globalStates)

  return (
    <div
      className="px-5 md:px-40"
      style={{ background: `url('${background}') fixed no-repeat top/cover` }}
    >
      <div className="flex items-center justify-between text-white py-5">
        <h1 className="text-xl font-bold">DappLottery</h1>

        <div className="hidden lg:flex items-center space-x-3 font-semibold">
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

      <div className="flex items-center justify-between pb-5">
        <div>
          <div className="text-white py-5">
            <h2 className="text-4xl font-bold py-4 ">
              Take the chance to <br /> change your life
            </h2>

            <p className="text-xl">
              We bring a persolan and effective to every project we work on. <br />
              Which is why our client love why they keep coming back.
            </p>
          </div>
        </div>

        <div className="py-5 hidden sm:block">
          <Image
            src={networking}
            width={100}
            height={100}
            alt="network"
            className="rounded-lg w-80"
          />
        </div>
      </div>

      <div className="pb-10">
        <Link
          href={'/create'}
          className="bg-amber-500 hover:bg-rose-600 text-white rounded-md
            cursor-pointer font-semibold py-3 px-5"
        >
          Create Jackpot
        </Link>
      </div>
    </div>
  )
}

export default Header
