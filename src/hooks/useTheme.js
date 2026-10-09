import { useCallback, useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, saveTheme } from '../utils/theme'

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    saveTheme(next)
  }, [theme])

  return { theme, toggle }
}
