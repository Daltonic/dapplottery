const CONSTANTS = {
  APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  REGION: process.env.NEXT_PUBLIC_REGION,
  Auth_Key: process.env.NEXT_PUBLIC_AUTH_KEY,
}

const initCometChat = async (CometChat) => {
  const appID = CONSTANTS.APP_ID
  const region = CONSTANTS.REGION

  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build()

  await CometChat.init(appID, appSetting)
    .then(() => console.log('Initialization completed successfully'))
    .catch((error) => console.log(error))
}

const loginWithCometChat = async (CometChat, UID) => {
  const authKey = CONSTANTS.Auth_Key

  return new Promise(async (resolve, reject) => {
    await CometChat.login(UID, authKey)
      .then((user) => resolve(user))
      .catch((error) => reject(error))
  })
}

const signUpWithCometChat = async (CometChat, UID) => {
  const authKey = CONSTANTS.Auth_Key
  const user = new CometChat.User(UID)

  user.setName(UID)
  return new Promise(async (resolve, reject) => {
    await CometChat.createUser(user, authKey)
      .then((user) => resolve(user))
      .catch((error) => reject(error))
  })
}

const logOutWithCometChat = async (CometChat) => {
  return new Promise(async (resolve, reject) => {
    await CometChat.logout()
      .then(() => resolve())
      .catch(() => reject())
  })
}

// const checkAuthState = async () => {
//   return new Promise(async (resolve, reject) => {
//     await CometChat.getLoggedinUser()
//       .then((user) => resolve(user))
//       .catch((error) => reject(error))
//   })
// }

// const createNewGroup = async (GUID, groupName) => {
//   const groupType = CometChat.GROUP_TYPE.PUBLIC
//   const password = ''
//   const group = new CometChat.Group(GUID, groupName, groupType, password)

//   return new Promise(async (resolve, reject) => {
//     await CometChat.createGroup(group)
//       .then((group) => resolve(group))
//       .catch((error) => reject(error))
//   })
// }

// const getGroup = async (GUID) => {
//   return new Promise(async (resolve, reject) => {
//     await CometChat.getGroup(GUID)
//       .then((group) => resolve(group))
//       .catch((error) => reject(error))
//   })
// }

// const joinGroup = async (GUID) => {
//   const groupType = CometChat.GROUP_TYPE.PUBLIC
//   const password = ''

//   return new Promise(async (resolve, reject) => {
//     await CometChat.joinGroup(GUID, groupType, password)
//       .then((group) => resolve(group))
//       .catch((error) => reject(error))
//   })
// }

// const getMessages = async (UID) => {
//   const limit = 30
//   const messagesRequest = new CometChat.MessagesRequestBuilder()
//     .setGUID(UID)
//     .setLimit(limit)
//     .build()

//   return new Promise(async (resolve, reject) => {
//     await messagesRequest
//       .fetchPrevious()
//       .then((messages) => resolve(messages.filter((msg) => msg.type == 'text')))
//       .catch((error) => reject(error))
//   })
// }

// const sendMessage = async (receiverID, messageText) => {
//   const receiverType = CometChat.RECEIVER_TYPE.GROUP
//   const textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType)
//   return new Promise(async (resolve, reject) => {
//     await CometChat.sendMessage(textMessage)
//       .then((message) => resolve(message))
//       .catch((error) => reject(error))
//   })
// }

// const listenForMessage = async (listenerID) => {
//   return new Promise(async (resolve, reject) => {
//     CometChat.addMessageListener(
//       listenerID,
//       new CometChat.MessageListener({
//         onTextMessageReceived: (message) => resolve(message),
//       })
//     )
//   })
// }

export {
  initCometChat,
  loginWithCometChat,
  signUpWithCometChat,
  logOutWithCometChat,
  //   getMessages,
  //   sendMessage,
  //   checkAuthState,
  //   createNewGroup,
  //   getGroup,
  //   joinGroup,
  //   listenForMessage,
}
