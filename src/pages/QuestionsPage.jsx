import { useMemo, useState } from 'react'
import { Inbox, SearchX } from 'lucide-react'
import { useTracker } from '../context/TrackerContext'
import QuestionForm from '../components/QuestionForm'
import SheetImport from '../components/SheetImport'
import QuestionItem from '../components/QuestionItem'
import Filters from '../components/Filters'
import LoadSheetButton from '../components/LoadSheetButton'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { mutedText } from '../components/ui/styles'

const NO_FILTERS = { search: '', category: '', status: '', difficulty: '' }

export default function QuestionsPage() {
  const { questions } = useTracker()
  const [filters, setFilters] = useState(NO_FILTERS)

  const hasActive = Object.values(filters).some(Boolean)

  const visible = useMemo(() => {
    const term = filters.search.trim().toLowerCase()
    return questions.filter(
      (q) =>
        (!term || q.title.toLowerCase().includes(term)) &&
        (!filters.category || q.category === filters.category) &&
        (!filters.status || q.status === filters.status) &&
        (!filters.difficulty || q.difficulty === filters.difficulty),
    )
  }, [questions, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Questions</h1>
        <LoadSheetButton />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <QuestionForm />
          <SheetImport />
        </div>

        <div className="space-y-4 lg:col-span-2">
          {questions.length > 0 && (
            <>
              <Filters
                filters={filters}
                onChange={setFilters}
                onClear={() => setFilters(NO_FILTERS)}
                hasActive={hasActive}
              />
              <p className={`text-sm ${mutedText}`} aria-live="polite">
                Showing {visible.length} of {questions.length}
              </p>
            </>
          )}

          {questions.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Your list is empty"
              description="Use the form to add your first question, or load the 15 questions from Sheet 01 with one click."
            />
          ) : visible.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No questions match"
              description="Try a different search or loosen the filters."
              action={
                <Button variant="secondary" onClick={() => setFilters(NO_FILTERS)}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <ul className="space-y-3">
              {visible.map((q) => (
                <QuestionItem key={q.id} question={q} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
