import Card from './ui/Card'
import { mutedText } from './ui/styles'

export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <Card className="group hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/[0.04] dark:hover:border-emerald-900">
      <div className="flex items-center justify-between gap-2">
        <div className={`text-sm font-medium ${mutedText}`}>{label}</div>
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-transform duration-200 group-hover:scale-110 dark:bg-emerald-950/70 dark:text-emerald-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-stone-500 dark:text-stone-500">{hint}</div>}
    </Card>
  )
}
