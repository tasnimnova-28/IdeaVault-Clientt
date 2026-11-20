import { Check, Circle } from 'lucide-react'
import { passwordRules } from '../../utils/validators'

// Live feedback while the person types a new password
export default function PasswordChecklist({ password }) {
  return (
    <ul className="mt-3 space-y-1.5 text-sm" aria-label="Password requirements">
      {passwordRules.map((rule) => {
        const passed = rule.test(password)
        return (
          <li
            key={rule.id}
            className={`flex items-center gap-2 transition-colors ${passed ? 'text-success' : 'text-base-content/60'}`}
          >
            {passed ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Circle className="h-4 w-4" aria-hidden="true" />
            )}
            {rule.label}
            <span className="sr-only">{passed ? ' (done)' : ' (not done yet)'}</span>
          </li>
        )
      })}
    </ul>
  )
}
