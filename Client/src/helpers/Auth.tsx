import { createContext, useContext, useState, ReactNode } from "react";
import { TokenType, UserInfoType, AuthContextType } from "../types/AuthTypes";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<TokenType>(
    localStorage.getItem("token") ?? null
  );
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const login = (token: TokenType) => {
    if (token && token.length) {
      localStorage.setItem("token", token);
      setToken(token);
    }
  };

  const info = (userInfo: UserInfoType) => {
    setUserInfo(userInfo);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ info, userInfo, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
