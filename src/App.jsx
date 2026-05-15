import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Schedule from './components/Schedule'
import WeddingParty from './components/WeddingParty'
import Venue from './components/Venue'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Schedule />
        <WeddingParty />
        <Venue />
        <RSVP />
      </main>
      <Footer />
    </>
  )
}
