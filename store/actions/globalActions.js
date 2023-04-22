export const globalActions = {
  setWallet: (state, action) => {
    state.wallet = action.payload
  },
  setJackpots: (state, action) => {
    state.jackpots = action.payload
  },
  setGeneratorModal: (state, action) => {
    state.generatorModal = action.payload
  },
  setWinnersModal: (state, action) => {
    state.winnersModal = action.payload
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
  setResult: (state, action) => {
    state.result = action.payload
  },
  setParticipants: (state, action) => {
    state.participants = action.payload
  },
}
