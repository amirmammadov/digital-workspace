export interface FormProps {
  onSubmit: (username: string, password: string) => void;
}

export interface FolderProps {
  _id: number;
  userID: number;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface FileProps {
  _id: number;
  folderID: number;
  username: string;
  fileName: string;
  filePath: string;
  fileSize: string;
  fileType: string;
}

export interface StateProps {
  user: string;
  token: string;
  userID: number;
  openedFolderId: number;
  folders: FolderProps[];
}
