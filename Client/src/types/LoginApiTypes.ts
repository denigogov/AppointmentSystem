export interface LoginApiTypes {
  success: boolean;
  payload: {
    id: number;
    username: string;
    type: number;
  };
}

export interface CredentialsTypes {
  email?: string;
  password?: string;
}
