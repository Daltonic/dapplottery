import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FaTimes } from 'react-icons/fa'
import { performDraw } from '@/services/blockchain'
import { useSelector, useDispatch } from 'react-redux'
import { globalActions } from '@/store/global_reducer'

const Winners = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { resultId } = router.query
  const { setWinnerModal } = globalActions
  const [numberOfwinner, setNumberOfwinner] = useState('')
  const { winnerModal } = useSelector((state) => state.globalState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await performDraw(resultId, numberOfwinner)
          .then(async () => {
            setNumberOfwinner('')
            dispatch(setWinnerModal('scale-0'))
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
      transform transition-transform duration-300 ${winnerModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-[#0c2856] rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Emerging Winners</p>
            <button
              onClick={() => dispatch(setWinnerModal('scale-0'))}
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
              name="numberOfwinner"
              placeholder="Lucky Numbers e.g 19"
              onChange={(e) => setNumberOfwinner(e.target.value)}
              value={numberOfwinner}
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
