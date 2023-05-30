import { createContext } from "react";

const UnsavedChangesContext = createContext({
  wrappedNavigate: (to, options) => {
    console.warn(
      "UnsavedChangesContext default value used for wrappedNavigate"
    );
  },
});

export default UnsavedChangesContext;
