import { configureStore } from '@reduxjs/toolkit'
import jackpot_reducer from './jackpot_reducer'
import wallet_reducer from './wallet_reducer'
import global_reducer from './global_reducer'

export const store = configureStore({
  reducer: {
    jackpots: jackpot_reducer,
    walletState: wallet_reducer,
    globalState: global_reducer,
  },
})
