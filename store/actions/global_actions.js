export const global_actions = {
  updateWallet: (state, action) => {
    state.wallet = action.payload
  },
  setGeneratorModal: (state, action) => {
    state.generatorModal = action.payload
  },
  setWinnerModal: (state, action) => {
    state.winnerModal = action.payload
  },
  setChatModal: (state, action) => {
    state.chatModal = action.payload
  },
  setAuthModal: (state, action) => {
    state.authModal = action.payload
  },
  setCurrentUser: (state, action) => {
    state.currentUser = action.payload
  },
  setJackpots: (state, action) => {
    state.jackpots = action.payload
  },
  setJackpot: (state, action) => {
    state.jackpot = action.payload
  },
  setLuckyNumbers: (state, action) => {
    state.luckyNumbers = action.payload
  },
  setPurchasedNumbers: (state, action) => {
    state.purchasedNumbers = action.payload
  },
  setParticipants: (state, action) => {
    state.participants = action.payload
  },
  setResult: (state, action) => {
    state.result = action.payload
  },
  setGroup: (state, action) => {
    state.group = action.payload
  },
}
