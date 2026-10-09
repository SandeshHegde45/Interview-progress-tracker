export const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400'

export const mutedText = 'text-stone-600 dark:text-stone-400'

export function controlClass({ hasError = false, compact = false, inline = false } = {}) {
  return [
    'rounded-md border bg-white text-sm text-stone-900 placeholder:text-stone-400',
    'dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500',
    hasError ? 'border-rose-400 dark:border-rose-500' : 'border-stone-300 dark:border-stone-700',
    compact ? 'px-2 py-1.5' : 'px-3 py-2',
    inline ? '' : 'w-full',
    focusRing,
  ]
    .filter(Boolean)
    .join(' ')
}
