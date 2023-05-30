import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnsavedChangesContext from "./useUnsavedChanges";

const UnsavedChangesProvider = ({ children }) => {
  const navigate = useNavigate();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const wrappedNavigate = (to, options) => {
    if (unsavedChanges) {
      const confirmResult = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmResult) {
        return;
      } else {
        setUnsavedChanges(false);
      }
    }
    if (typeof to === "string") {
      navigate(to, options);
    } else if (typeof to === "function") {
      to();
    }
  };

  return (
    <UnsavedChangesContext.Provider
      value={{ wrappedNavigate, setUnsavedChanges }}
    >
      {children}
    </UnsavedChangesContext.Provider>
  );
};

export default UnsavedChangesProvider;
