import { Search } from 'lucide-react'
import Input from './Input'

export default function SearchInput({ className = '', ...props }) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-stone-500"
        aria-hidden="true"
      />
      <Input type="search" className={`pl-9 ${className}`} {...props} />
    </div>
  )
}
