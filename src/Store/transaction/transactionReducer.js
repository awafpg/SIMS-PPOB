import { apiSlice } from "../apiSlice";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    balance: builder.mutation({
      query: () => ({
        url: "/balance",
        method: "GET",
      }),
    }),
    history: builder.query({
      query: ({ offset, limit }) =>
        `/transaction/history?offset=${offset}&limit=${limit}`,
    }),

    transaction: builder.mutation({
      query: (crededentials) => ({
        url: "/transaction",
        method: "POST",
        body: { ...crededentials },
      }),
    }),
    topup: builder.mutation({
      query: (crededentials) => ({
        url: "/topup",
        method: "POST",
        body: { ...crededentials },
      }),
    }),
  }),
});

export const {
  useBalanceMutation,
  useHistoryQuery,
  useTopupMutation,
  useTransactionMutation,
} = transactionApiSlice;
