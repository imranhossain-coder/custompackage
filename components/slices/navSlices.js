import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginstatus: null,
  UserToken: null,
  userdynamic: null,
};

export const navslice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setloginstatus: (state, action) => {
      state.loginstatus = action.payload;
    },
    setUserToken: (state, action) => {
      state.UserToken = action.payload;
    },
    setuserdynamic: (state, action) => {
      state.userdynamic = action.payload;
    },
  },
});

export const { setloginstatus, setUserToken, setuserdynamic } =
  navslice.actions;

// Selectors

export const selectloginstatus = (state) => state.nav.loginstatus;
export const selectUserToken = (state) => state.nav.UserToken;
export const selectdynamic = (state) => state.nav.userdynamic;

export default navslice.reducer;
