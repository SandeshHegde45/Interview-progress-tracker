import { useMemo } from 'react'
import { Link } from 'react-router'
import { CheckCircle2, Code2, ClipboardList, ListChecks, MessageSquareText } from 'lucide-react'
import { useTracker } from '../context/TrackerContext'
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">This week&apos;s preparation</h1>
        <p className={`mt-1 text-sm ${mutedText}`}>
          Your progress across every question you&apos;ve added.
        </p>
      </div>

      <Card as="section" aria-label="Overall progress">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-5xl font-semibold tabular-nums">{stats.percent}%</div>
            <div className={`mt-1 text-sm ${mutedText}`}>
              {stats.completed} of {stats.total} questions completed
            </div>
          </div>
          <div className={`text-right text-sm ${mutedText}`}>
            <div>{stats.inProgress} in progress</div>
            <div>{stats.pending} pending</div>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar percent={stats.percent} label="Overall completion" size="lg" />
        </div>
      </Card>

      <section aria-label="Summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <Card as="section" aria-label="Progress by category">
          <h2 className="text-base font-semibold">By category</h2>
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
