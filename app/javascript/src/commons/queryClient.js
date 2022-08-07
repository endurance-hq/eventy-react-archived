import { QueryCache, QueryClient } from "@tanstack/react-query";

import { showToast } from "./utils";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => showToast("error", error.message),
  }),
});

export default queryClient;
