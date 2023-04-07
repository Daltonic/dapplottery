import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FaTimes } from 'react-icons/fa'
import { exportLuckyNumbers } from '@/services/blockchain'
import { useSelector, useDispatch } from 'react-redux'
import { globalActions } from '@/store/global_reducer'

const Generator = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { jackpotId } = router.query
  const { setGeneratorModal } = globalActions
  const [luckyNumbers, setLuckyNumbers] = useState('')
  const { generatorModal } = useSelector((state) => state.globalState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await exportLuckyNumbers(jackpotId, generateLuckyNumbers(luckyNumbers))
          .then(async () => {
            setLuckyNumbers('')
            dispatch(setGeneratorModal('scale-0'))
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Lucky numbers saved to chain 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const generateLuckyNumbers = (count) => {
    const result = []
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
      let string = ''
      for (let j = 0; j < 6; j++) {
        string += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      result.push(string)
    }
    return result
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center bg-black bg-opacity-50
      transform transition-transform duration-300 ${generatorModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-[#0c2856] rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Generate Numbers</p>
            <button
              onClick={() => dispatch(setGeneratorModal('scale-0'))}
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
              name="luckyNumbers"
              placeholder="Lucky Numbers e.g 19"
              onChange={(e) => setLuckyNumbers(e.target.value)}
              value={luckyNumbers}
            />
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center
              w-full text-white text-md py-2 px-5 rounded-full
              drop-shadow-xl bg-[#0c2856] hover:bg-[#1a396c]"
          >
            Generate and Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default Generator
