import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FileProps, FolderProps } from "../interfaces";

interface StateProps {
  user: string;
  token: string;
  userID: number;
  openedFolderId: number;
  folders: FolderProps[];
  documents: FileProps[];
}

const initialState: StateProps = {
  user: "",
  token: "",
  userID: -1,
  openedFolderId: -1,
  folders: [],
  documents: [],
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
      state.folders = [];
      state.documents = [];
    },
    setFolders: (state, action: PayloadAction<[FolderProps]>) => {
      state.folders = action.payload;
    },
    setDocuments: (state, action: PayloadAction<[FileProps]>) => {
      state.documents = action.payload;
    },
    setDeleteFolder: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.folders = state.folders.filter((folder) => folder._id !== id);
      if (state.folders.length === 0 || state.openedFolderId === id) {
        state.openedFolderId = -1;
      }
    },
    setDeleteDocument: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.documents = state.documents.filter(
        (document) => document._id !== id
      );
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
  setDocuments,
  setDeleteDocument,
} = authSlice.actions;

export default authSlice.reducer;
