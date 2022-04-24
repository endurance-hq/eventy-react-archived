const userReducer = (_state, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      localStorage.setItem("user", JSON.stringify(payload.user));

      return {
        user: payload.user,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default userReducer;
