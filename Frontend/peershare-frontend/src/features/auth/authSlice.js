import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
   name: "auth",
   initialState: { student: null, accessToken: null },
   reducers: {
      setCredentials: (state, action) => {
         state.student = action.payload.student;
         state.accessToken = action.payload.jwtaccessToken;
      },
      logOut: (state) => {
         state.student = null;
         state.accessToken = null;
      },
   },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const studentSelector = (state) => state.auth.student;
export const accessTokenSelector = (state) => state.auth.accessToken;
