export interface FormProps {
  onSubmit: (username: string, password: string) => void;
}

export interface StateProps {
  user: string;
  token: string;
  userID: number;
}
