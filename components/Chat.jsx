import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/global_reducer'
import { sendMessage, getMessages } from '@/services/chat'
import { useEffect, useState } from 'react'

const Chat = ({ id }) => {
  const { chatModal, wallet } = useSelector((state) => state.globalState)
  const { setChatModal } = globalActions
  const dispatch = useDispatch()
  const { CometChat } = window
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setTimeout(async () => {
      getMessages(CometChat, `guid_${id}`).then((msgs) => setMessages(msgs))
    }, 500)
    scrollToEnd()
  }, [])

  const onSendMessage = async (e) => {
    e.preventDefault()
    if (!message) return

    new Promise(async (resolve, reject) => {
      await sendMessage(CometChat, `guid_${id}`, message)
        .then((msg) => {
          setMessages((prevMsgs) => [...prevMsgs, msg])
          setMessage('')
          scrollToEnd()
          resolve(msg)
        })
        .catch(() => reject())
    })
  }

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
          {messages.map((msg, i) => (
            <Message
              key={i}
              msg={msg.text}
              time={Number(msg.sentAt + '000')}
              uid={msg.sender.uid}
              isCurrentUser={msg.sender.uid != wallet.toLowerCase()}
            />
          ))}
        </div>

        <form onSubmit={onSendMessage} className="h-18 w-full mt-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

const Message = ({ msg, isCurrentUser, time, uid }) => {
  return isCurrentUser ? (
    <div className="flex flex-col items-start mt-4">
      <div className="flex justify-start items-start space-x-2">
        <Identicon string={uid} size={30} className="rounded-full shadow-md" />
        <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-xs">
          <p className="text-black ">{msg}</p>
        </div>
      </div>
      <span className="text-gray-500 text-sm mt-2">{new Date(time).toLocaleString()}</span>
    </div>
  ) : (
    <div className="flex flex-col items-end mt-4">
      <div className="flex justify-start items-start space-x-2">
        <Identicon string={uid} size={30} className="rounded-full shadow-md" />
        <div className="bg-amber-500 py-2 px-4 rounded-lg max-w-xs">
          <p className="text-white">{msg}</p>
        </div>
      </div>
      <span className="text-gray-500 text-sm mt-2">{new Date(time).toLocaleString()}</span>
    </div>
  )
}
