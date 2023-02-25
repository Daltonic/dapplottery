import { configureStore } from '@reduxjs/toolkit'
import jackpot_reducer from './jackpot_reducer'

export const store = configureStore({
  reducer: {
    jackpots: jackpot_reducer,
  },
})
