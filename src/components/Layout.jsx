import { NavLink, Outlet } from 'react-router'
import { LayoutDashboard, ListChecks, Target } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { focusRing } from './ui/styles'

const linkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${focusRing} ${
    isActive
      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
      : 'text-stone-700 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800'
  }`

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            Interview Practice Tracker
          </div>
          <div className="flex items-center gap-1">
            <nav className="flex gap-1" aria-label="Main">
              <NavLink to="/" end className={linkClass}>
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Dashboard
              </NavLink>
              <NavLink to="/questions" className={linkClass}>
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                Questions
              </NavLink>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}
