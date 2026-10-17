import { useCallback, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { DEFAULT_MACHINE, MACHINE_STATUSES } from '../utils/constants'
import { getMissing, sourceIdOf } from '../utils/sheets'
import { TrackerContext } from './useTracker'

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

function initialMachine() {
  try {
    const legacy = JSON.parse(window.localStorage.getItem('ipt:machine-status'))
    if (MACHINE_STATUSES.includes(legacy)) return { ...DEFAULT_MACHINE, status: legacy }
  } catch (error) {
    console.warn('Unable to read the legacy machine status from local storage.', error)
  }
  return DEFAULT_MACHINE
}

export function TrackerProvider({ children }) {
  const [stored, setQuestions] = useLocalStorage('ipt:questions', [])
  const [storedMachine, setMachine] = useLocalStorage('ipt:machine', initialMachine)

  const questions = useMemo(() => (Array.isArray(stored) ? stored : []), [stored])
  const machine = useMemo(() => ({ ...DEFAULT_MACHINE, ...(storedMachine || {}) }), [storedMachine])

  const addQuestion = useCallback(
    (data) =>
      setQuestions((prev) => [
        { id: newId(), createdAt: Date.now(), ...data, title: data.title.trim() },
        ...(Array.isArray(prev) ? prev : []),
      ]),
    [setQuestions],
  )

  const importSheet = useCallback(
    (sheet) => {
      const fresh = getMissing(sheet, questions).map((q) => ({
        id: newId(),
        createdAt: Date.now(),
        sourceId: sourceIdOf(sheet, q),
        sheet: sheet.label,
        title: q.title,
        category: q.category,
        difficulty: q.difficulty,
        status: 'Pending',
        ...(q.leetcode && { leetcode: q.leetcode }),
        ...(q.prompt && { prompt: q.prompt }),
        ...(q.followUps && { followUps: q.followUps }),
      }))
      if (fresh.length > 0) {
        setQuestions((prev) => [...fresh, ...(Array.isArray(prev) ? prev : [])])
      }
      return fresh.length
    },
    [questions, setQuestions],
  )

  const updateStatus = useCallback(
    (id, status) =>
      setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q))),
    [setQuestions],
  )

  const updateQuestionNotes = useCallback(
    (id, patch) => setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q))),
    [setQuestions],
  )

  const deleteQuestion = useCallback(
    (id) => setQuestions((prev) => prev.filter((q) => q.id !== id)),
    [setQuestions],
  )

  const updateMachine = useCallback(
    (patch) => setMachine((prev) => ({ ...DEFAULT_MACHINE, ...(prev || {}), ...patch })),
    [setMachine],
  )

  const value = useMemo(
    () => ({
      questions,
      addQuestion,
      importSheet,
      updateStatus,
      updateQuestionNotes,
      deleteQuestion,
      machine,
      updateMachine,
    }),
    [
      questions,
      addQuestion,
      importSheet,
      updateStatus,
      updateQuestionNotes,
      deleteQuestion,
      machine,
      updateMachine,
    ],
  )

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
}
