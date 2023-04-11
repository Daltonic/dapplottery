import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/global_reducer'
import { signUpWithCometChat, loginWithCometChat } from '@/services/chat'

const Chat = () => {
  const { chatModal, wallet } = useSelector((state) => state.globalState)
  const { setChatModal, setCurrentUser } = globalActions
  const dispatch = useDispatch()
  const { CometChat } = window

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${chatModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12  md:w-2/5 p-6  relative">
        <div className="flex items-center justify-between">
          <h2>Chat</h2>
          <FaTimes className="cursor-pointer" onClick={() => dispatch(setChatModal('scale-0'))} />
        </div>

        <div className="flex items-center justify-center space-x-4">hello</div>
      </div>
    </div>
  )
}

export default Chat
