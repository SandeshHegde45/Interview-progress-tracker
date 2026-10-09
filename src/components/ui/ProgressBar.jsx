export default function ProgressBar({ percent, label, size = 'md' }) {
  const height = size === 'lg' ? 'h-4' : 'h-2'
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={label}
      className={`w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800 ${height}`}
    >
      <div
        className="h-full rounded-full bg-emerald-600 transition-[width] duration-500 ease-out motion-reduce:transition-none dark:bg-emerald-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
