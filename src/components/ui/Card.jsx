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
      className={`rounded-2xl border bg-white/90 shadow-sm shadow-stone-900/[0.035] transition-[box-shadow,transform,border-color] duration-200 dark:bg-stone-900/90 dark:shadow-black/10 ${border} ${PADDING[padding]} ${className}`}
      {...props}
    />
  )
}
