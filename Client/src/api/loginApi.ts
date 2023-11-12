import { TokenType } from "../types/AuthTypes";
import { LoginApiTypes } from "../types/LoginApiTypes";

export const fetchTokenValidation = async (token: TokenType) => {
  try {
    const res = await fetch("http://localhost:4000/login", {
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
