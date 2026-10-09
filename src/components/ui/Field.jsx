export default function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-stone-800 dark:text-stone-200"
      >
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error && (
        <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}
