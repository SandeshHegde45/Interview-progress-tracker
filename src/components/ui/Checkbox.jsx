import { focusRing } from './styles'

export default function Checkbox({ id, label, ...props }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 rounded border-stone-300 accent-emerald-600 dark:border-stone-700 ${focusRing}`}
        {...props}
      />
      {label}
    </label>
  )
}
