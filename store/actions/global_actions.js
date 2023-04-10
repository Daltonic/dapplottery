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
  setJackpots: (state, action) => {
    state.generatorModal = action.payload
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
}
