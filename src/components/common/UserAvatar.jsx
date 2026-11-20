import { useState } from 'react'
import { getInitials } from '../../utils/formatters'

// Shows the profile photo, or the person's initials if there is no photo or it fails to load.
// `sizeClass` controls width/height/text size, e.g. "h-10 w-10 text-sm".
export default function UserAvatar({ user, sizeClass = 'h-10 w-10 text-sm', className = '' }) {
  const [failedUrl, setFailedUrl] = useState('')
  const showPhoto = Boolean(user?.photoURL) && failedUrl !== user.photoURL
  const label = user?.displayName || user?.email || 'User'

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary font-semibold text-secondary-content ${sizeClass} ${className}`}
    >
      {showPhoto ? (
        <img
          src={user.photoURL}
          alt=""
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailedUrl(user.photoURL)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(label) || '?'}</span>
      )}
    </span>
  )
}
