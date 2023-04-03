import { createSlice } from '@reduxjs/toolkit'
import { wallet_actions } from './actions/wallet_actions'
import { wallet_states } from './states/wallet_states'

export const walletSlice = createSlice({
  name: 'wallets',
  initialState: wallet_states,
  reducers: wallet_actions,
})

export const walletActions = walletSlice.actions
export default walletSlice.reducer
