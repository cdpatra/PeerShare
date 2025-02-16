import { createSlice } from "@reduxjs/toolkit";

const popularPlaylistsSlice = createSlice({
   name: "popularPlaylists",
   initialState: [],
   reducers: {
      getPopularPlaylists: (state) => {
         return state;
      },
      setPopularPlaylists: (state, action) => {
         return action.payload;
      },
   },
});

export const { getPopularPlaylists, setPopularPlaylists } = popularPlaylistsSlice.actions;

export default popularPlaylistsSlice.reducer;
export const popularPlaylistsSelector = (state) => state.popularPlaylists;
