import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw !== null) return JSON.parse(raw)
    } catch (error) {
      console.warn(`Unable to read "${key}" from local storage; using the initial value.`, error)
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Unable to save "${key}" to local storage.`, error)
    }
  }, [key, value])

  return [value, setValue]
}
