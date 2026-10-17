import { forwardRef } from 'react'
import { controlClass } from './styles'

const Textarea = forwardRef(function Textarea(
  { hasError = false, compact, inline, className = '', ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={hasError || undefined}
      className={`${controlClass({ hasError, compact, inline })} min-h-28 resize-y leading-6 ${className}`}
      {...props}
    />
  )
})

export default Textarea
