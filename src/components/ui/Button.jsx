import { focusRing } from './styles'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors disabled:opacity-50'

const VARIANTS = {
  primary:
    'px-4 py-2 font-medium bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white',
  secondary:
    'px-4 py-2 font-medium border border-stone-300 bg-white text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800',
  ghost:
    'gap-1 text-stone-600 underline-offset-2 hover:underline dark:text-stone-400',
  icon: 'p-2 text-stone-600 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800',
  'icon-danger':
    'p-2 text-stone-500 hover:bg-rose-50 hover:text-rose-600 dark:text-stone-400 dark:hover:bg-rose-950 dark:hover:text-rose-400',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  fullWidth = false,
  className = '',
  type,
  ...props
}) {
  const typeProp = Component === 'button' ? { type: type ?? 'button' } : {}
  return (
    <Component
      className={`${BASE} ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${focusRing} ${className}`}
      {...typeProp}
      {...props}
    />
  )
}
