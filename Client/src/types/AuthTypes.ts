export type TokenType = string | null;

export interface UserInfoType {
  id?: number;
  username?: string;
  type?: number;
}

export type AuthContextType = {
  token?: TokenType;
  userInfo?: UserInfoType | null;
  login: (token: TokenType) => void;
  info: (userInfo: UserInfoType) => void;
  logout: () => void;
};
