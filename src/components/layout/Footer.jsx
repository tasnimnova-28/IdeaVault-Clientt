import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../common/Logo'
import { GithubIcon, LinkedinIcon, XIcon } from '../common/SocialIcons'
import useAuth from '../../hooks/useAuth'

const platformLinks = [
  { label: 'Home', to: '/' },
  { label: 'Explore Ideas', to: '/ideas' },
  { label: 'Add Idea', to: '/add-idea' },
  { label: 'My Ideas', to: '/my-ideas' },
  { label: 'My Interactions', to: '/my-interactions' },
]

const accountLinks = [
  { label: 'Login', to: '/login', guestOnly: true },
  { label: 'Register', to: '/register', guestOnly: true },
  { label: 'My Profile', to: '/profile' },
]

const socialLinks = [
  { label: 'IdeaVault on X', href: 'https://x.com', icon: XIcon },
  { label: 'IdeaVault on GitHub', href: 'https://github.com', icon: GithubIcon },
  { label: 'IdeaVault on LinkedIn', href: 'https://www.linkedin.com', icon: LinkedinIcon },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  const { user } = useAuth()
  const visibleAccountLinks = accountLinks.filter((link) => !(user && link.guestOnly))

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-content/70">
              A place for students and founders to share startup ideas, get honest feedback and find people to build with.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold">Platform</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-content/70">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-neutral-content">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold">Account</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-content/70">
              {visibleAccountLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-neutral-content">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-content/70">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                hello@ideavault.example
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                +880 1700-000000
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Your University Campus, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-content/15 pt-6 sm:flex-row">
          <p className="text-sm text-neutral-content/60">© {currentYear} IdeaVault. All rights reserved.</p>

          <ul className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-content/70 transition-colors hover:bg-neutral-content/10 hover:text-neutral-content"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
