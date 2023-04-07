export const global_actions = {
  updateWallet: (state, action) => {
    state.wallet = action.payload
  },
  setGeneratorModal: (state, action) => {
    state.generatorModal = action.payload
  },
}
