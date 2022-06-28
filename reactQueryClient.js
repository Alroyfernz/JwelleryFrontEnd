import { QueryClient } from "react-query";

import React from "react";

const ReactQueryClient = () => {
  const [queryClient] = React.useState(() => new QueryClient());

  return queryClient;
};

export default ReactQueryClient;
