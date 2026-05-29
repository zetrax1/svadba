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
const showWeddingDay = new Date() >= REVEAL_DATE

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
        <RSVP />
      </main>
      <Footer />
    </>
  )
}
