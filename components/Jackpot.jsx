import leopard from '../assets/turtle.png'
import turtle from '../assets/octupus.png'
import octupus from '../assets/leopard.jpg'
import Link from 'next/link'
import Image from 'next/image'

const Jackpot = () => {
  return (
    <div className="bg-slate-100 pt-5">
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-800 py-5">Lottery Jackpots</h1>
        <p className="text-center text-sm text-slate-600">
          We bring a persolan and effective every project we work on. <br />
          which is why our client love why they keep coming back.
        </p>
      </div>

      <div className="flex items-center justify-center py-20 flex-wrap">
        <div className="min-w-64 min-h-60 rounded-lg bg-white m-2 px-5 py-7 ">
          <div className="flex items-center pb-5">
            <div>
              <Image src={octupus} alt="icon" className="rounded-lg w-20" />
            </div>
            <div>
              <p className="text-green-300">$181,557,581</p>
              <p className="text-sm text-gray-500">Next Draw: 03 days 04:21</p>
            </div>
          </div>
          <div className="pb-6">
            <p className="font-semibold pb-2 text-slate-700">US Powerball</p>
            <p className="text-sm leading-5 text-gray-500">
              We bring persolan and effective to every <br /> project we work on. Which is why our{' '}
              <br /> client love why they keep coming back.
            </p>
          </div>
          <div>
            <Link
              href="/draws"
              className="bg-green-500 hover:bg-rose-600 py-2 px-5
              rounded-md text-white font-semibold"
            >
              PLAY NOW
            </Link>
          </div>
        </div>

        <div className="min-w-64 min-h-60 rounded-lg bg-white m-2 px-5 py-7">
          <div className="flex items-center pb-5">
            <div>
              <Image src={turtle} alt="icon" className="rounded-lg w-20" />
            </div>
            <div>
              <p className="text-green-300">$181,557,581</p>
              <p className="text-sm text-gray-500">Next Draw: 03 days 04:21</p>
            </div>
          </div>
          <div className="pb-6">
            <p className="font-semibold pb-2 text-slate-700">Cancer Charity</p>
            <p className="text-sm leading-5 text-gray-500">
              We bring persolan and effective to every <br /> project we work on. Which is why our{' '}
              <br /> client love why they keep coming back.
            </p>
          </div>
          <div>
            <Link
              href="/draws"
              className="bg-sky-400 hover:bg-rose-600 py-2 px-5 rounded-md text-white font-semibold"
            >
              PLAY NOW
            </Link>
          </div>
        </div>

        <div className="min-w-64 min-h-60 rounded-lg bg-white m-2 px-5 py-7">
          <div className="flex items-center pb-5">
            <div>
              <Image src={leopard} alt="icon" className="rounded-lg w-20" />
            </div>
            <div>
              <p className="text-green-300">$181,557,581</p>
              <p className="text-sm text-gray-500">Next Draw: 03 days 04:21</p>
            </div>
          </div>
          <div className="pb-6">
            <p className="font-semibold pb-2 text-slate-700">Euro Jackpot</p>
            <p className="text-sm leading-5 text-gray-500">
              We bring persolan and effective to every <br /> project we work on. Which is why our{' '}
              <br /> client love why they keep coming back.
            </p>
          </div>
          <div>
            <Link
              href="/draws"
              className="bg-amber-500 hover:bg-rose-600 py-2 px-5
              rounded-md text-white font-semibold"
            >
              PLAY NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jackpot
