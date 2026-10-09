import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { useTracker } from '../context/TrackerContext'
import { DELIVERABLE_TOTAL, deliverablesDone } from '../utils/constants'
import { isHttpUrl } from '../utils/url'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'
import Checkbox from './ui/Checkbox'
import Field from './ui/Field'
import Input from './ui/Input'
import ProgressBar from './ui/ProgressBar'
import { mutedText } from './ui/styles'

function LinkField({ id, label, placeholder, value, onSave }) {
  const [draft, setDraft] = useState(value)
  const [error, setError] = useState('')

  const commit = () => {
    const next = draft.trim()
    if (next && !isHttpUrl(next)) {
      setError('Enter a full link starting with https://')
      return
    }
    setError('')
    setDraft(next)
    onSave(next)
  }

  return (
    <Field label={label} htmlFor={id} error={error}>
      <div className="flex gap-2">
        <Input
          id={id}
          type="url"
          inline
          className="min-w-0 flex-1"
          placeholder={placeholder}
          value={draft}
          hasError={!!error}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === 'Enter' && commit()}
        />
        {value && (
          <Button
            as="a"
            href={value}
            target="_blank"
            rel="noreferrer"
            variant="icon"
            aria-label={`Open ${label}`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </Field>
  )
}

export default function MachineCodingPanel() {
  const { machine, updateMachine } = useTracker()
  const done = deliverablesDone(machine)
  const percent = Math.round((done / DELIVERABLE_TOTAL) * 100)

  return (
    <Card as="section" aria-label="Machine coding deliverables" className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold">Machine coding deliverables</h2>
          <p className={`mt-1 text-sm ${mutedText}`}>
            Section 4 · Time limit 2.5 hours · HTML/CSS/JS or React · Backend not required
          </p>
        </div>
        <Badge tone={done === DELIVERABLE_TOTAL ? 'success' : 'neutral'}>
          {done} of {DELIVERABLE_TOTAL} ready
        </Badge>
      </div>

      <ProgressBar percent={percent} label="Machine coding deliverables" />

      <div className="grid gap-4 md:grid-cols-2">
        <LinkField
          id="repo-url"
          label="GitHub repository"
          placeholder="https://github.com/you/interview-practice-tracker"
          value={machine.repoUrl}
          onSave={(v) => updateMachine({ repoUrl: v })}
        />
        <LinkField
          id="live-url"
          label="Live deployed link"
          placeholder="https://your-app.vercel.app"
          value={machine.liveUrl}
          onSave={(v) => updateMachine({ liveUrl: v })}
        />
        <LinkField
          id="demo-url"
          label="Demo video (1–2 minutes)"
          placeholder="https://drive.google.com/..."
          value={machine.demoUrl}
          onSave={(v) => updateMachine({ demoUrl: v })}
        />
        <div className="flex items-end pb-2">
          <Checkbox
            id="readme-done"
            label="README added (setup steps, features, assumptions)"
            checked={machine.readmeDone}
            onChange={(e) => updateMachine({ readmeDone: e.target.checked })}
          />
        </div>
      </div>
    </Card>
  )
}
