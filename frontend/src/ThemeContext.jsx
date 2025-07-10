import React, { createContext, useContext, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const themeValue = useTheme();

  // Set data-theme attribute on <html> based on themeValue.mode
  useEffect(() => {
    if (themeValue && themeValue.mode) {
      document.documentElement.setAttribute('data-theme', themeValue.mode);
    }
  }, [themeValue && themeValue.mode]);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
