import Card from './Card'
import { mutedText } from './styles'

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <Card dashed padding="none" className="flex flex-col items-center px-6 py-12 text-center">
      {Icon && (
        <Icon className="mb-3 h-10 w-10 text-stone-400 dark:text-stone-500" aria-hidden="true" />
      )}
      <h3 className="text-base font-semibold">{title}</h3>
      <p className={`mt-1 max-w-sm text-sm ${mutedText}`}>{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}
