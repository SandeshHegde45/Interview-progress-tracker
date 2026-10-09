import { ExternalLink, Trash2 } from 'lucide-react'
import { useTracker } from '../context/TrackerContext'
import { DIFFICULTY_TONES, STATUSES } from '../utils/constants'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'
import Select from './ui/Select'
import { mutedText } from './ui/styles'

export default function QuestionItem({ question }) {
  const { updateStatus, deleteQuestion } = useTracker()
  const done = question.status === 'Completed'
  const hasDetails = Boolean(question.prompt)

  return (
    <Card
      as="li"
      padding="sm"
      className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <p
          className={`break-words font-medium ${
            done ? 'text-stone-500 line-through dark:text-stone-500' : ''
          }`}
        >
          {question.title}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge>{question.category}</Badge>
          <Badge tone={DIFFICULTY_TONES[question.difficulty]}>{question.difficulty}</Badge>
          {question.leetcode && <Badge tone="info">LC {question.leetcode.number}</Badge>}
          {question.sheet && <Badge>{question.sheet}</Badge>}
        </div>

        {question.leetcode?.url && (
          <a
            href={question.leetcode.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Open on LeetCode
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}

        {hasDetails && (
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Scenario &amp; follow-ups
            </summary>
            <p className={`mt-2 text-sm ${mutedText}`}>{question.prompt}</p>
            {question.followUps?.length > 0 && (
              <ul className={`mt-2 list-disc space-y-1 pl-5 text-sm ${mutedText}`}>
                {question.followUps.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </details>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Select
          compact
          inline
          aria-label={`Status for ${question.title}`}
          options={STATUSES}
          value={question.status}
          onChange={(e) => updateStatus(question.id, e.target.value)}
        />
        <Button
          variant="icon-danger"
          onClick={() => deleteQuestion(question.id)}
          aria-label={`Delete ${question.title}`}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </Card>
  )
}
