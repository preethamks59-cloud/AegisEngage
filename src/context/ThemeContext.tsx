import React, { createContext, useContext, ReactNode } from 'react';

const ThemeContext = createContext<{}>({});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{}}>
      <div className="min-h-screen bg-slate-50 transition-colors duration-300">
          {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
