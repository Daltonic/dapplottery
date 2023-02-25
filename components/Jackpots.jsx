import leopard from '../assets/turtle.png'
import turtle from '../assets/octupus.png'
import octupus from '../assets/leopard.jpg'
import Link from 'next/link'
import Image from 'next/image'

const Jackpots = ({ jackpots }) => {
  return (
    <div className="bg-slate-100 pt-5">
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-800 py-5">Lottery Jackpots</h1>
        <p className="text-center text-sm text-slate-600">
          We bring a persolan and effective every project we work on. <br />
          which is why our client love why they keep coming back.
        </p>
      </div>

      <div className="flex items-center justify-center py-20 w-4/5 mx-auto">
        {jackpots.map((jackpot, i) => (
          <Jackpot jackpot={jackpot} key={i} />
        ))}
      </div>
    </div>
  )
}

const Jackpot = ({ jackpot }) => {
  return (
    <div className="min-w-64 min-h-60 rounded-lg bg-white m-2 px-5 py-7 ">
      <div className="flex items-center pb-5">
        <div>
          <Image src={jackpot.image} alt="icon" className="rounded-lg w-20" />
        </div>
        <div>
          <p className="text-green-300">ETH {jackpot.prize}</p>
          <p className="text-sm text-gray-500">Next Draw: {jackpot.draw_date}</p>
        </div>
      </div>
      <div className="pb-6">
        <p className="font-semibold pb-2 text-slate-700">{jackpot.name}</p>
        <p className="text-sm leading-5 text-gray-500">{jackpot.description}</p>
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
  )
}

export default Jackpots
