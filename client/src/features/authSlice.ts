import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateProps {
  user: string;
  token: string;
  userID: number;
}

const initialState: StateProps = {
  user: "",
  token: "",
  userID: -1,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ user: string; token: string; userID: number }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userID = action.payload.userID;
    },
    setLogout: (state) => {
      state.user = "";
      state.token = "";
      state.userID = -1;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
