import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// Password field with a show/hide button. Extra props go straight to the <input>.
export default function PasswordInput({ id, className = '', ...inputProps }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        className={`input w-full pr-12 ${className}`}
        {...inputProps}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-base-content/60 transition-colors hover:text-base-content"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
      >
        {visible ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  )
}
