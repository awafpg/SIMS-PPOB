import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    service_code: "",
    service_name: "",
    service_icon: "",
    service_tariff: 0,
  },
  reducers: {
    setDataService: (state, action) => {
      const { service_code, service_icon, service_name, service_tariff } =
        action.payload;
      if (service_code !== undefined) state.service_code = service_code;
      if (service_icon !== undefined) state.service_icon = service_icon;
      if (service_name !== undefined) state.service_name = service_name;
      if (service_tariff !== undefined) state.service_tariff = service_tariff;
    },
  },
});

export default transactionSlice.reducer;

export const { setDataService } = transactionSlice.actions;
export const selectCurrentService = (state) => state.transaction;
