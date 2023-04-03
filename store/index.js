import { configureStore } from '@reduxjs/toolkit'
import jackpot_reducer from './jackpot_reducer'
import wallet_reducer from './wallet_reducer'

export const store = configureStore({
  reducer: {
    jackpots: jackpot_reducer,
    walletState: wallet_reducer,
  },
})
