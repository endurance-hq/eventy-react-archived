import React from "react";

import i18n from "commons/i18n";
import Main from "components/Main";
import { AuthProvider } from "contexts/auth";
import { UserProvider } from "contexts/user";

const App = props => (
  <AuthProvider>
    <UserProvider>
      <Main {...props} i18n={i18n} />
    </UserProvider>
  </AuthProvider>
);

export default App;
