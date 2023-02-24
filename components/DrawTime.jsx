import { useRouter } from 'next/router'

const DrawTime = () => {
  const navigate = useRouter()
  return (
    <div className="py-10 px-5 bg-slate-100">
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-4xl text-slate-700 text-center font-bold pb-3">
          Buy Lottery Tickets Online
        </p>
        <p className="text-2xl text-center text-gray-500">
          We bring a persolan and effective to every project we work on. <br />
          Which is why our client love why they keep coming back.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3 pb-20 flex-wrap">
        <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
          <p className="text-3xl text-gray-600 -light">29</p>
          <p className="text-xs font-semibold">WEEKS</p>
        </div>
        <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
          <p className="text-3xl text-gray-600 -light">07</p>
          <p className="text-xs font-semibold">DAYS</p>
        </div>
        <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
          <p className="text-3xl text-gray-600 -light">05</p>
          <p className="text-xs font-semibold">HOURS</p>
        </div>
        <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
          <p className="text-3xl text-gray-600 -light">34</p>
          <p className="text-xs font-semibold">MINUTES</p>
        </div>
        <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
          <p className="text-3xl text-gray-600 -light">27</p>
          <p className="text-xs font-semibold">SECONDS</p>
        </div>
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
