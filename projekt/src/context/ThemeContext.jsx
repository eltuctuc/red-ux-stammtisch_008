import { createContext, useContext, useState, useEffect } from 'react'

function getStoredTheme() {
  try {
    const v = localStorage.getItem('cryptofolio-theme')
    return (v === 'dark' || v === 'light') ? v : 'dark'
  } catch {
    return 'dark'
  }
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme)

  useEffect(() => {
    document.documentElement.className = theme
    try {
      localStorage.setItem('cryptofolio-theme', theme)
    } catch {
      // localStorage not available – silent fail
    }
  }, [theme])

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
