import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { useLayoutEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/global_reducer'
import { sendMessage, getMessages, listenForMessage } from '@/services/chat'

const Chat = ({ id }) => {
  const { chatModal, wallet } = useSelector((state) => state.globalState)
  const { setChatModal } = globalActions
  const dispatch = useDispatch()
  const { CometChat } = window
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  useLayoutEffect(() => {
    setTimeout(async () => {
      getMessages(CometChat, `guid_${id}`).then((msgs) => {
        setMessages(msgs)
        scrollToEnd()
      })

      listenForMessage(CometChat, `guid_${id}`).then((msg) => {
        setMessages((prevMessages) => [...prevMessages, msg])
        scrollToEnd()
      })
    }, 500)
  }, [])

  const onSendMessage = async (e) => {
    e.preventDefault()
    if (!message) return

    new Promise(async (resolve, reject) => {
      await sendMessage(CometChat, `guid_${id}`, message)
        .then((msg) => {
          setMessages((prevMsgs) => [...prevMsgs, msg])
          setMessage('')
          resolve(msg)
          scrollToEnd()
        })
        .catch(() => reject())
    })
  }

  const scrollToEnd = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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

        <div className="flex flex-col overflow-y-scroll overflow-x-hidden h-[22rem] pb-5">
          {messages?.map((msg, i) => (
            <Message
              key={i}
              msg={msg.text}
              time={Number(msg.sentAt + '000')}
              uid={msg.sender.uid}
              isCurrentUser={msg.sender.uid != wallet.toLowerCase()}
            />
          ))}
          <div className="bg-transparent py-10" ref={messagesEndRef} />
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
