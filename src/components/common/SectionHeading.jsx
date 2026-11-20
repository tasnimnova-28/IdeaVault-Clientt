// Reusable title + description block used by every homepage section
export default function SectionHeading({ title, description, action }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-base-content/70">{description}</p>}
      </div>
      {action}
    </div>
  )
}
