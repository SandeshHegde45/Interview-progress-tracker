import { createContext, useContext } from 'react'

export const TrackerContext = createContext(null)

export function useTracker() {
  const ctx = useContext(TrackerContext)
  if (!ctx) throw new Error('useTracker must be used inside <TrackerProvider>')
  return ctx
}
