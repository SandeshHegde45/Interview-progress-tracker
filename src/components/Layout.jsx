import { NavLink, Outlet } from 'react-router'
import { LayoutDashboard, ListChecks, Target } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { focusRing } from './ui/styles'

const linkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${focusRing} ${
    isActive
      ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-950/10 dark:bg-emerald-400 dark:text-stone-950'
      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white'
  }`

export default function Layout() {
  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100">
      <header className="app-header sticky top-0 z-20 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md shadow-emerald-900/15 dark:bg-emerald-400 dark:text-stone-950">
              <Target className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="font-bold tracking-tight">Prepwise</div>
              <div className="hidden text-xs text-stone-500 sm:block dark:text-stone-400">
                Interview prep workspace
              </div>
            </div>
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
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
