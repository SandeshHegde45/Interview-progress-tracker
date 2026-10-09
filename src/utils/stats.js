export function computeStats(questions) {
  const total = questions.length
  const completed = questions.filter((q) => q.status === 'Completed')
  const inProgress = questions.filter((q) => q.status === 'In Progress').length
  const pending = questions.filter((q) => q.status === 'Pending').length

  return {
    total,
    completed: completed.length,
    inProgress,
    pending,
    percent: total === 0 ? 0 : Math.round((completed.length / total) * 100),
    dsaTotal: questions.filter((q) => q.category === 'DSA').length,
    interviewTotal: questions.filter((q) => q.category !== 'DSA').length,
    dsaCompleted: completed.filter((q) => q.category === 'DSA').length,
    interviewCompleted: completed.filter((q) => q.category !== 'DSA').length,
  }
}

export function byCategory(questions, category) {
  const items = questions.filter((q) => q.category === category)
  const done = items.filter((q) => q.status === 'Completed').length
  return {
    total: items.length,
    done,
    percent: items.length === 0 ? 0 : Math.round((done / items.length) * 100),
  }
}
