import { initCometChat, logOutWithCometChat, checkAuthState } from '@/services/chat'
import { useEffect } from 'react'
import { globalActions } from '@/store/global_reducer'
import { useDispatch } from 'react-redux'

const CometChatNoSSR = () => {
  window.CometChat = require('@cometchat-pro/chat').CometChat
  const { CometChat } = window
  const { setCurrentUser } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    initCometChat(CometChat).then(() => {
      checkAuthState(CometChat).then((user) =>
        dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
      )
    })
    window.ethereum.on('accountsChanged', async () => {
      logOutWithCometChat(CometChat).then(() => console.log('Logged out'))
    })
  }, [])
  return null
}

export default CometChatNoSSR
