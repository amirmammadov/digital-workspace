import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FolderProps {
  _id: number;
  userID: number;
  title: string;
  createdAt: number;
  updatedAt: number;
}

interface StateProps {
  user: string;
  token: string;
  userID: number;
  openedFolderId: number;
  folders: FolderProps[];
}

const initialState: StateProps = {
  user: "",
  token: "",
  userID: -1,
  openedFolderId: -1,
  folders: [],
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
      state.openedFolderId = -1;
    },
    setFolders: (state, action: PayloadAction<[FolderProps]>) => {
      state.folders = action.payload;
    },
    setDeleteFolder: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.folders = state.folders.filter((folder) => folder._id !== id);
      if (state.folders.length === 0 || state.openedFolderId === id) {
        state.openedFolderId = -1;
      }
    },
    setActiveFolder: (
      state,
      action: PayloadAction<{ openedFolderId: number }>
    ) => {
      state.openedFolderId = action.payload.openedFolderId;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setFolders,
  setActiveFolder,
  setDeleteFolder,
} = authSlice.actions;

export default authSlice.reducer;
