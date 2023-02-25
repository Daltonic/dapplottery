import { createSlice } from '@reduxjs/toolkit'
import { jackpot_actions } from './actions/jackpot_actions'
import { jackpot_states } from './states/jackpot_states'

export const jackpotSlice = createSlice({
  name: 'jackpots',
  initialState: jackpot_states,
  reducers: jackpot_actions,
})

export const jackpotActions = jackpotSlice.actions
export default jackpotSlice.reducer
