const KEY = 'Theme'

export function getInitialTheme() {
    const saved = window.localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  return 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

export function saveTheme(theme) {
    window.localStorage.setItem(KEY, theme)
}
