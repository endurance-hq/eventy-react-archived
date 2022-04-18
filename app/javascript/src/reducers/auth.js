import { resetAuthTokens, setAuthHeaders } from "apis/axios";

const authReducer = (_state, { type, payload }) => {
  switch (type) {
    case "LOGIN": {
      localStorage.setItem("authToken", JSON.stringify(payload.auth_token));
      localStorage.setItem("userName", JSON.stringify(payload.user_name));
      setAuthHeaders();

      return {
        isLoggedIn: true,
        authToken: payload.auth_token,
        userName: payload.user_name,
      };
    }
    case "LOGOUT": {
      localStorage.setItem("authToken", JSON.stringify(null));
      localStorage.setItem("userName", JSON.stringify(null));
      resetAuthTokens();

      return { isLoggedIn: false, authToken: null, userName: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default authReducer;
