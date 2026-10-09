export const CATEGORIES = ['DSA', 'Git', 'Technical']
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard']
export const STATUSES = ['Pending', 'In Progress', 'Completed']
export const MACHINE_STATUSES = ['Not Started', 'In Progress', 'Completed']

export const CATEGORY_LABELS = {
  DSA: 'DSA (LeetCode)',
  Git: 'Git & GitHub',
  Technical: 'Full-Stack Technical',
}

export const DIFFICULTY_TONES = { Easy: 'success', Medium: 'warning', Hard: 'danger' }
export const STATUS_TONES = {
  Pending: 'neutral',
  'In Progress': 'info',
  Completed: 'success',
  'Not Started': 'neutral',
}

export const DEFAULT_MACHINE = {
  status: 'Not Started',
  repoUrl: '',
  liveUrl: '',
  demoUrl: '',
  readmeDone: false,
}

export const DELIVERABLE_TOTAL = 4

export function deliverablesDone(machine) {
  return [machine.repoUrl, machine.liveUrl, machine.demoUrl, machine.readmeDone].filter(Boolean)
    .length
}
