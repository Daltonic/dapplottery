import { configureStore } from '@reduxjs/toolkit'
import global_reducer from './global_reducer'

export const store = configureStore({
  reducer: {
    globalState: global_reducer,
  },
})
