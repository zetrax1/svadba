import { useState, useEffect } from 'react'

const WEDDING_DAY_HREFS = ['#program', '#menu', '#foto', '#hudba']

const links = [
  { label: 'Domov',          href: '#hero' },
  { label: 'Odpočítavanie', href: '#countdown' },
  { label: 'Info',            href: '#party' },
  { label: 'Miesto',         href: '#miesto' },
  { label: 'Ubytovanie',     href: '#ubytovanie' },
  { label: 'Program',        href: '#program' },
  { label: 'Menu',           href: '#menu' },
  { label: 'Fotky',          href: '#foto' },
  { label: 'Hudba',          href: '#hudba' },
  { label: 'Dotazník',       href: '#rsvp' },
]

export default function Navbar({ showWeddingDay }) {
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
        {links
          .filter(l => showWeddingDay || !WEDDING_DAY_HREFS.includes(l.href))
          .map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
      </ul>
    </nav>
  )
}
