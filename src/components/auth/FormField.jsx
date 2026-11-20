// Label + control + error/hint text. The control is passed as children and should set
// aria-describedby={`${id}-message`} when it wants the message announced.
export default function FormField({ id, label, error, hint, optional = false, action, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {optional && <span className="text-xs text-base-content/60">Optional</span>}
        {action}
      </div>
      {children}
      {(error || hint) && (
        <p id={`${id}-message`} className={`mt-1.5 text-sm ${error ? 'text-error' : 'text-base-content/60'}`}>
          {error || hint}
        </p>
      )}
    </div>
  )
}
