import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (credentials) => ({
            url: "/auth/login",
            method: "POST",
            body: { ...credentials },
         }),
      }),
      logout: builder.mutation({
         query: () => ({
            url: "/auth/logout",
            method: "POST",
         }),
      }),
      refreshToken: builder.mutation({
         query: () => ({
            url: "/auth/refresh",
            method: "POST",
         }),
      }),
   }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = authApiSlice;
