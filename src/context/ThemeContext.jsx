// context/ThemeContext.jsx
import React, { createContext, useState, useContext } from 'react';

// إنشاء الكائن Context
const ThemeContext = createContext();

// للحصول على الكائن من context في أي مكان تحتاجه
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider الذي يتضمن منطق الحالة لتغيير الـ theme
export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light"; // default to light theme
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
