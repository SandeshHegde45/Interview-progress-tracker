export const sourceIdOf = (sheet, question) => `${sheet.id}:${question.key}`

export function getMissing(sheet, questions) {
  const ids = new Set(questions.map((q) => q.sourceId).filter(Boolean))
  const titles = new Set(questions.map((q) => q.title.toLowerCase()))
  return sheet.questions.filter(
    (q) => !ids.has(sourceIdOf(sheet, q)) && !titles.has(q.title.toLowerCase()),
  )
}
