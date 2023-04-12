import { initCometChat, checkAuthState } from '@/services/chat'
import { useEffect } from 'react'
import { globalActions } from '@/store/global_reducer'
import { useDispatch } from 'react-redux'
import { isWallectConnected } from '@/services/blockchain'

const CometChatNoSSR = () => {
  window.CometChat = require('@cometchat-pro/chat').CometChat
  const { CometChat } = window
  const { setCurrentUser } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    initCometChat(CometChat).then(() => {
      checkAuthState(CometChat).then((user) => {
        dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
      })
    })

    isWallectConnected(CometChat)
  }, [])
  return null
}

export default CometChatNoSSR
