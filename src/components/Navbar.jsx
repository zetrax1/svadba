import { useState, useEffect } from 'react'

const links = [
  { label: 'Domov',          href: '#hero' },
  { label: 'Odpočítavanie', href: '#countdown' },
  { label: 'Info',            href: '#party' },
  { label: 'Miesto',         href: '#miesto' },
  { label: 'Ubytovanie',     href: '#ubytovanie' },
  // { label: 'Program',        href: '#program' },
  { label: 'RSVP',           href: '#rsvp' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a href="#hero" className="navbar__logo">M &amp; V</a>
      <ul className="navbar__links">
        {links.map(l => (
          <li key={l.href}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>
    </nav>
  )
}
