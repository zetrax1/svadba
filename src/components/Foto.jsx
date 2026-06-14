import { useState } from 'react'

const iSpyItems = [
  { emoji: '😭', text: 'Niekoho, kto plače od dojatia' },
  { emoji: '💃', text: 'Najlepší tanečný pohyb večera' },
  { emoji: '🥂', text: 'Spoločný prípitok' },
  { emoji: '💏', text: 'Bozk novomanželov' },
  { emoji: '🌅', text: 'Západ slnka' },
  { emoji: '🌸', text: 'Detail výzdoby' },
  { emoji: '🎂', text: 'Svadobnú tortu alebo koláčiky' },
  { emoji: '😂', text: 'Najvtipnejší výraz na fotke' },
  { emoji: '🤝', text: 'Objatie, ktoré hovorí všetko' },
  { emoji: '🪑', text: 'Skupinová fotka od stola' },
  { emoji: '🕺', text: 'Prvý tanec novomanželov' },
  { emoji: '🤳', text: 'Selfie s novomanželmi' },
  { emoji: '💑', text: 'Romantický moment medzi novomanželmi' },
  { emoji: '🍇', text: 'Fotka z vinohradov' },
]

export default function Foto() {
  const [open, setOpen] = useState(false)

  return (
    <section id="foto" className="foto">
      <div className="container">
        <div className="section-header">

          <h2>Fotky</h2>
          <p>Zdieľajte vaše spomienky</p>
        </div>

        <div className="foto__qr">
          <p className="foto__qr-text">
            Nenechajte žiadnu momentku zapadnúť prachom! Chceme ich vidieť všetky!
          </p>
          <img
            src="/google_photos_album_qr.png"
            alt="QR kód na zdieľaný album"
            className="foto__qr-img"
          />
          <p className="foto__qr-hint">📷 Naskenuj a nahraj fotky</p>
        </div>

        <div className="foto__ispy">
          <button
            className={`foto__ispy-trigger${open ? ' foto__ispy-trigger--open' : ''}`}
            onClick={() => setOpen(p => !p)}
            aria-expanded={open}
          >
            <span>🔍 Svadobná fotovýzva</span>
            <span className="accordion__chevron">{open ? '▲' : '▼'}</span>
          </button>
          {open && (
            <div className="foto__ispy-content">
              <p className="foto__ispy-intro">Skús zachytiť čo najviac z týchto momentov!</p>
              <ul className="foto__ispy-list">
                {iSpyItems.map((item, i) => (
                  <li key={i} className="foto__ispy-item">
                    <span className="foto__ispy-emoji">{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

