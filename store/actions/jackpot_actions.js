export const jackpot_actions = {
  addJackpot: (state, action) => {
    state.jackpot.push(action.payload)
  },
}
