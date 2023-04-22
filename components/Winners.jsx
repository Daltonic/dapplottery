import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { toast } from 'react-toastify'
import { performDraw } from '@/services/blockchain'
import { useRouter } from 'next/router'

const Winners = () => {
  const router = useRouter()
  const { resultId } = router.query
  const [numberOfwinners, setNumberOfwinners] = useState('')

  const { setWinnersModal } = globalActions
  const dispatch = useDispatch()
  const { winnersModal } = useSelector((states) => states.globalStates)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await performDraw(resultId, numberOfwinners)
          .then(async () => {
            setNumberOfwinners('')
            dispatch(setWinnersModal('scale-0'))
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Draw performed successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center bg-black bg-opacity-50
      transform transition-transform duration-300 ${winnersModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-[#0c2856] rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Emerging Winners</p>
            <button
              onClick={() => dispatch(setWinnersModal('scale-0'))}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl p-2.5 my-5"
          >
            <input
              className="block w-full bg-transparent
              border-0 text-sm text-slate-500 focus:outline-none
              focus:ring-0"
              type="number"
              step={1}
              min={1}
              name="numberOfwinners"
              placeholder="Winners e.g 3"
              onChange={(e) => setNumberOfwinners(e.target.value)}
              value={numberOfwinners}
            />
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center
              w-full text-white text-md py-2 px-5 rounded-full
              drop-shadow-xl bg-[#0c2856] hover:bg-[#1a396c]"
          >
            Draw Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default Winners
