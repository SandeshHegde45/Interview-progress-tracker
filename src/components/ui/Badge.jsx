const TONES = {
  neutral:
    'bg-stone-100 text-stone-700 ring-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:ring-stone-700',
  success:
    'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800',
  warning:
    'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800',
  danger:
    'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:ring-rose-800',
  info: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:ring-sky-800',
}

export default function Badge({ tone = 'neutral', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}
