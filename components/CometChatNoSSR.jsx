import { initCometChat, logOutWithCometChat } from '@/services/chat'
import { useEffect } from 'react'

const CometChatNoSSR = () => {
  window.CometChat = require('@cometchat-pro/chat').CometChat
  const { CometChat } = window

  useEffect(() => {
    initCometChat(CometChat)
    window.ethereum.on('accountsChanged', async () => {
      logOutWithCometChat(CometChat).then(() => console.log('Logged out'))
    })
  }, [])
  return null
}

export default CometChatNoSSR
