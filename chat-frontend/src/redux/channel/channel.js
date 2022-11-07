import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "channel",
  initialState: {
    channelId: null,
  },
  reducers: {
    enterChannel: (state, action) => {state.channelId = action.payload.channelId}
  }
})

export const {enterChannel} = appSlice.actions;

export const selectedChannelId = state => state.channel.channelId;

export default appSlice.reducer;