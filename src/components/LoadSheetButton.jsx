import { ListPlus } from 'lucide-react'
import { SHEETS } from '../data/sheets'
import { useTracker } from '../context/TrackerContext'
import { getMissing } from '../utils/sheets'
import Button from './ui/Button'

/** Adds the latest weekly sheet's questions that are not in the list yet. Hidden once all are present. */
export default function LoadSheetButton({ variant = 'secondary' }) {
  const { questions, importSheet } = useTracker()
  const sheet = SHEETS[SHEETS.length - 1]
  const missing = getMissing(sheet, questions)

  if (missing.length === 0) return null

  return (
    <Button variant={variant} onClick={() => importSheet(sheet)}>
      <ListPlus className="h-4 w-4" aria-hidden="true" />
      Add {sheet.label} questions ({missing.length})
    </Button>
  )
}
