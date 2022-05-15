import React, { createContext, useContext, useReducer } from "react";

import PropTypes from "prop-types";
import authReducer from "reducers/auth";

import { getFromLocalStorage } from "commons/utils";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const token = getFromLocalStorage("authToken");
const userName = getFromLocalStorage("userName");

const initialState = {
  isLoggedIn: !!token,
  authToken: token || null,
  userName: userName || null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
};

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
};

const useAuth = () => [useAuthState(), useAuthDispatch()];

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuthState, useAuthDispatch, useAuth };
