import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogOut, Menu, UserRound, X } from 'lucide-react'
import Logo from '../common/Logo'
import UserAvatar from '../common/UserAvatar'
import ThemeToggle from './ThemeToggle'
import UserMenu from './UserMenu'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'

// `isPrivate` links are only shown to signed-in people
const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Ideas', to: '/ideas' },
  { label: 'Add Idea', to: '/add-idea', isPrivate: true },
  { label: 'My Ideas', to: '/my-ideas', isPrivate: true },
  { label: 'My Interactions', to: '/my-interactions', isPrivate: true },
]

function linkClass({ isActive }) {
  return `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary/10 text-primary'
      : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
  }`
}

export default function Navbar() {
  const { user, loading } = useAuth()
  const handleLogout = useLogout()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)
  const visibleLinks = navLinks.filter((link) => !link.isPrivate || user)

  // Let people close the mobile menu with the Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/85 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-primary px-3 py-2 text-primary-content focus:not-sr-only focus:absolute focus:left-4 focus:top-2"
      >
        Skip to content
      </a>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {visibleLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {loading ? (
            // Placeholder while Firebase restores the session, so Login/Register never flash for signed-in people
            <span className="skeleton h-10 w-20 rounded-full" aria-hidden="true" />
          ) : user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="border-t border-base-300/70 bg-base-100 lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {visibleLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={linkClass} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            {loading ? (
              <li className="mt-3">
                <span className="skeleton block h-12 w-full rounded-xl" aria-hidden="true" />
              </li>
            ) : user ? (
              <li className="mt-3 border-t border-base-300/70 pt-4">
                <div className="flex items-center gap-3 px-1 pb-3">
                  <UserAvatar user={user} sizeClass="h-11 w-11 text-sm" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{user.displayName || 'IdeaVault member'}</p>
                    <p className="truncate text-sm text-base-content/60">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/profile" className="btn btn-outline" onClick={closeMenu}>
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline btn-error"
                    onClick={() => {
                      closeMenu()
                      handleLogout()
                    }}
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Log out
                  </button>
                </div>
              </li>
            ) : (
              <li className="mt-3 grid grid-cols-2 gap-3">
                <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
