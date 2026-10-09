import { X } from 'lucide-react'
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../utils/constants'
import Button from './ui/Button'
import Card from './ui/Card'
import SearchInput from './ui/SearchInput'
import Select from './ui/Select'

export default function Filters({ filters, onChange, onClear, hasActive }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <Card padding="sm" className="space-y-3">
      <SearchInput
        value={filters.search}
        onChange={set('search')}
        placeholder="Search questions"
        aria-label="Search questions"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Select aria-label="Filter by category" placeholder="All categories" options={CATEGORIES} value={filters.category} onChange={set('category')} />
        <Select aria-label="Filter by status" placeholder="All statuses" options={STATUSES} value={filters.status} onChange={set('status')} />
        <Select aria-label="Filter by difficulty" placeholder="All difficulties" options={DIFFICULTIES} value={filters.difficulty} onChange={set('difficulty')} />
      </div>
      {hasActive && (
        <Button variant="ghost" onClick={onClear}>
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear filters
        </Button>
      )}
    </Card>
  )
}
