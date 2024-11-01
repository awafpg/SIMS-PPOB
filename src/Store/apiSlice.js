import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../utils/memberUtil";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://take-home-test-api.nutech-integrasi.com/",
  //   credentials: "include",
  prepareHeaders: (headers) => {
    // const token = getState().auth.token
    const token = getAuthToken();
    console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithReAuth = async (args, api, options) => {
//   let result = await baseQuery(args, api, options);
//   console.log(result);
//   if (result?.error?.originalStatus === 403) {
//     console.log("sending refresh token");
//     const refreshResult = await baseQuery("/refresh-token", api, options);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       api.dispatch(setCredential({ ...refreshResult.data, user }));

//       setAuthToken(refreshResult.data.access_token); //set to cookie

//       result = await baseQuery(args, api, {
//         ...options,
//         body: JSON.stringify({ refresh_token: selectCurrentToken() }),
//       });
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   console.log(result);
//   return result;
// };

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
