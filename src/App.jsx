import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Schedule from './components/Schedule'
import WeddingParty from './components/WeddingParty'
import Venue from './components/Venue'
import Accommodation from './components/Accommodation'
import Menu from './components/Menu'
import Foto from './components/Foto'
import Hudba from './components/Hudba'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

// Sekcie Program, Menu, Foto a Hudba sa zobrazia od 19.9.2026 o 15:30 (slovenský čas)
const REVEAL_DATE = new Date('2026-09-19T15:30:00+02:00')
// RSVP je viditeľné do polnoci po 10.9.2026 (t.j. do 11.9.2026 00:00)
const RSVP_VISIBLE_UNTIL = new Date('2026-09-11T00:00:00+02:00')
const now = new Date()
const showWeddingDay = now >= REVEAL_DATE
const showRsvp = now < RSVP_VISIBLE_UNTIL

export default function App() {
  return (
    <>
      <div className="floral-border floral-border--left" aria-hidden="true" />
      <div className="floral-border floral-border--right" aria-hidden="true" />
      <Navbar showWeddingDay={showWeddingDay} />
      <main>
        <Hero />
        <Countdown />
        <WeddingParty />
        <Venue />
        <Accommodation />
        {showWeddingDay && <Schedule />}
        {showWeddingDay && <Menu />}
        {showWeddingDay && <Foto />}
        {showWeddingDay && <Hudba />}
        {showRsvp ? (
          <RSVP />
        ) : (
          <section id="rsvp" className="rsvp">
            <div className="container">
              <div className="rsvp__success">
                <div className="rsvp__success-icon">💌</div>
                <h3>Dotazník je uzavretý</h3>
                <p>Ak ste nám nestihli potvrdiť svoju účasť, prosíme kontaktujte nás čo najskôr.</p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
