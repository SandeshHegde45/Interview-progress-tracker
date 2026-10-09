import { forwardRef } from 'react'
import { controlClass } from './styles'

const Input = forwardRef(function Input(
  { hasError = false, compact, inline, className = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={hasError || undefined}
      className={`${controlClass({ hasError, compact, inline })} ${className}`}
      {...props}
    />
  )
})

export default Input
