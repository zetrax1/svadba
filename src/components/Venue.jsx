import VenueMap from './VenueMap'

const CHURCH_NAME    = 'Kostol Preblahoslavenej Panny Márie'
const CHURCH_ADDRESS = ['Hlavná 2/4', '952 01 Vráble', 'Slovensko']
const CHURCH_LAT = 48.2396027
const CHURCH_LON = 18.3031150

const WINERY_NAME    = 'Tajna Vineyards & Winery'
const WINERY_TYPE    = 'Rodinné boutique vinárstvo'
const WINERY_ADDRESS = ['Tajná 163', '952 01 Tajná', 'Slovensko']
const WINERY_LAT = 48.2550279
const WINERY_LON = 18.3587829

function mapsUrl(lat, lon) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
}

export default function Venue() {
  return (
    <section id="miesto" className="venue">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
          <h2>Miesta konania</h2>
          <p>Kde sa stretneme</p>
        </div>

        {/* Two info blocks side by side */}
        <div className="venue__two-col">

          <div className="venue__block">
            <div className="venue__block-label">I. Svadobný obrad</div>
            <div className="venue__info">
              <h3>{CHURCH_NAME}</h3>
              <p className="venue__subtitle">Rímskokatolícky kostol · Vráble</p>
              <p className="venue__address">
                {CHURCH_ADDRESS.map((line, i) => (
                  <span key={i}>{line}{i < CHURCH_ADDRESS.length - 1 && <br />}</span>
                ))}
              </p>
              <div className="venue__details">
                <div className="venue__detail">
                  <span className="venue__detail-icon">📅</span>
                  <span>Sobota, 19. september 2026</span>
                </div>
                <div className="venue__detail">
                  <span className="venue__detail-icon">🕒</span>
                  <span>Príchod o 14:00 · Obrad o 15:00</span>
                </div>
                <div className="venue__detail">
                  <span className="venue__detail-icon">🚗</span>
                  <span>Parkovanie v okolí kostola</span>
                </div>
              </div>
              <a href={mapsUrl(CHURCH_LAT, CHURCH_LON)} target="_blank" rel="noopener noreferrer" className="venue__btn">
                ↗ Navigovať
              </a>
            </div>
          </div>

          <div className="venue__col-divider" />

          <div className="venue__block">
            <div className="venue__block-label">II. Svadobná hostina</div>
            <div className="venue__info">
              <h3>{WINERY_NAME}</h3>
              <p className="venue__subtitle">{WINERY_TYPE}</p>
              <p className="venue__address">
                {WINERY_ADDRESS.map((line, i) => (
                  <span key={i}>{line}{i < WINERY_ADDRESS.length - 1 && <br />}</span>
                ))}
              </p>
              <div className="venue__details">
                <div className="venue__detail">
                  <span className="venue__detail-icon">🕒</span>
                  <span>Začiatok o 18:00</span>
                </div>
                <div className="venue__detail">
                  <span className="venue__detail-icon">🚗</span>
                  <span>Parkovanie k dispozícii</span>
                </div>
                <div className="venue__detail">
                  <span className="venue__detail-icon">🚌</span>
                  <span>Cca 10 min od Vráb autom</span>
                </div>
              </div>
              <a href={mapsUrl(WINERY_LAT, WINERY_LON)} target="_blank" rel="noopener noreferrer" className="venue__btn">
                ↗ Navigovať
              </a>
            </div>
          </div>

        </div>

        {/* Single combined map below */}
        <div className="venue__map-legend">
          <span className="venue__map-legend-item venue__map-legend-item--blue">I — Kostol, Vráble</span>
          <span className="venue__map-legend-sep">·</span>
          <span className="venue__map-legend-item venue__map-legend-item--sage">II — Tajna Winery</span>
          <span className="venue__map-legend-sep">·</span>
          <span className="venue__map-legend-route">— trasa (~10 min)</span>
        </div>
        <VenueMap />

      </div>
    </section>
  )
}
