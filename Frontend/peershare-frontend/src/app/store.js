import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import popularPlaylistsReducer from "../features/popularPlaylists/popularPlaylistsSlice";
import peersReducer from "../features/peers/peersSlice"

export const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      popularPlaylists: popularPlaylistsReducer,
      peers: peersReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
