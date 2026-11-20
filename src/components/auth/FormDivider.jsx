export default function FormDivider({ children = 'or' }) {
  return (
    <div className="my-6 flex items-center gap-4 text-sm text-base-content/60" role="separator">
      <span className="h-px flex-1 bg-base-300" />
      {children}
      <span className="h-px flex-1 bg-base-300" />
    </div>
  )
}
