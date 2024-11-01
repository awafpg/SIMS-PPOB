import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "member",
  initialState: { user: null, token: null },
  reducers: {
    setCredential: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export default memberSlice.reducer;

export const { setCredential, logout } = memberSlice.actions;
export const selectCurrentToken = (state) => state.auth.token;
