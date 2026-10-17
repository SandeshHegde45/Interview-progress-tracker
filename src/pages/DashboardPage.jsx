import { useMemo } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  ClipboardList,
  ListChecks,
  MessageSquareText,
  Sparkles,
} from 'lucide-react'
import { useTracker } from '../context/useTracker'
import { byCategory, computeStats } from '../utils/stats'
import { CATEGORIES, CATEGORY_LABELS } from '../utils/constants'
import StatCard from '../components/StatCard'
import MachineCodingCard from '../components/MachineCodingCard'
import MachineCodingPanel from '../components/MachineCodingPanel'
import LoadSheetButton from '../components/LoadSheetButton'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import ProgressBar from '../components/ui/ProgressBar'
import { mutedText } from '../components/ui/styles'

export default function DashboardPage() {
  const { questions } = useTracker()
  const stats = useMemo(() => computeStats(questions), [questions])

  return (
    <div className="page-enter space-y-7">
      <Card as="section" aria-label="Overall progress" className="dashboard-hero p-6 sm:p-8">
        <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800 ring-1 ring-emerald-900/5 dark:bg-stone-900/60 dark:text-emerald-300 dark:ring-white/10">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Your interview prep
            </div>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Small steps. Strong interviews.
            </h1>
            <p className={`mt-3 max-w-xl text-sm leading-6 sm:text-base ${mutedText}`}>
              Keep your practice focused, track what you&apos;ve mastered, and build confidence one
              question at a time.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/questions">
                {stats.total === 0 ? 'Start practicing' : 'View your questions'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              {stats.total === 0 && <LoadSheetButton variant="secondary" />}
            </div>
          </div>
          <div className="min-w-52 rounded-2xl border border-white/70 bg-white/65 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-stone-900/45">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Overall progress
                </div>
                <div className="mt-2 text-5xl font-bold tracking-tight tabular-nums">
                  {stats.percent}
                  <span className="text-2xl text-emerald-700 dark:text-emerald-400">%</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar percent={stats.percent} label="Overall completion" size="lg" />
            </div>
            <div className={`mt-3 flex justify-between gap-4 text-xs ${mutedText}`}>
              <span>{stats.completed} completed</span>
              <span>{stats.total} total</span>
            </div>
          </div>
        </div>
      </Card>

      <section
        aria-label="Summary"
        className="stagger-in grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard icon={ClipboardList} label="Total questions" value={stats.total} />
        <StatCard
          icon={Code2}
          label="DSA completed"
          value={stats.dsaCompleted}
          hint={`of ${stats.dsaTotal} DSA problems`}
        />
        <StatCard
          icon={MessageSquareText}
          label="Interview questions completed"
          value={stats.interviewCompleted}
          hint={`of ${stats.interviewTotal} (Git and Technical)`}
        />
        <MachineCodingCard />
      </section>

      {stats.total === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No questions yet"
          description="Add this week's questions (or load the weekly sheet) from the Questions page and your progress will show up here."
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <LoadSheetButton variant="primary" />
              <Button as={Link} to="/questions" variant="secondary">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Add manually
              </Button>
            </div>
          }
        />
      ) : (
        <Card as="section" aria-label="Progress by category" className="hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Your progress by category</h2>
              <p className={`mt-1 text-sm ${mutedText}`}>A quick look at what you&apos;ve covered.</p>
            </div>
            <span className="hidden h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex dark:bg-indigo-950/60 dark:text-indigo-300">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          <ul className="mt-4 space-y-4">
            {CATEGORIES.map((c) => {
              const s = byCategory(questions, c)
              return (
                <li key={c}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{CATEGORY_LABELS[c]}</span>
                    <span className={`tabular-nums ${mutedText}`}>
                      {s.done}/{s.total}
                    </span>
                  </div>
                  <ProgressBar percent={s.percent} label={`${CATEGORY_LABELS[c]} completion`} />
                </li>
              )
            })}
          </ul>
        </Card>
      )}

      <MachineCodingPanel />
    </div>
  )
}
