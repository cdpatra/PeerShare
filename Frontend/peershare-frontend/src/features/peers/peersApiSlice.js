import { apiSlice } from "../../app/api/apiSlice";

const peersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPeers: builder.query({
         query: () => ({
            url: "/users/student",
            method: "GET",
         }),
      }),
   }),
});

export const { useGetPeersQuery } = peersApiSlice;
