const PADDING = { none: '', sm: 'p-4', md: 'p-4 sm:p-5' }

export default function Card({
  as: Component = 'div',
  padding = 'md',
  dashed = false,
  className = '',
  ...props
}) {
  const border = dashed
    ? 'border-dashed border-stone-300 dark:border-stone-700'
    : 'border-stone-200 dark:border-stone-800'
  return (
    <Component
      className={`rounded-xl border bg-white dark:bg-stone-900 ${border} ${PADDING[padding]} ${className}`}
      {...props}
    />
  )
}
