import { apiSlice } from "../apiSlice";

export const informationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    banner: builder.mutation({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
    }),
    service: builder.mutation({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
  }),
});

export const { useBannerMutation, useServiceMutation } = informationApiSlice;
