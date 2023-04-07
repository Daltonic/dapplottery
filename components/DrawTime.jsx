import { useRouter } from 'next/router'
import Countdown from '@/components/Countdown'
import { globalActions } from '@/store/global_reducer'
import { useDispatch } from 'react-redux'

const DrawTime = ({ jackpot }) => {
  const { setGeneratorModal } = globalActions
  const dispatch = useDispatch()
  const navigate = useRouter()
  return (
    <div className="py-10 px-5 bg-slate-100">
      <div className="flex flex-col items-center justify-center text-center py-10">
        <h4 className="text-4xl text-slate-700 text-center font-bold pb-3">
          Buy Lottery Tickets Online
        </h4>
        <p className="text-lg text-gray-600 font-semibold capitalize">{jackpot.title}</p>
        <p className="text-lg text-gray-500">{jackpot.description}</p>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4 mb-6">
        <Countdown timestamp={jackpot.expiresAt} />

        <button
          onClick={() => dispatch(setGeneratorModal('scale-100'))}
          className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
        hover:bg-rose-600 cursor-pointer font-semibold"
        >
          Generate Lucky Numbers
        </button>
      </div>

      <div className="bg-white text-sm overflow-x-auto flex flex-col w-full sm:w-3/4 mx-auto p-5 rounded-md">
        <div className="pb-4">
          <p className=" -semibold text-2xl">Select Your winning Lottery Numbers</p>
        </div>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 ">Lottery</th>
              <th className="px-4 py-2 ">Jackpot</th>
              <th className="px-4 py-2 ">Price</th>
              <th className="px-4 py-2 ">Time to Draw</th>
              <th className="px-4 py-2 ">Sold</th>
              <th className="px-4 py-2 ">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill()
              .map((item, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2 font-semibold text-center">Cancer Charity</td>
                  <td className="border px-4 py-2 font-semibold text-center">$200 million</td>
                  <td className="border px-4 py-2 font-semibold text-center">$2 </td>
                  <td className="border px-4 py-2 font-semibold text-center">
                    Wednesday and Saturday
                  </td>
                  <td className="border px-4 py-2 font-semibold text-center">59%</td>
                  <td className="border px-4 py-2 font-semibold">
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate.push('/results')}
                        className="bg-black hover:bg-rose-600 text-white text-sm py-2 px-4 rounded-full"
                      >
                        BUY NOW
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DrawTime
