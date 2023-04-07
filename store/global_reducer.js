import { createSlice } from '@reduxjs/toolkit'
import { global_actions } from './actions/global_actions'
import { global_states } from './states/global_states'

export const globalSlice = createSlice({
  name: 'global',
  initialState: global_states,
  reducers: global_actions,
})

export const globalActions = globalSlice.actions
export default globalSlice.reducer
