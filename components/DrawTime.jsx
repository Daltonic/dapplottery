import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FaEthereum } from 'react-icons/fa'
import Countdown from '@/components/Countdown'
import { buyTicket } from '@/services/blockchain'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/global_reducer'
import { createNewGroup, joinGroup } from '@/services/chat'

const DrawTime = ({ jackpot, luckyNumbers, participants }) => {
  const { setGeneratorModal, setAuthModal, setChatModal, setGroup } = globalActions
  const { wallet, currentUser, group } = useSelector((state) => state.globalState)
  const dispatch = useDispatch()
  const router = useRouter()
  const { jackpotId } = router.query
  const { CometChat } = window

  const handlePurchase = async (luckyNumberId) => {
    if (!wallet) return toast.warning('Connect your wallet')
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await buyTicket(jackpotId, luckyNumberId, jackpot?.ticketPrice)
          .then(async () => {
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Ticket purchased successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleGroupCreation = async () => {
    if (!currentUser) return toast.warning('Please authenticate chat')
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await createNewGroup(CometChat, `guid_${jackpot?.id}`, jackpot?.title)
          .then((group) => {
            dispatch(setGroup(JSON.parse(JSON.stringify(group))))
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Creating group...',
        success: 'Group created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleGroupJoin = async () => {
    if (!currentUser) return toast.warning('Please authenticate chat')
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await joinGroup(CometChat, `guid_${jackpot?.id}`)
          .then((group) => {
            dispatch(setGroup(JSON.parse(JSON.stringify(group))))
            resolve()
            window.location.reload()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Joining group...',
        success: 'Group joined successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const onGenerate = () => {
    if (luckyNumbers.length > 0) return toast.warning('Already generated')
    dispatch(setGeneratorModal('scale-100'))
  }

  return (
    <div className="py-10 px-5 bg-slate-100">
      <div className="flex flex-col items-center justify-center text-center py-10">
        <h4 className="text-4xl text-slate-700 text-center font-bold pb-3">
          Buy Lottery Tickets Online
        </h4>
        <p className="text-lg text-gray-600 font-semibold capitalize">{jackpot?.title}</p>
        <p className="text-sm text-gray-500 w-full sm:w-2/3">{jackpot?.description}</p>
        <p className="text-sm font-medium text-black w-full sm:w-2/3">
          {jackpot?.participants} participants
        </p>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4 mb-6">
        {jackpot?.expiresAt ? <Countdown timestamp={jackpot?.expiresAt} /> : null}

        <div className="flex justify-center items-center space-x-2">
          {wallet?.toLowerCase() == jackpot?.owner ? (
            <>
              <button
                disabled={jackpot?.expiresAt < Date.now()}
                onClick={onGenerate}
                className={`flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
                hover:bg-rose-600 font-semibold
                ${
                  jackpot?.expiresAt < Date.now()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-rose-600'
                }
                `}
              >
                Generate Lucky Numbers
              </button>

              {!group ? (
                <button
                  onClick={handleGroupCreation}
                  className="flex flex-nowrap border py-2 px-4 rounded-full bg-gray-500
                hover:bg-rose-600 font-semibold text-white"
                >
                  Create Group
                </button>
              ) : null}
            </>
          ) : group && !group.hasJoined ? (
            <button
              onClick={handleGroupJoin}
              className="flex flex-nowrap border py-2 px-4 rounded-full bg-gray-500
                hover:bg-rose-600 font-semibold text-white"
            >
              Join Group
            </button>
          ) : null}

          <Link
            href={`/results/` + jackpot?.id}
            className="flex flex-nowrap border py-2 px-4 rounded-full bg-[#0c2856]
            hover:bg-[#1a396c] cursor-pointer font-semibold text-white"
          >
            Draw Result
          </Link>

          {!currentUser ? (
            <button
              onClick={() => dispatch(setAuthModal('scale-100'))}
              className="flex flex-nowrap border py-2 px-4 rounded-full bg-green-500
                hover:bg-amber-600 font-semibold"
            >
              Login Chat
            </button>
          ) : (
            <button
              onClick={() => dispatch(setChatModal('scale-100'))}
              className="flex flex-nowrap border py-2 px-4 rounded-full bg-green-500
            hover:bg-amber-600 font-semibold"
            >
              Enter Chat
            </button>
          )}
        </div>
      </div>

      <div className="bg-white text-sm overflow-x-auto flex flex-col w-full sm:w-3/4 mx-auto p-5 rounded-md">
        <div className="pb-4 text-center">
          <p className="semibold text-2xl">Select Your winning Lottery Numbers</p>
        </div>

        <table className="table-auto">
          <thead className="max-h-80 overflow-y-auto block">
            <tr className="flex justify-between text-left">
              <th className="px-4 py-2 ">#</th>
              <th className="px-4 py-2 ">Ticket Price</th>
              <th className="px-4 py-2 ">Draw Date</th>
              <th className="px-4 py-2 ">Ticket Number</th>
              <th className="px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody className="max-h-80 overflow-y-auto block">
            {luckyNumbers?.map((luckyNumber, i) => (
              <tr className="flex justify-between border-b text-left" key={i}>
                <td className="px-4 py-2 font-semibold">{i + 1}</td>
                <td className="px-4 py-2 font-semibold">
                  <div className="flex justify-center items-center space-x-1">
                    <FaEthereum />
                    <span>{jackpot?.ticketPrice}</span>
                  </div>
                </td>
                <td className="px-4 py-2 font-semibold">{jackpot?.drawsAt}</td>
                <td className="px-4 py-2 font-semibold">{luckyNumber}</td>
                <td className="px-4 py-2 font-semibold">
                  <button
                    disabled={participants.includes(luckyNumber)}
                    onClick={() => handlePurchase(i)}
                    className={`bg-black ${
                      participants.includes(luckyNumber)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-rose-600'
                    } text-white text-sm py-2 px-4 rounded-full`}
                  >
                    BUY NOW
                  </button>
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
