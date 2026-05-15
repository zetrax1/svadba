// TODO: Update VENUE_NAME, VENUE_ADDRESS, LAT, and LON to your real venue.

const VENUE_NAME    = 'Miesto konania'       // e.g. "Kaštieľ Krasňany"
const VENUE_TYPE    = 'Miesto svadby'         // e.g. "Reštaurácia & Hotel"
const VENUE_ADDRESS = ['Ulica 123', '821 01 Bratislava', 'Slovensko']

// Replace with your venue's actual GPS coordinates
const LAT = 48.148
const LON = 17.107

const mapsNavUrl = `https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`
const osmEmbed   = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.05},${LAT - 0.03},${LON + 0.05},${LAT + 0.03}&layer=mapnik&marker=${LAT},${LON}`

export default function Venue() {
  return (
    <section id="miesto" className="venue">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✦</span></div>
          <h2>Miesto konania</h2>
          <p>Kde sa stretneme</p>
        </div>
      </div>
      <div className="venue__body">
        <div className="venue__info">
          <h3>{VENUE_NAME}</h3>
          <p className="venue__subtitle">{VENUE_TYPE}</p>
          <p className="venue__address">
            {VENUE_ADDRESS.map((line, i) => (
              <span key={i}>{line}{i < VENUE_ADDRESS.length - 1 && <br />}</span>
            ))}
          </p>
          <div className="venue__details">
            <div className="venue__detail">
              <span className="venue__detail-icon">📅</span>
              <span>Sobota, 19. september 2026</span>
            </div>
            <div className="venue__detail">
              <span className="venue__detail-icon">🕒</span>
              <span>Začiatok o 14:00</span>
            </div>
            <div className="venue__detail">
              <span className="venue__detail-icon">🚗</span>
              <span>Parkovanie k dispozícii</span>
            </div>
          </div>
          <a href={mapsNavUrl} target="_blank" rel="noopener noreferrer" className="venue__btn">
            ↗ Navigovať
          </a>
        </div>
        <div className="venue__map">
          <iframe src={osmEmbed} title="Mapa miesta konania" allowFullScreen />
        </div>
      </div>
    </section>
  )
}
