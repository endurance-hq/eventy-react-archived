import React, { createContext, useContext, useReducer } from "react";

import PropTypes from "prop-types";
import userReducer from "reducers/user";

import { getFromLocalStorage } from "commons/utils";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const user = getFromLocalStorage("user");

const initialState = { user: user || null };

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

const useUserState = () => {
  const context = useContext(UserStateContext);

  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }

  return context;
};

const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);

  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }

  return context;
};

const useUser = () => [useUserState(), useUserDispatch()];

UserProvider.propTypes = {
  children: PropTypes.node,
};

export {
  UserProvider,
  UserStateContext,
  useUserState,
  useUserDispatch,
  useUser,
};
