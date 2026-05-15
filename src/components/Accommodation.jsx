import { useState } from 'react'

const HOTEL_NAME    = 'Wine Apartments'
const HOTEL_ADDRESS = ['1. mája 1053/19', '952 01 Vráble', 'Slovensko']
const HOTEL_LAT     = 48.241463
const HOTEL_LON     = 18.3073725

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${HOTEL_LAT},${HOTEL_LON}`
const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${HOTEL_LON - 0.025},${HOTEL_LAT - 0.015},${HOTEL_LON + 0.025},${HOTEL_LAT + 0.015}&layer=mapnik&marker=${HOTEL_LAT},${HOTEL_LON}`

// TODO: Replace placeholders with real recommendations for friends
const friendsRecs = [
  {
    name: 'Názov hotela / penziónu',
    location: 'Vráble alebo okolie',
    distance: 'X min od kostola',
    link: 'https://booking.com',
    note: 'Krátky popis alebo odporúčanie.',
  },
  {
    name: 'Názov hotela / penziónu',
    location: 'Vráble alebo okolie',
    distance: 'X min od kostola',
    link: 'https://booking.com',
    note: 'Krátky popis alebo odporúčanie.',
  },
  {
    name: 'Názov hotela / penziónu',
    location: 'Vráble alebo okolie',
    distance: 'X min od kostola',
    link: 'https://booking.com',
    note: 'Krátky popis alebo odporúčanie.',
  },
]

function AccordionPanel({ id, title, subtitle, icon, open, onToggle, children }) {
  return (
    <div className={`accordion__panel${open ? ' accordion__panel--open' : ''}`}>
      <button className="accordion__trigger" onClick={onToggle} aria-expanded={open}>
        <span className="accordion__trigger-icon">{icon}</span>
        <span className="accordion__trigger-text">
          <span className="accordion__trigger-title">{title}</span>
          <span className="accordion__trigger-sub">{subtitle}</span>
        </span>
        <span className="accordion__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="accordion__content">{children}</div>}
    </div>
  )
}

export default function Accommodation() {
  const [open, setOpen] = useState(null)
  const toggle = (id) => setOpen(prev => prev === id ? null : id)

  return (
    <section id="ubytovanie" className="accommodation">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
          <h2>Ubytovanie</h2>
          <p>Kde sa ubytovať</p>
        </div>

        <div className="accordion">

          {/* Family panel */}
          <AccordionPanel
            id="family"
            title="Rodina"
            subtitle="Rezervované ubytovanie"
            icon="🏠"
            open={open === 'family'}
            onToggle={() => toggle('family')}
          >
            <div className="accommodation__body">
              <div className="accommodation__info">
                <div className="accommodation__badge">Rezervované pre rodinu</div>
                <h3>{HOTEL_NAME}</h3>
                <p className="accommodation__subtitle">Apartmánové ubytovanie · Vráble</p>
                <p className="accommodation__address">
                  {HOTEL_ADDRESS.map((line, i) => (
                    <span key={i}>{line}{i < HOTEL_ADDRESS.length - 1 && <br />}</span>
                  ))}
                </p>
                <div className="accommodation__details">
                  <div className="accommodation__detail">
                    <span className="accommodation__detail-icon">📍</span>
                    <span>Centrum Vráb · 3 min pešo od kostola</span>
                  </div>
                  <div className="accommodation__detail">
                    <span className="accommodation__detail-icon">🌙</span>
                    <span>Check-in: 19. september 2026</span>
                  </div>
                  <div className="accommodation__detail">
                    <span className="accommodation__detail-icon">☀️</span>
                    <span>Check-out: 20. september 2026</span>
                  </div>
                  <div className="accommodation__detail">
                    <span className="accommodation__detail-icon">🚗</span>
                    <span>Cca 10 min od Tajna Winery</span>
                  </div>
                </div>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="venue__btn">
                  ↗ Navigovať
                </a>
              </div>
              <div className="accommodation__map">
                <iframe src={osmEmbed} title="Wine Apartments Vráble" allowFullScreen />
              </div>
            </div>
          </AccordionPanel>

          {/* Friends panel */}
          <AccordionPanel
            id="friends"
            title="Priatelia"
            subtitle="Odporúčania na ubytovanie"
            icon="🛎️"
            open={open === 'friends'}
            onToggle={() => toggle('friends')}
          >
            <p className="accommodation__rec-intro">
              Vybrali sme niekoľko možností v okolí Vráb, ktoré odporúčame. Rezerváciu si zabezpečte individuálne.
            </p>
            <div className="accommodation__rec-grid">
              {friendsRecs.map((rec, i) => (
                <div key={i} className="accommodation__rec-card">
                  <div className="accommodation__rec-name">{rec.name}</div>
                  <div className="accommodation__rec-meta">
                    <span>📍 {rec.location}</span>
                    <span>🚶 {rec.distance}</span>
                  </div>
                  <p className="accommodation__rec-note">{rec.note}</p>
                  <a href={rec.link} target="_blank" rel="noopener noreferrer" className="accommodation__rec-link">
                    Rezervovať →
                  </a>
                </div>
              ))}
            </div>
          </AccordionPanel>

        </div>
      </div>
    </section>
  )
}
