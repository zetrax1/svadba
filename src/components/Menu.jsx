import { useState } from 'react'

// TODO: Doplň skutočné jedlá a nápoje
const jedalnyListok = [
  { course: 'Predjedlo',    dish: '— bude doplnené —', icon: '🥗' },
  { course: 'Polievka',     dish: '— bude doplnené —', icon: '🍲' },
  { course: 'Hlavné jedlo', dish: '— bude doplnené —', icon: '🍽️' },
  { course: 'Dezert',       dish: '— bude doplnené —', icon: '🍰' },
]

const napojovyListok = [
  { name: '— bude doplnené —' },
]

// TODO: Doplň vína
const vinnaKarta = [
  { name: '— bude doplnené —', detail: '' },
  { name: '— bude doplnené —', detail: '' },
  { name: '— bude doplnené —', detail: '' },
]

// TODO: Doplň grilovačku
const grilovacka = [
  { name: '— bude doplnené —' },
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

export default function Menu() {
  const [open, setOpen] = useState(null)
  const toggle = (id) => setOpen(prev => prev === id ? null : id)

  return (
    <section id="menu" className="menu">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
          <h2>Menu</h2>
          <p>Slávnostná hostina</p>
        </div>

        <div className="accordion">
          <AccordionPanel
            id="jedlo"
            title="Jedálny lístok"
            subtitle="Jedlá a chody"
            icon="🍽️"
            open={open === 'jedlo'}
            onToggle={() => toggle('jedlo')}
          >
            <div className="menu__courses">
              {jedalnyListok.map((c, i) => (
                <div key={i} className="menu__course">
                  <span className="menu__course-icon">{c.icon}</span>
                  <div className="menu__course-body">
                    <div className="menu__course-label">{c.course}</div>
                    <div className="menu__course-dish">{c.dish}</div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionPanel>

          <AccordionPanel
            id="napoje"
            title="Nápojový lístok"
            subtitle="Alko a nealko"
            icon="🥂"
            open={open === 'napoje'}
            onToggle={() => toggle('napoje')}
          >
            <div className="menu__drinks">
              {napojovyListok.map((d, i) => (
                <div key={i} className="menu__drink">{d.name}</div>
              ))}
            </div>
          </AccordionPanel>

          <AccordionPanel
            id="vino"
            title="Vínna karta"
            subtitle="Výber vín z Tajna Winery"
            icon="🍷"
            open={open === 'vino'}
            onToggle={() => toggle('vino')}
          >
            <div className="menu__wines">
              {vinnaKarta.map((w, i) => (
                <div key={i} className="menu__wine">
                  <span className="menu__wine-name">{w.name}</span>
                  {w.detail && <span className="menu__wine-detail">{w.detail}</span>}
                </div>
              ))}
            </div>
          </AccordionPanel>

          <AccordionPanel
            id="grilovacka"
            title="Druhá večera"
            subtitle="Grilovačka"
            icon="🔥"
            open={open === 'grilovacka'}
            onToggle={() => toggle('grilovacka')}
          >
            <div className="menu__drinks">
              {grilovacka.map((g, i) => (
                <div key={i} className="menu__drink">{g.name}</div>
              ))}
            </div>
          </AccordionPanel>
        </div>
      </div>
    </section>
  )
}
