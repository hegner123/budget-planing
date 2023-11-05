import * as React from "react";
import "@budget/styles/style.scss";

import { StyledEngineProvider } from "@mui/material/styles";

export default function GlobalCssPriority(props) {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. Now you can override Material UI's styles. */}
      {props.children}
    </StyledEngineProvider>
  );
}
