import { forwardRef } from 'react'
import { controlClass } from './styles'

const Select = forwardRef(function Select(
  { options, placeholder, hasError = false, compact, inline, className = '', ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      aria-invalid={hasError || undefined}
      className={`${controlClass({ hasError, compact, inline })} ${className}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
})

export default Select
