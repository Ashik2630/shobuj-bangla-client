"use client";

import * as React from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme | null;
  resolvedTheme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("shobuj-theme") as Theme | null;
    const initialTheme = storedTheme ?? getSystemTheme();
    setThemeState(initialTheme);
    setMounted(true);
    applyTheme(initialTheme);
  }, []);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem("shobuj-theme", nextTheme);
  }, []);

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme: theme ?? "dark",
      mounted,
      setTheme,
    }),
    [theme, mounted, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
