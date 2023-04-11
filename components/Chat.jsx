import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/global_reducer'
import { signUpWithCometChat, loginWithCometChat } from '@/services/chat'
import { useEffect } from 'react'

const Chat = () => {
  const { chatModal, wallet } = useSelector((state) => state.globalState)
  const { setChatModal, setCurrentUser } = globalActions
  const dispatch = useDispatch()
  const { CometChat } = window

  useEffect(() => {
    scrollToEnd()
  }, [])

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages-container')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${chatModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-4/5 h-[30rem] p-6 relative">
        <div className="flex items-center justify-between">
          <h2>Chat</h2>
          <FaTimes className="cursor-pointer" onClick={() => dispatch(setChatModal('scale-0'))} />
        </div>

        <div
          id="messages-container"
          className="flex flex-col overflow-y-scroll overflow-x-hidden h-[22rem]"
        >
          <div className="flex flex-col items-start mt-4">
            <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-xs">
              <p className="text-black ">Hey there! How can I help you today?</p>
            </div>
            <span className="text-gray-500 text-sm mt-2">10:30 AM</span>
          </div>

          <div className="flex flex-col items-end mt-4">
            <div className="bg-amber-500 py-2 px-4 rounded-lg max-w-xs">
              <p className='text-white'>Hi, I have a question about your services.</p>
            </div>
            <span className="text-gray-500 text-sm mt-2">10:32 AM</span>
          </div>
        </div>

        <form className="h-18 w-full mt-3">
          <input
            type="text"
            className="h-full w-full py-5 px-3 focus:outline-none focus:ring-0 rounded-md
            border-none bg-slate-800 text-white placeholder-white"
            placeholder="Leave a message..."
          />
        </form>
      </div>
    </div>
  )
}

export default Chat
