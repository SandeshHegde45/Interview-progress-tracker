import { Cpu } from 'lucide-react'
import { useTracker } from '../context/TrackerContext'
import {
  DELIVERABLE_TOTAL,
  MACHINE_STATUSES,
  STATUS_TONES,
  deliverablesDone,
} from '../utils/constants'
import Badge from './ui/Badge'
import Card from './ui/Card'
import Select from './ui/Select'
import { mutedText } from './ui/styles'

export default function MachineCodingCard() {
  const { machine, updateMachine } = useTracker()
  return (
    <Card>
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <Cpu className="h-4 w-4" aria-hidden="true" />
        Machine coding
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Badge tone={STATUS_TONES[machine.status]}>{machine.status}</Badge>
        <span className="text-xs text-stone-500">
          {deliverablesDone(machine)}/{DELIVERABLE_TOTAL} deliverables
        </span>
      </div>
      <label className="mt-3 block text-xs text-stone-500" htmlFor="machine-status">
        Update status
      </label>
      <Select
        id="machine-status"
        compact
        className="mt-1"
        options={MACHINE_STATUSES}
        value={machine.status}
        onChange={(e) => updateMachine({ status: e.target.value })}
      />
    </Card>
  )
}
