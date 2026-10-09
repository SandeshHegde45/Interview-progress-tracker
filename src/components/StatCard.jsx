import Card from './ui/Card'
import { mutedText } from './ui/styles'

export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <Card>
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-stone-500 dark:text-stone-500">{hint}</div>}
    </Card>
  )
}
