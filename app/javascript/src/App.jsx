import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import i18n from "commons/i18n";
import queryClient from "commons/queryClient";
import Main from "components/Main";
import { AuthProvider } from "contexts/auth";
import { UserProvider } from "contexts/user";

const App = props => (
  <AuthProvider>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Main {...props} i18n={i18n} />
        <ReactQueryDevtools initialIsOpen position="bottom-right" />
      </QueryClientProvider>
    </UserProvider>
  </AuthProvider>
);

export default App;
