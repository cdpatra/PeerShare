import { apiSlice } from "../../app/api/apiSlice";

export const popularPlaylistsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPopularPlaylists: builder.query({
         query: () => ({
            url: "/users/playlist",
            method: "GET",
         }),
      }),
   }),
});

export const { useGetPopularPlaylistsQuery } = popularPlaylistsApiSlice;
