import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/global_reducer'
import { signUpWithCometChat, loginWithCometChat } from '@/services/chat'

const AuthChat = () => {
  const { authModal, wallet } = useSelector((state) => state.globalState)
  const { setAuthModal, setCurrentUser } = globalActions
  const dispatch = useDispatch()
  const { CometChat } = window

  const handleSignUp = async () => {
    if (!wallet) return toast.warning('Connect your wallet')
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await signUpWithCometChat(CometChat, wallet)
          .then((user) => {
            dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Signing up...',
        success: 'Account created, please login 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleLogin = async () => {
    if (!wallet) return toast.warning('Connect your wallet')
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await loginWithCometChat(CometChat, wallet)
          .then(async (user) => {
            dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
            dispatch(setAuthModal('scale-0'))
            resolve()
            window.location.reload()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Logging in...',
        success: 'login successfull 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${authModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12  md:w-2/5 p-6  relative">
        <div className="flex items-center justify-between">
          <h2>Auth</h2>
          <FaTimes className="cursor-pointer" onClick={() => dispatch(setAuthModal('scale-0'))} />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            className="p-2 bg-amber-600 rounded-md text-white focus:outline-none focus:ring-0"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="p-2 bg-gray-600 rounded-md text-white focus:outline-none focus:ring-0"
            onClick={handleSignUp}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthChat
