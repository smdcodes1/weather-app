
import React, { createContext, useContext, useState } from "react";

const Themecontext = createContext();

export const useTheme = () => useContext(Themecontext);

export const Themeprovider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  return (
    <Themecontext.Provider value={{ theme,setTheme }}>
      {children}
    </Themecontext.Provider>
  );
};