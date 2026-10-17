import { useMemo, useState } from 'react'
import { BookOpenText, CircleHelp, NotebookPen, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { useTracker } from '../context/useTracker'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Textarea from '../components/ui/Textarea'
import { mutedText } from '../components/ui/styles'

function NoteField({ id, label, placeholder, value, onChange, icon: Icon }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-200">
        <Icon className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
        {label}
      </span>
      <Textarea
        id={id}
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
      />
    </label>
  )
}

export default function NotesPage() {
  const { questions, updateQuestionNotes, machine, updateMachine } = useTracker()
  const [search, setSearch] = useState('')

  const visibleQuestions = useMemo(() => {
    const term = search.trim().toLowerCase()
    return questions.filter(
      (question) =>
        !term ||
        question.title.toLowerCase().includes(term) ||
        question.category.toLowerCase().includes(term),
    )
  }, [questions, search])

  const questionsWithNotes = questions.filter((question) => question.notes?.trim()).length
  const openDoubts = questions.filter((question) => question.doubts?.trim()).length

  return (
    <div className="page-enter space-y-7">
      <header>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          <BookOpenText className="h-4 w-4" aria-hidden="true" />
          YOUR LEARNING JOURNAL
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notes &amp; doubts</h1>
            <p className={`mt-2 max-w-2xl text-sm ${mutedText}`}>
              Keep explanations, reminders, and questions close to the practice they belong to.
              Everything saves automatically on this device.
            </p>
          </div>
          <div className="flex gap-2 text-xs font-medium">
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {questionsWithNotes} with notes
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              {openDoubts} with doubts
            </span>
          </div>
        </div>
      </header>

      <Card as="section" aria-label="Machine coding notes" className="space-y-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
            <NotebookPen className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Machine Coding</h2>
            <p className={`mt-1 text-sm ${mutedText}`}>
              Capture implementation ideas, edge cases, and anything to clarify before your next
              timed build.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <NoteField
            id="machine-notes"
            label="Build notes"
            icon={NotebookPen}
            placeholder="Patterns, component ideas, decisions, and things to remember..."
            value={machine.notes}
            onChange={(notes) => updateMachine({ notes })}
          />
          <NoteField
            id="machine-doubts"
            label="Doubts to resolve"
            icon={CircleHelp}
            placeholder="Questions about requirements, edge cases, or implementation..."
            value={machine.doubts}
            onChange={(doubts) => updateMachine({ doubts })}
          />
        </div>
      </Card>

      <section aria-label="Question notes" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Question notes</h2>
            <p className={`mt-1 text-sm ${mutedText}`}>
              Notes and doubts stay attached to each question.
            </p>
          </div>
          {questions.length > 0 && (
            <label className="relative block w-full sm:w-72">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find a question"
                aria-label="Find a question for notes"
                className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-3 text-sm text-stone-900 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:focus-visible:ring-emerald-400"
              />
            </label>
          )}
        </div>

        {questions.length === 0 ? (
          <Card className="flex flex-col items-center px-6 py-10 text-center">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-semibold">Your question journal starts here</h3>
            <p className={`mt-1 max-w-md text-sm ${mutedText}`}>
              Add or import practice questions to keep your explanations and follow-up doubts
              organized alongside them.
            </p>
            <Button as={Link} to="/questions" variant="secondary" className="mt-4">
              Add questions
            </Button>
          </Card>
        ) : visibleQuestions.length === 0 ? (
          <Card className="px-6 py-8 text-center">
            <p className={`text-sm ${mutedText}`}>No questions match “{search}”. Try another search.</p>
          </Card>
        ) : (
          <ul className="space-y-4">
            {visibleQuestions.map((question) => (
              <li key={question.id}>
                <Card as="article" className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold leading-6">{question.title}</h3>
                      <p className={`mt-1 text-xs ${mutedText}`}>
                        {question.category}
                        {question.difficulty ? ` · ${question.difficulty}` : ''}
                        {question.status ? ` · ${question.status}` : ''}
                      </p>
                    </div>
                    <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                      {[question.notes, question.doubts].filter((value) => value?.trim()).length}/2
                      {' '}sections filled
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <NoteField
                      id={`notes-${question.id}`}
                      label="My notes"
                      icon={NotebookPen}
                      placeholder="Key ideas, solution outline, complexity, or reminders..."
                      value={question.notes}
                      onChange={(notes) => updateQuestionNotes(question.id, { notes })}
                    />
                    <NoteField
                      id={`doubts-${question.id}`}
                      label="Doubts to revisit"
                      icon={CircleHelp}
                      placeholder="What is still unclear? What do you want to ask or investigate?"
                      value={question.doubts}
                      onChange={(doubts) => updateQuestionNotes(question.id, { doubts })}
                    />
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
