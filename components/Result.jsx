import Link from 'next/link'
import Identicon from 'react-identicons'
import { useSelector, useDispatch } from 'react-redux'
import { FaEthereum } from 'react-icons/fa'
import Countdown from '@/components/Countdown'
import { truncate } from '@/services/blockchain'
import { globalActions } from '@/store/global_reducer'

const Result = ({ jackpot, participants, result }) => {
  const { wallet } = useSelector((state) => state.globalState)
  const { setWinnerModal } = globalActions
  const dispatch = useDispatch()

  return (
    <div className="mx-auto py-16 bg-slate-100 space-y-2">
      <div className="flex flex-col items-center justify-center text-center py-10">
        <h1 className="text-2xl font-bold pb-4">Lottery Result</h1>
        <p className="text-lg text-gray-600 font-semibold capitalize">{jackpot?.title}</p>
        <p className="text-sm text-gray-500 w-full sm:w-2/3">{jackpot?.description}</p>
        <p className="text-sm text-gray-500 w-full sm:w-2/3">
          Result for{' '}
          <span className="font-medium text-green-600">{result?.winners.length} winners</span> out
          of <span className="font-medium text-black">{jackpot?.participants} participants</span>{' '}
          <span className="font-medium text-gray-600">
            {result?.winners.length > 0 ? 'Drawn' : 'Not Drawn'}
          </span>
        </p>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4">
        {jackpot?.expiresAt ? <Countdown timestamp={jackpot?.expiresAt} /> : null}

        <div className="flex justify-center items-center space-x-2">
          {wallet.toLowerCase() == jackpot?.owner ? (
            <button
              disabled={jackpot?.expiresAt > Date.now()}
              onClick={() => dispatch(setWinnerModal('scale-100'))}
              className={`flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
            hover:bg-rose-600 font-semibold
              ${
                jackpot?.expiresAt > Date.now()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-rose-600'
              }`}
            >
              Perform Draw
            </button>
          ) : null}

          <Link
            href={`/jackpots/` + jackpot?.id}
            className="flex flex-nowrap border py-2 px-4 rounded-full bg-[#0c2856]
            hover:bg-[#1a396c] cursor-pointer font-semibold text-white"
          >
            Jackpot
          </Link>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row ">
        <div
          className="bg-white flex flex-col w-full sm:w-3/4 mx-auto
        p-5 rounded-md"
        >
          <h4 className="text-2xl font-bold text-slate-700 text-center">Winners & Lossers</h4>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {participants?.map((participant, i) => (
              <div
                key={i}
                className="flex justify-start items-center border-b border-gray-100 py-2 space-x-2"
              >
                <Identicon size={30} string={i} className="rounded-full h-12 w-12" />
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <p className="font-semibold text-lg text-slate-500">
                    {truncate(participant.account, 4, 4, 11)}
                  </p>
                  <p className="text-slate-500">{participant.lotteryNumber}</p>
                  {result?.winners.includes(participant.lotteryNumber) ? (
                    <p className="text-green-500 flex justify-start items-center">
                      + <FaEthereum /> {result?.sharePerWinner} {' winner'}
                    </p>
                  ) : (
                    <p className="text-red-500 flex justify-start items-center">
                      - <FaEthereum /> {jackpot?.ticketPrice}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
