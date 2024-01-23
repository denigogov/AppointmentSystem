import { TokenType } from "../types/AuthTypes";
import { LoginApiTypes } from "../types/LoginApiTypes";
const API_URL = import.meta.env.VITE_API_URL as string;

export const fetchTokenValidation = async (token: TokenType) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success === true) {
      return data as LoginApiTypes;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err, "Token validation failed ");
    return null;
  }
};
