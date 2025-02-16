import { createSlice } from "@reduxjs/toolkit";

const peersSlice = createSlice({
   name: "peers",
   initialState: [],
   reducers: {
      setPeers: (state, action) => {
         return action.payload;
      },
   },
});

export const { setPeers } = peersSlice.actions;
export const peersSelector = (state) => state.peers;

export default peersSlice.reducer;