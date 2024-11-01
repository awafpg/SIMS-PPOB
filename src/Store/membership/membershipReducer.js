import { apiSlice } from "../apiSlice";

export const memberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (crededentials) => ({
        url: "/login",
        method: "POST",
        body: { ...crededentials },
      }),
    }),
    register: builder.mutation({
      query: (crededentials) => ({
        url: "/registration",
        method: "POST",
        body: { ...crededentials },
      }),
    }),
    profile: builder.mutation({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (crededentials) => ({
        url: "/profile/update",
        method: "PUT",
        body: { ...crededentials },
      }),
    }),
    updateImage: builder.mutation({
      query: (crededentials) => ({
        url: "/profile/image",
        method: "PUT",
        body: crededentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileMutation,
  useUpdateProfileMutation,
  useUpdateImageMutation,
} = memberApiSlice;
