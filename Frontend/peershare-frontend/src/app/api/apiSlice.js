import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
   baseUrl: "http://localhost:8080",
   credentials: "include", // it will enable the feature to send the http-only cookie with each http request
   prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
         headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);
   if (result?.error?.status === 403) {
      // send the refresh token and get new access token
      const refreshResult = await baseQuery(
         {
            url: "/auth/refresh",
            method: "POST",
         },
         api,
         extraOptions
      );
      console.dir("send the refresh token and get new access token and the result is: ");
      console.dir(refreshResult);
      if (refreshResult?.data) {
         // store the new accessToken
         api.dispatch(setCredentials({ ...refreshResult.data }));
         // retry the original query with new accessToken
         result = await baseQuery(args, api, extraOptions);
      } else {
         const logoutResult = await baseQuery("/auth/logout", api, extraOptions);
         console.dir("logged out and the result: ");
         console.dir(logoutResult);
         api.dispatch(logOut());
      }
   }
   return result;
};

export const apiSlice = createApi({
   baseQuery: baseQueryWithReAuth,
   endpoints: () => ({}),
});
