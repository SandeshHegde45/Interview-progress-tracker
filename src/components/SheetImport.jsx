import { useState } from 'react'
import { CalendarPlus } from 'lucide-react'
import { SHEETS } from '../data/sheets'
import { useTracker } from '../context/TrackerContext'
import { getMissing } from '../utils/sheets'
import { CATEGORIES } from '../utils/constants'
import Button from './ui/Button'
import Card from './ui/Card'
import { mutedText } from './ui/styles'

export default function SheetImport() {
  const { questions, importSheet } = useTracker()
  const [notice, setNotice] = useState('')

  const handleImport = (sheet) => {
    const added = importSheet(sheet)
    setNotice(`Added ${added} question${added === 1 ? '' : 's'} from ${sheet.label}.`)
  }

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Weekly sheets</h2>
        <p className={`mt-1 text-sm ${mutedText}`}>
          Add a sheet&apos;s questions in one click. Questions already in your list are skipped.
        </p>
      </div>

      <ul className="space-y-3">
        {[...SHEETS].reverse().map((sheet) => {
          const missing = getMissing(sheet, questions).length
          const counts = CATEGORIES.map(
            (c) => `${c} ${sheet.questions.filter((q) => q.category === c).length}`,
          ).join(' · ')
          return (
            <li key={sheet.id} className="space-y-2">
              <div>
                <div className="text-sm font-medium">
                  {sheet.label} — {sheet.title}
                </div>
                <div className={`text-xs ${mutedText}`}>
                  {sheet.questions.length} questions · {counts}
                </div>
              </div>
              <Button
                variant="secondary"
                fullWidth
                disabled={missing === 0}
                onClick={() => handleImport(sheet)}
              >
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                {missing === 0 ? 'All added' : `Add ${missing} question${missing === 1 ? '' : 's'}`}
              </Button>
            </li>
          )
        })}
      </ul>

      <p role="status" className={`text-xs ${mutedText}`}>
        {notice}
      </p>
    </Card>
  )
}
