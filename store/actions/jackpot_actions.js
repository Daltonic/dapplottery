export const jackpot_actions = {
  addJackpot: (state, action) => {
    state.jackpots.push(action.payload)
  },
  saveJackpot: (state, action) => {
    state.jackpots = action.payload
  },
}
