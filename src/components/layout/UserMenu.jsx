import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, FolderOpen, LogOut, MessagesSquare, PlusCircle, UserRound } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'
import UserAvatar from '../common/UserAvatar'

const menuLinks = [
  { label: 'My Profile', to: '/profile', icon: UserRound },
  { label: 'Add Idea', to: '/add-idea', icon: PlusCircle },
  { label: 'My Ideas', to: '/my-ideas', icon: FolderOpen },
  { label: 'My Interactions', to: '/my-interactions', icon: MessagesSquare },
]

// Desktop profile dropdown. Closes on outside click, Escape and after choosing an option.
export default function UserMenu() {
  const { user } = useAuth()
  const handleLogout = useLogout()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const onPointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  if (!user) return null

  const name = user.displayName || 'IdeaVault member'

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 py-1 pl-1 pr-2.5 transition-colors hover:border-primary/50"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="user-menu"
        aria-label="Open account menu"
      >
        <UserAvatar user={user} sizeClass="h-8 w-8 text-xs" />
        <ChevronDown
          className={`h-4 w-4 text-base-content/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id="user-menu"
          className="absolute right-0 mt-2 w-72 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
        >
          <div className="flex items-center gap-3 px-3 py-3">
            <UserAvatar user={user} sizeClass="h-11 w-11 text-sm" />
            <div className="min-w-0">
              <p className="truncate font-semibold">{name}</p>
              <p className="truncate text-sm text-base-content/60">{user.email}</p>
            </div>
          </div>

          <div className="my-1 border-t border-base-300" />

          <ul className="py-1">
            {menuLinks.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-1 border-t border-base-300" />

          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              handleLogout()
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-error transition-colors hover:bg-error/10"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
